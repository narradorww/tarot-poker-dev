import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import lobbyHero from '../assets/home/lobby-hero.webp';

export default function RoomJoin({ onJoin, initialRoomId }) {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [mode, setMode] = useState('create'); // 'create' or 'join'

  useEffect(() => {
    if (initialRoomId) {
      setRoomId(initialRoomId);
      setMode('join');
    }
  }, [initialRoomId]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      const newRoomId = uuidv4();
      onJoin(newRoomId, userName);
    }
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (userName.trim() && roomId.trim()) {
      onJoin(roomId, userName);
    }
  };

  return (
    <div className="room-join-container">
      <div className="room-join-stack">
        <img
          src={lobbyHero}
          alt="Ilustração da mesa de planning poker"
          className="room-join-hero"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <div className="room-join-card">
          <div className="mode-selector">
            <button
              className={`mode-btn ${mode === 'create' ? 'active' : ''}`}
              onClick={() => setMode('create')}
            >
              Criar sala
            </button>
            <button
              className={`mode-btn ${mode === 'join' ? 'active' : ''}`}
              onClick={() => setMode('join')}
            >
              Entrar na sala
            </button>
          </div>

          {mode === 'create' ? (
            <form onSubmit={handleCreateRoom} className="join-form">
              <div className="form-group">
                <label>Seu nome</label>
                <input
                  type="text"
                  placeholder="Digite seu nome..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoFocus
                />
              </div>

              <button type="submit" className="btn-primary" disabled={!userName.trim()}>
                Criar sala
              </button>

              <div className="info-text">
                Você receberá um link para compartilhar com seu time
              </div>
            </form>
          ) : (
            <form onSubmit={handleJoinRoom} className="join-form">
              <div className="form-group">
                <label>Seu Nome</label>
                <input
                  type="text"
                  placeholder="Digite seu nome..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Código da sala</label>
                <input
                  type="text"
                  placeholder="Cole o código da sala..."
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </div>

              {initialRoomId && (
                <div className="info-text">
                  Link detectado: entre com seu nome para votar nesta sala.
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={!userName.trim() || !roomId.trim()}
              >
                Entrar na sala
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .room-join-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 0.75rem 2rem;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          position: relative;
          overflow: hidden;
        }

        .room-join-stack {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }

        .room-join-hero {
          width: min(90vw, 420px);
          max-height: 250px;
          object-fit: cover;
          border-radius: 16px;
          border: 1px solid rgba(157, 78, 221, 0.45);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }

        .room-join-card {
          background: rgba(20, 20, 40, 0.9);
          border: 2px solid #9d4edd;
          border-radius: 20px;
          padding: 2.4rem;
          width: min(92vw, 500px);
          max-width: 500px;
          box-shadow: 0 8px 32px rgba(157, 78, 221, 0.3);
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 1;
        }

        .mode-selector {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .mode-btn {
          flex: 1;
          padding: 0.8rem;
          background: rgba(157, 78, 221, 0.2);
          border: 2px solid #9d4edd;
          color: #fff;
          border-radius: 10px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .mode-btn.active {
          background: #9d4edd;
          box-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
        }

        .join-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: #a78bfa;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-group input {
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #9d4edd;
          border-radius: 8px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.1);
          border-color: #c77dff;
          box-shadow: 0 0 10px rgba(157, 78, 221, 0.4);
        }

        .btn-primary {
          padding: 1rem;
          background: linear-gradient(135deg, #9d4edd, #c77dff);
          border: none;
          color: #fff;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-primary:hover:not(:disabled) {
          box-shadow: 0 0 20px rgba(157, 78, 221, 0.6);
          transform: translateY(-2px);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .info-text {
          text-align: center;
          color: #a78bfa;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 600px) {
          .room-join-hero {
            width: min(92vw, 360px);
            max-height: 210px;
            border-radius: 12px;
          }

          .room-join-card {
            padding: 1.8rem 1.3rem;
            border-radius: 15px;
          }
        }
      `}</style>
    </div>
  );
}
