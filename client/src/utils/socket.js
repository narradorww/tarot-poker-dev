import { io } from 'socket.io-client';
import { getServerUrl } from './constants.js';

let socket = null;

export const initializeSocket = () => {
  const serverUrl = getServerUrl();

  socket = io(serverUrl, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    autoConnect: false
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    initializeSocket();
  }
  return socket;
};

export const connectSocket = () => {
  if (socket) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const joinRoom = (roomId, userName) => {
  if (socket && socket.connected) {
    socket.emit('join-room', { roomId, userName });
  }
};

export const submitVote = (roomId, vote) => {
  if (socket && socket.connected) {
    socket.emit('submit-vote', { roomId, vote });
  }
};

export const addTask = (roomId, task) => {
  if (socket && socket.connected) {
    socket.emit('add-task', { roomId, task });
  }
};

export const revealVotes = (roomId) => {
  if (socket && socket.connected) {
    socket.emit('reveal-votes', { roomId });
  }
};

export const estimateTask = (roomId, estimatedValue) => {
  if (socket && socket.connected) {
    socket.emit('estimate-task', { roomId, estimatedValue });
  }
};

export const startTimer = (roomId, duration) => {
  if (socket && socket.connected) {
    socket.emit('start-timer', { roomId, duration });
  }
};

export const skipTask = (roomId) => {
  if (socket && socket.connected) {
    socket.emit('skip-task', { roomId });
  }
};

export const getHistory = (roomId) => {
  if (socket && socket.connected) {
    socket.emit('get-history', { roomId });
  }
};
