export const handleSocketConnection = (socket, io, getOrCreateRoom, getRooms) => {
  const rooms = getRooms();

  // User joins a room
  socket.on('join-room', (data) => {
    const { roomId, userName } = data;
    const room = getOrCreateRoom(roomId);

    socket.join(roomId);

    // Add participant
    room.participants.set(socket.id, {
      id: socket.id,
      name: userName,
      joinedAt: new Date(),
      lastVote: null
    });

    // Broadcast updated participants list
    io.to(roomId).emit('participants-updated', {
      participants: Array.from(room.participants.values()),
      count: room.participants.size
    });

    console.log(`✨ ${userName} joined room ${roomId}`);

    // Send room state to newly joined user
    socket.emit('room-state', {
      roomId,
      tasks: room.tasks,
      currentTask: room.currentTask,
      history: room.history,
      participants: Array.from(room.participants.values())
    });
  });

  // Add new task to voting
  socket.on('add-task', (data) => {
    const { roomId, task } = data;
    const room = room = rooms.get(roomId);

    if (!room) return;

    const taskData = {
      id: Date.now().toString(),
      name: task,
      estimatedValue: null,
      votes: new Map(),
      revealedVotes: false,
      createdAt: new Date()
    };

    room.tasks.push(taskData);
    room.currentTask = taskData;
    room.votes.clear();

    // Reset all votes for new task
    room.participants.forEach((participant) => {
      participant.lastVote = null;
    });

    io.to(roomId).emit('task-added', {
      task: taskData,
      participants: Array.from(room.participants.values())
    });
  });

  // User submits a vote
  socket.on('submit-vote', (data) => {
    const { roomId, vote } = data;
    const room = rooms.get(roomId);

    if (!room || !room.currentTask) return;

    const participant = room.participants.get(socket.id);
    if (!participant) return;

    room.votes.set(socket.id, {
      participantId: socket.id,
      participantName: participant.name,
      value: vote,
      timestamp: new Date()
    });

    participant.lastVote = vote;

    // Emit vote count update (don't reveal votes yet)
    io.to(roomId).emit('vote-submitted', {
      voteCount: room.votes.size,
      totalParticipants: room.participants.size
    });
  });

  // Reveal all votes for current task
  socket.on('reveal-votes', (data) => {
    const { roomId } = data;
    const room = rooms.get(roomId);

    if (!room || !room.currentTask) return;

    const revealedVotes = Array.from(room.votes.values());
    room.currentTask.revealedVotes = true;
    room.currentTask.votes = revealedVotes;

    io.to(roomId).emit('votes-revealed', {
      votes: revealedVotes,
      consensus: calculateConsensus(revealedVotes)
    });
  });

  // Calculate and estimate final value
  socket.on('estimate-task', (data) => {
    const { roomId, estimatedValue } = data;
    const room = rooms.get(roomId);

    if (!room || !room.currentTask) return;

    room.currentTask.estimatedValue = estimatedValue;

    const historyEntry = {
      taskName: room.currentTask.name,
      estimatedValue,
      votes: Array.from(room.votes.values()),
      completedAt: new Date()
    };

    room.history.push(historyEntry);

    io.to(roomId).emit('task-estimated', {
      task: room.currentTask,
      historyEntry
    });
  });

  // Start voting timer
  socket.on('start-timer', (data) => {
    const { roomId, duration = 60 } = data;
    const room = rooms.get(roomId);

    if (!room) return;

    room.timerActive = true;
    room.timerDuration = duration;

    io.to(roomId).emit('timer-started', { duration });

    // Auto-stop timer after duration
    setTimeout(() => {
      room.timerActive = false;
      io.to(roomId).emit('timer-ended');
    }, duration * 1000);
  });

  // Skip current task
  socket.on('skip-task', (data) => {
    const { roomId } = data;
    const room = rooms.get(roomId);

    if (!room) return;

    room.votes.clear();
    room.currentTask = null;

    io.to(roomId).emit('task-skipped');
  });

  // Get room history
  socket.on('get-history', (data) => {
    const { roomId } = data;
    const room = rooms.get(roomId);

    if (!room) return;

    socket.emit('history-data', {
      history: room.history
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    // Find and remove participant from all rooms
    rooms.forEach((room, roomId) => {
      const participant = room.participants.get(socket.id);
      if (participant) {
        room.participants.delete(socket.id);
        room.votes.delete(socket.id);

        console.log(`👻 ${participant.name} left room ${roomId}`);

        io.to(roomId).emit('participants-updated', {
          participants: Array.from(room.participants.values()),
          count: room.participants.size
        });

        // Clean up empty rooms after 1 hour
        if (room.participants.size === 0) {
          setTimeout(() => {
            if (room.participants.size === 0) {
              rooms.delete(roomId);
              console.log(`🗑️  Room ${roomId} cleaned up`);
            }
          }, 3600000);
        }
      }
    });
  });
};

// Helper function to calculate consensus
function calculateConsensus(votes) {
  if (votes.length === 0) return null;

  const valueMap = {};
  votes.forEach((vote) => {
    valueMap[vote.value] = (valueMap[vote.value] || 0) + 1;
  });

  const mostVoted = Object.keys(valueMap).reduce((a, b) =>
    valueMap[a] > valueMap[b] ? a : b
  );

  const allSame = Object.values(valueMap).every((v) => v === votes.length / Object.keys(valueMap).length);

  return {
    mostVoted: parseInt(mostVoted),
    unanimous: allSame,
    distribution: valueMap
  };
}
