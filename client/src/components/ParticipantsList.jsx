import React from 'react';

export default function ParticipantsList({
  participants,
  voteCount,
  votes,
  revealedVotes,
  currentUserName
}) {
  return (
    <div className="participants-list">
      <div className="participants-header">
        <h3>👥 Participantes ({participants.length})</h3>
        {!revealedVotes && voteCount > 0 && (
          <span className="vote-progress">
            {voteCount}/{participants.length} votaram
          </span>
        )}
      </div>

      <div className="participants-grid">
        {participants.map((participant) => {
          const hasVoted = votes.has(participant.id);
          const vote = votes.get(participant.id);
          const isCurrentUser = participant.name === currentUserName;

          return (
            <div
              key={participant.id}
              className={`participant-item ${isCurrentUser ? 'current-user' : ''} ${
                hasVoted ? 'voted' : ''
              } ${revealedVotes && hasVoted ? 'revealed' : ''}`}
            >
              <div className="participant-avatar">
                {participant.name.charAt(0).toUpperCase()}
              </div>

              <div className="participant-info">
                <div className="participant-name">
                  {isCurrentUser ? `${participant.name} (Você)` : participant.name}
                </div>

                <div className="vote-indicator">
                  {!revealedVotes && (
                    <>
                      {hasVoted && <span className="voted-badge">✓ Votou</span>}
                      {!hasVoted && <span className="waiting-badge">⏳ Aguardando</span>}
                    </>
                  )}

                  {revealedVotes && hasVoted && (
                    <span className="vote-badge">{vote.value} pontos</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .participants-list {
          background: rgba(20, 20, 40, 0.6);
          border: 1px solid #9d4edd;
          border-radius: 12px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .participants-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .participants-header h3 {
          color: #c77dff;
          margin: 0;
          font-size: 1.1rem;
        }

        .vote-progress {
          background: rgba(157, 78, 221, 0.3);
          color: #a78bfa;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .participants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }

        .participant-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem;
          background: rgba(93, 25, 171, 0.1);
          border: 1px solid rgba(157, 78, 221, 0.3);
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .participant-item.voted {
          background: rgba(93, 25, 171, 0.2);
          border-color: #9d4edd;
        }

        .participant-item.revealed {
          border-color: #00d9ff;
          background: rgba(0, 217, 255, 0.1);
        }

        .participant-item.current-user {
          border: 2px solid #c77dff;
          background: rgba(199, 125, 255, 0.15);
        }

        .participant-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #9d4edd, #c77dff);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .participant-info {
          flex: 1;
          min-width: 0;
        }

        .participant-name {
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          word-break: break-word;
          margin-bottom: 0.3rem;
        }

        .participant-item.current-user .participant-name {
          color: #c77dff;
        }

        .vote-indicator {
          font-size: 0.8rem;
        }

        .voted-badge {
          background: rgba(0, 217, 255, 0.2);
          color: #00d9ff;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          display: inline-block;
        }

        .waiting-badge {
          background: rgba(157, 78, 221, 0.2);
          color: #a78bfa;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          display: inline-block;
        }

        .vote-badge {
          background: linear-gradient(135deg, #00d9ff, #0099cc);
          color: #fff;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-weight: bold;
          display: inline-block;
        }

        @media (max-width: 600px) {
          .participants-grid {
            grid-template-columns: 1fr;
          }

          .participant-item {
            gap: 1rem;
          }

          .participant-avatar {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}
