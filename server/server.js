import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { handleSocketConnection } from './socket-handlers.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const defaultCorsOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://rodrigoalexandre.dev',
  'https://www.rodrigoalexandre.dev'
];

const envCorsOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedCorsOrigins = [...new Set([...defaultCorsOrigins, ...envCorsOrigins])];

const isAllowedOrigin = (origin) => !origin || allowedCorsOrigins.includes(origin);

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  methods: ['GET', 'POST'],
  credentials: true
};

const io = new SocketIOServer(server, {
  cors: corsOptions
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// In-memory store for rooms
const rooms = new Map();

// Helper to get or create room
export const getOrCreateRoom = (roomId) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      participants: new Map(),
      currentTask: null,
      tasks: [],
      votingActive: false,
      votes: new Map(),
      history: [],
      timerActive: false,
      timerDuration: 60,
      createdAt: new Date()
    });
  }
  return rooms.get(roomId);
};

// Export rooms for socket handlers
export const getRooms = () => rooms;

// REST API Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/room/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);

  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  res.json({
    id: room.id,
    participantCount: room.participants.size,
    currentTask: room.currentTask,
    votingActive: room.votingActive,
    createdAt: room.createdAt
  });
});

app.post('/api/room/create', (req, res) => {
  const roomId = uuidv4();
  getOrCreateRoom(roomId);
  res.json({ roomId });
});

// Socket.io Connection Handler
io.on('connection', (socket) => {
  handleSocketConnection(socket, io, getOrCreateRoom, getRooms);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🎭 Tarot Dev Poker Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`CORS origins: ${allowedCorsOrigins.join(', ')}`);
});

export { io, server };
