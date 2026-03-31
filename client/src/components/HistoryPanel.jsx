import React from 'react';

export default function HistoryPanel({ history, onClose }) {
  return (
    <div className="history-overlay">
      <div className="history-panel">
        <div className="history-header">
          <h2>📚 Histórico de Votações</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        {history.length === 0 ? (
          <div className="empty-history">
            <p>Nenhuma votação finalizada ainda</p>
          </div>
        ) : (
          <div className="history-list">
            {history.map((entry, index) => (
              <div key={index} className="history-item">
                <div className="item-header">
                  <h4>{entry.taskName}</h4>
                  <span className="estimated-value">{entry.estimatedValue} pts</span>
                </div>

                <div className="votes-summary">
                  <div className="votes-grid">
                    {entry.votes.map((vote, vIdx) => (
                      <div key={vIdx} className="vote-chip">
                        <span className="vote-name">{vote.participantName}</span>
                        <span className="vote-value">{vote.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="item-footer">
                  <span className="completed-time">
                    {new Date(entry.completedAt).toLocaleTimeString('pt-BR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .history-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          z-index: 1000;
        }

        .history-panel {
          background: linear-gradient(135deg, #0f0c29, #302b63);
          border-left: 2px solid #9d4edd;
          width: 100%;
          max-width: 400px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid #9d4edd;
        }

        .history-header h2 {
          margin: 0;
          color: #c77dff;
          font-size: 1.3rem;
        }

        .btn-close {
          background: rgba(157, 78, 221, 0.2);
          border: 1px solid #9d4edd;
          color: #c77dff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .btn-close:hover {
          background: rgba(157, 78, 221, 0.4);
          border-color: #c77dff;
        }

        .empty-history {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a78bfa;
        }

        .history-list {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        .history-item {
          background: rgba(93, 25, 171, 0.1);
          border: 1px solid rgba(157, 78, 221, 0.3);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .history-item:hover {
          border-color: #9d4edd;
          background: rgba(93, 25, 171, 0.2);
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .item-header h4 {
          margin: 0;
          color: #c77dff;
          flex: 1;
          word-break: break-word;
        }

        .estimated-value {
          background: linear-gradient(135deg, #00d9ff, #0099cc);
          color: #fff;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-weight: bold;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .votes-summary {
          margin-bottom: 1rem;
        }

        .votes-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .vote-chip {
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 6px;
          padding: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
        }

        .vote-name {
          color: #a78bfa;
          font-size: 0.75rem;
          word-break: break-word;
          flex: 1;
        }

        .vote-value {
          background: #00d9ff;
          color: #000;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .item-footer {
          font-size: 0.75rem;
          color: #a78bfa;
          text-align: right;
        }

        @media (max-width: 600px) {
          .history-panel {
            max-width: 100%;
            border-left: none;
            border-top: 2px solid #9d4edd;
            height: 70vh;
          }

          .history-overlay {
            align-items: flex-end;
          }

          .votes-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
