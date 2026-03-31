import { io } from 'socket.io-client';
import { getServerUrl } from './constants.js';

let socket = null;

const emitEvent = (eventName, payload) => {
  const activeSocket = getSocket();
  activeSocket.emit(eventName, payload);
};

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
  emitEvent('join-room', { roomId, userName });
};

export const submitVote = (roomId, vote) => {
  emitEvent('submit-vote', { roomId, vote });
};

export const addTask = (roomId, task) => {
  emitEvent('add-task', { roomId, task });
};

export const revealVotes = (roomId) => {
  emitEvent('reveal-votes', { roomId });
};

export const estimateTask = (roomId, estimatedValue) => {
  emitEvent('estimate-task', { roomId, estimatedValue });
};

export const startTimer = (roomId, duration) => {
  emitEvent('start-timer', { roomId, duration });
};

export const skipTask = (roomId) => {
  emitEvent('skip-task', { roomId });
};

export const getHistory = (roomId) => {
  emitEvent('get-history', { roomId });
};
