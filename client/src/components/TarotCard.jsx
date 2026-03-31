import React from 'react';
import { TAROT_VALUES, TAROT_DESCRIPTIONS } from '../utils/constants.js';

export default function TarotCard({ value, isSelected, isRevealed, participantVote, onClick }) {
  const description = TAROT_DESCRIPTIONS[value];

  return (
    <div
      className={`tarot-card ${isSelected ? 'selected' : ''} ${
        isRevealed && participantVote ? 'revealed' : ''
      }`}
      onClick={onClick}
      title={`${description.arcana} - ${description.meaning}`}
    >
      <div className="card-inner">
        {/* Card Front */}
        <div className="card-front">
          <div className="arcana-number">
            <span className="number">{value}</span>
          </div>

          <div className="card-symbol">
            {getArcanaSymbol(value)}
          </div>

          <div className="arcana-name">
            <span className="name">{description.arcana}</span>
          </div>

          {isSelected && (
            <div className="selection-indicator">✓</div>
          )}
        </div>

        {/* Card Back (Revealed vote) */}
        {isRevealed && participantVote && (
          <div className="card-back">
            <div className="vote-value">{participantVote.value}</div>
            <div className="voter-name">{participantVote.participantName}</div>
          </div>
        )}
      </div>

      <style jsx>{`
        .tarot-card {
          aspect-ratio: 2/3;
          background: linear-gradient(135deg, #1a0033, #2d0052);
          border: 2px solid #9d4edd;
          border-radius: 12px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(157, 78, 221, 0.2);
        }

        .tarot-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(199, 125, 255, 0.1) 50%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tarot-card:hover {
          border-color: #c77dff;
          box-shadow: 0 8px 25px rgba(157, 78, 221, 0.4);
          transform: translateY(-5px);
        }

        .tarot-card:hover::before {
          opacity: 1;
        }

        .tarot-card.selected {
          background: linear-gradient(135deg, #5a189a, #7209b7);
          border-color: #c77dff;
          box-shadow: 0 0 30px rgba(199, 125, 255, 0.6);
          transform: scale(1.1);
        }

        .tarot-card.revealed {
          background: linear-gradient(135deg, #240046, #3c096c);
          border-color: #00d9ff;
        }

        .card-inner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .card-front {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
        }

        .arcana-number {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.3rem;
        }

        .number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #c77dff;
          text-shadow: 0 0 10px rgba(199, 125, 255, 0.5);
        }

        .card-symbol {
          font-size: 2rem;
          margin: 0.3rem 0;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .arcana-name {
          font-size: 0.65rem;
          color: #a78bfa;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1.2;
        }

        .selection-indicator {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          width: 1.5rem;
          height: 1.5rem;
          background: #c77dff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 0.9rem;
          box-shadow: 0 0 15px rgba(199, 125, 255, 0.6);
        }

        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #00d9ff, #0099cc);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: #fff;
          font-weight: bold;
        }

        .vote-value {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #fff;
          text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
        }

        .voter-name {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          word-break: break-word;
          max-width: 100%;
          padding: 0 0.3rem;
        }

        @media (max-width: 600px) {
          .tarot-card {
            min-width: 70px;
            padding: 0.7rem;
          }

          .number {
            font-size: 1.2rem;
          }

          .card-symbol {
            font-size: 1.5rem;
          }

          .arcana-name {
            font-size: 0.55rem;
          }
        }
      `}</style>
    </div>
  );
}

function getArcanaSymbol(value) {
  const symbols = {
    0: '🤡',
    1: '✨',
    2: '🔮',
    3: '👑',
    5: '🗝️',
    8: '💪',
    13: '💀'
  };
  return symbols[value] || '🃏';
}
