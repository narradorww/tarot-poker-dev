import React, { useMemo, useState } from 'react';
import { TAROT_DESCRIPTIONS } from '../utils/constants.js';

export default function TarotCard({ value, isSelected, isRevealed, participantVote, onClick }) {
  const description = TAROT_DESCRIPTIONS[value];
  const [imageError, setImageError] = useState(false);
  const imageSrc = useMemo(() => `/cards/${String(value).toLowerCase()}.png`, [value]);
  const footerLabel = description.label === 'D' ? 'Dúvida' : `${description.label} pontos`;

  return (
    <div
      className={`tarot-card ${isSelected ? 'selected' : ''} ${
        isRevealed && participantVote ? 'revealed' : ''
      }`}
      onClick={onClick}
      title={`${description.label} - ${description.meaning}`}
    >
      <div className="card-inner">
        <div className="card-front">
          {!imageError ? (
            <img
              src={imageSrc}
              alt={`Carta ${description.label}`}
              className="card-artwork"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="card-fallback">
              <span className="fallback-value">{description.label}</span>
              <span className="fallback-text">{description.meaning}</span>
            </div>
          )}

          <div className="card-footer">
            <span>{footerLabel}</span>
          </div>

          {isSelected && (
            <div className="selection-indicator">✓</div>
          )}
        </div>

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
          background: linear-gradient(135deg, #140826, #2d0a4d);
          border: 2px solid #9d4edd;
          border-radius: 12px;
          padding: 0.35rem;
          width: 100%;
          max-width: 160px;
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
          transform: scale(1.06);
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
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.25);
        }

        .card-artwork {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .card-footer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(8, 4, 18, 0.86);
          border-top: 1px solid rgba(199, 125, 255, 0.45);
          padding: 0.35rem 0.2rem;
          text-align: center;
          z-index: 3;
        }

        .card-footer span {
          font-size: 0.72rem;
          font-weight: 700;
          color: #f4e8ff;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .card-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          text-align: center;
          padding: 0.5rem;
        }

        .fallback-value {
          font-size: 2rem;
          font-weight: 700;
          color: #f3e8ff;
        }

        .fallback-text {
          font-size: 0.62rem;
          color: #d8b4fe;
          line-height: 1.2;
        }

        .selection-indicator {
          position: absolute;
          top: 0.4rem;
          right: 0.4rem;
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
          z-index: 4;
        }

        .card-back {
          position: absolute;
          inset: 0;
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
            max-width: 122px;
            padding: 0.3rem;
          }

          .card-footer span {
            font-size: 0.62rem;
          }
        }
      `}</style>
    </div>
  );
}
