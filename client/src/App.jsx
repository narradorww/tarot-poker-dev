import React, { useState, useEffect } from 'react';
import { getSocket, connectSocket, disconnectSocket, joinRoom } from './utils/socket.js';
import { getLobbyPath, getRoomFromLocation, getRoomPath } from './utils/roomUrl.js';
import RoomJoin from './components/RoomJoin.jsx';
import PokerTable from './components/PokerTable.jsx';
import './styles/Mobile.css';

function App() {
  const prefilledRoomId = getRoomFromLocation();
  const [gameState, setGameState] = useState('join'); // 'join' or 'playing'
  const [roomId, setRoomId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [socket, setSocket] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [votes, setVotes] = useState(new Map());
  const [voteCount, setVoteCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [userVote, setUserVote] = useState(null);
  const [revealedVotes, setRevealedVotes] = useState(false);

  // Initialize Socket.io on component mount
  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    // Listen for room updates
    socketInstance.on('participants-updated', (data) => {
      setParticipants(data.participants);
    });

    socketInstance.on('task-added', (data) => {
      setCurrentTask(data.task);
      setVotes(new Map());
      setVoteCount(0);
      setUserVote(null);
      setRevealedVotes(false);
    });

    socketInstance.on('vote-submitted', (data) => {
      setVoteCount(data.voteCount);
    });

    socketInstance.on('votes-revealed', (data) => {
      setVotes(new Map(data.votes.map(v => [v.participantId, v])));
      setRevealedVotes(true);
    });

    socketInstance.on('room-state', (data) => {
      setParticipants(data.participants);
      setCurrentTask(data.currentTask);
      setHistory(data.history);
    });

    socketInstance.on('timer-started', (data) => {
      setTimerActive(true);
    });

    socketInstance.on('timer-ended', () => {
      setTimerActive(false);
    });

    socketInstance.on('task-skipped', () => {
      setCurrentTask(null);
      setVotes(new Map());
      setVoteCount(0);
      setUserVote(null);
      setRevealedVotes(false);
    });

    socketInstance.on('history-data', (data) => {
      setHistory(data.history);
    });

    return () => {
      // Cleanup listeners on unmount
      socketInstance.off('participants-updated');
      socketInstance.off('task-added');
      socketInstance.off('vote-submitted');
      socketInstance.off('votes-revealed');
      socketInstance.off('room-state');
      socketInstance.off('timer-started');
      socketInstance.off('timer-ended');
      socketInstance.off('task-skipped');
      socketInstance.off('history-data');
    };
  }, []);

  const handleJoinRoom = (room, name) => {
    connectSocket();
    setRoomId(room);
    setUserName(name);
    joinRoom(room, name);
    setGameState('playing');

    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', getRoomPath(room));
    }
  };

  const handleLeaveRoom = () => {
    disconnectSocket();
    setGameState('join');
    setRoomId(null);
    setUserName(null);
    setParticipants([]);
    setCurrentTask(null);
    setVotes(new Map());
    setVoteCount(0);
    setHistory([]);
    setUserVote(null);
    setRevealedVotes(false);

    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', getLobbyPath());
    }
  };

  const handleVoteSubmitted = (vote) => {
    setUserVote(vote);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🃏 Tarot Dev Poker</h1>
        <p className="subtitle">Planning Poker para Times de Desenvolvimento</p>
      </header>

      <main className="app-main">
        {gameState === 'join' ? (
          <RoomJoin onJoin={handleJoinRoom} initialRoomId={prefilledRoomId} />
        ) : (
          <PokerTable
            roomId={roomId}
            userName={userName}
            participants={participants}
            currentTask={currentTask}
            voteCount={voteCount}
            totalParticipants={participants.length}
            votes={votes}
            userVote={userVote}
            revealedVotes={revealedVotes}
            history={history}
            timerActive={timerActive}
            socket={socket}
            onVoteSubmitted={handleVoteSubmitted}
            onLeaveRoom={handleLeaveRoom}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Desenvolvido por Rodrigo Alexandre | Mobile Dev MERN</p>
      </footer>
    </div>
  );
}

export default App;
