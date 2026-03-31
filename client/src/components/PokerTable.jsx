import React, { useState } from 'react';
import TarotCard from './TarotCard.jsx';
import Timer from './Timer.jsx';
import ParticipantsList from './ParticipantsList.jsx';
import HistoryPanel from './HistoryPanel.jsx';
import {
  TAROT_VALUES,
  TIMER_DURATIONS
} from '../utils/constants.js';
import {
  submitVote,
  addTask,
  revealVotes,
  estimateTask,
  startTimer,
  skipTask
} from '../utils/socket.js';
import { getRoomInviteUrl } from '../utils/roomUrl.js';

export default function PokerTable({
  roomId,
  userName,
  participants,
  currentTask,
  voteCount,
  totalParticipants,
  votes,
  userVote,
  revealedVotes,
  history,
  timerActive,
  socket,
  onVoteSubmitted,
  onLeaveRoom
}) {
  const [newTask, setNewTask] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleVoteCard = (value) => {
    if (!revealedVotes) {
      submitVote(roomId, value);
      onVoteSubmitted(value);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(roomId, newTask);
      setNewTask('');
    }
  };

  const handleRevealVotes = () => {
    revealVotes(roomId);
  };

  const handleStartTimer = () => {
    startTimer(roomId, TIMER_DURATIONS.MEDIUM);
  };

  const handleSkipTask = () => {
    skipTask(roomId);
  };

  const handleEstimate = (value) => {
    estimateTask(roomId, value);
  };

  const isFacilitator = true; // Para simplificar, todos podem revelar. Você pode adicionar controle de facilitador
  const allVoted = totalParticipants > 0 && voteCount === totalParticipants;
  const currentVoteLabel = userVote === 'D' ? 'Dúvida' : `${userVote} pontos`;

  const handleCopyInvite = async () => {
    const inviteUrl = getRoomInviteUrl(roomId);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(inviteUrl);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = inviteUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }
      setCopyFeedback('Link copiado');
    } catch (error) {
      setCopyFeedback('Não foi possível copiar');
    }

    setTimeout(() => setCopyFeedback(''), 2500);
  };

  return (
    <div className="poker-table">
      {/* Header with room info */}
      <div className="table-header">
        <div className="header-left">
          <h2>🎭 Sala: <code title={roomId}>{roomId.substring(0, 8)}...</code></h2>
          <p className="user-info">Bem-vindo, {userName}!</p>
        </div>
        <div className="header-right">
          <button className="btn-copy" onClick={handleCopyInvite}>
            🔗 Copiar convite
          </button>
          {copyFeedback && <span className="copy-feedback">{copyFeedback}</span>}
          <button className="btn-history" onClick={() => setShowHistory(!showHistory)}>
            📚 Histórico ({history.length})
          </button>
          <button className="btn-leave" onClick={onLeaveRoom}>
            🚪 Sair
          </button>
        </div>
      </div>

      <div className="table-content">
        {/* Main voting area */}
        <div className="voting-section">
          {!currentTask ? (
            <div className="no-task">
              <div className="empty-state">
                <div className="empty-icon">🃏</div>
                <h3>Nenhuma tarefa em votação</h3>
                <p>Adicione uma tarefa para começar o planning poker</p>
              </div>
            </div>
          ) : (
            <>
              <div className="task-section">
                <div className="task-header">
                  <h3 className="task-name">{currentTask.name}</h3>
                  <Timer isActive={timerActive} duration={60} />
                </div>

                <div className="cards-grid">
                  {TAROT_VALUES.map((value) => (
                    <TarotCard
                      key={value}
                      value={value}
                      isSelected={userVote === value}
                      isRevealed={revealedVotes}
                      participantVote={votes.get(value)}
                      onClick={() => handleVoteCard(value)}
                    />
                  ))}
                </div>

                <div className="voting-controls">
                  <div className="vote-status">
                    {!revealedVotes ? (
                      <>
                        {userVote !== null ? (
                          <span className="status-success">✓ Seu voto: {currentVoteLabel}</span>
                        ) : (
                          <span className="status-waiting">⏳ Aguardando seu voto...</span>
                        )}
                      </>
                    ) : (
                      <span className="status-revealed">✨ Votos revelados</span>
                    )}
                  </div>

                  <div className="action-buttons">
                    {!revealedVotes && (
                      <>
                        <button
                          className="btn-secondary"
                          onClick={handleStartTimer}
                          disabled={timerActive}
                        >
                          ⏱️ Iniciar Timer ({TIMER_DURATIONS.MEDIUM}s)
                        </button>
                        <button
                          className={`btn-primary ${allVoted ? 'ready' : ''}`}
                          onClick={handleRevealVotes}
                          disabled={voteCount === 0}
                        >
                          {allVoted ? '👁️ Revelar Votos (Todos votaram!)' : '👁️ Revelar Votos'}
                        </button>
                      </>
                    )}

                    {revealedVotes && (
                      <>
                        <button
                          className="btn-primary"
                          onClick={() => handleEstimate(userVote || 0)}
                        >
                          ✅ Confirmar Estimativa
                        </button>
                        <button className="btn-secondary" onClick={handleSkipTask}>
                          ⏭️ Próxima Tarefa
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Add task form */}
          <div className="add-task-panel">
            <h3>➕ Nova Tarefa</h3>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Nome da tarefa..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button type="submit" className="btn-primary-small" disabled={!newTask.trim()}>
                Adicionar
              </button>
            </form>
          </div>

          {/* Participants list */}
          <ParticipantsList
            participants={participants}
            voteCount={voteCount}
            votes={votes}
            revealedVotes={revealedVotes}
            currentUserName={userName}
          />
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <HistoryPanel
          history={history}
          onClose={() => setShowHistory(false)}
        />
      )}

      <style jsx>{`
        .poker-table {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          color: #fff;
          display: flex;
          flex-direction: column;
        }

        .table-header {
          background: rgba(20, 20, 40, 0.8);
          border-bottom: 2px solid #9d4edd;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(10px);
        }

        .header-left h2 {
          margin: 0 0 0.5rem 0;
          color: #c77dff;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .header-left code {
          background: rgba(157, 78, 221, 0.2);
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: 'Courier New', monospace;
          color: #a78bfa;
        }

        .user-info {
          margin: 0;
          color: #a78bfa;
          font-size: 0.9rem;
        }

        .header-right {
          display: flex;
          gap: 1rem;
        }

        .btn-copy,
        .btn-history,
        .btn-leave {
          padding: 0.6rem 1.2rem;
          border: 1px solid #9d4edd;
          background: rgba(157, 78, 221, 0.1);
          color: #c77dff;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .btn-history:hover {
          background: rgba(157, 78, 221, 0.3);
        }

        .btn-copy:hover {
          background: rgba(0, 217, 255, 0.2);
          border-color: #00d9ff;
          color: #00d9ff;
        }

        .copy-feedback {
          color: #00d9ff;
          font-size: 0.85rem;
          align-self: center;
          white-space: nowrap;
        }

        .btn-leave:hover {
          background: rgba(255, 0, 110, 0.2);
          border-color: #ff006e;
          color: #ff006e;
        }

        .table-content {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
          padding: 2rem;
          overflow: hidden;
        }

        .voting-section {
          background: rgba(20, 20, 40, 0.4);
          border: 1px solid #9d4edd;
          border-radius: 15px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          overflow-y: auto;
        }

        .no-task {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .empty-state {
          text-align: center;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .empty-state h3 {
          color: #c77dff;
          margin: 0 0 0.5rem 0;
        }

        .empty-state p {
          color: #a78bfa;
          margin: 0;
        }

        .task-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(157, 78, 221, 0.3);
        }

        .task-name {
          color: #c77dff;
          margin: 0;
          font-size: 1.3rem;
          flex: 1;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(92px, 112px));
          gap: 1rem;
          justify-content: center;
          justify-items: center;
        }

        .voting-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .vote-status {
          text-align: center;
          padding: 1rem;
          background: rgba(157, 78, 221, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(157, 78, 221, 0.3);
        }

        .status-success {
          color: #00d9ff;
          font-weight: 600;
        }

        .status-waiting {
          color: #a78bfa;
        }

        .status-revealed {
          color: #00d9ff;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary,
        .btn-primary-small {
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          flex: 1;
          min-height: 45px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #9d4edd, #c77dff);
          color: #fff;
        }

        .btn-primary:hover:not(:disabled) {
          box-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
          transform: translateY(-2px);
        }

        .btn-primary.ready {
          background: linear-gradient(135deg, #00d9ff, #0099cc);
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
        }

        .btn-secondary {
          background: rgba(157, 78, 221, 0.2);
          border: 1px solid #9d4edd;
          color: #c77dff;
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(157, 78, 221, 0.4);
        }

        .btn-primary-small {
          padding: 0.6rem 1rem;
          background: #9d4edd;
          color: #fff;
          width: 100%;
        }

        .btn-primary-small:hover:not(:disabled) {
          background: #c77dff;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow-y: auto;
        }

        .add-task-panel {
          background: rgba(20, 20, 40, 0.6);
          border: 1px solid #9d4edd;
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .add-task-panel h3 {
          margin: 0 0 1rem 0;
          color: #c77dff;
        }

        .add-task-panel form {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .add-task-panel input {
          padding: 0.8rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #9d4edd;
          border-radius: 8px;
          color: #fff;
          font-size: 0.9rem;
        }

        .add-task-panel input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          border-color: #c77dff;
          box-shadow: 0 0 10px rgba(157, 78, 221, 0.4);
        }

        @media (max-width: 1200px) {
          .table-content {
            grid-template-columns: 1fr;
          }

          .sidebar {
            max-height: 300px;
          }
        }

        @media (max-width: 600px) {
          .table-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            padding: 1rem;
          }

          .header-right {
            width: 100%;
            flex-wrap: wrap;
          }

          .table-content {
            padding: 1rem;
            gap: 1rem;
          }

          .voting-section {
            padding: 1rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            flex: none;
          }

          .cards-grid {
            grid-template-columns: repeat(3, minmax(70px, 96px));
            gap: 0.8rem;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
