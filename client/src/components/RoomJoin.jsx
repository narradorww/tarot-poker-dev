import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
      <div className="mystical-background">
        <div className="floating-symbols">✨ 🃏 ⭐ 🌙 ✨</div>
      </div>

      <div className="room-join-card">
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === 'create' ? 'active' : ''}`}
            onClick={() => setMode('create')}
          >
            ✨ Criar Sala
          </button>
          <button
            className={`mode-btn ${mode === 'join' ? 'active' : ''}`}
            onClick={() => setMode('join')}
          >
            🔮 Entrar na Sala
          </button>
        </div>

        {mode === 'create' ? (
          <form onSubmit={handleCreateRoom} className="join-form">
            <div className="form-group">
              <label>Qual é o seu nome, Mago?</label>
              <input
                type="text"
                placeholder="Digite seu nome..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
            </div>

            <button type="submit" className="btn-primary" disabled={!userName.trim()}>
              ✨ Criar Sala Mística
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
                placeholder="Como te chamam?"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>ID da Sala</label>
              <input
                type="text"
                placeholder="Cole o ID da sala..."
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
              🔮 Entrar na Sala
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .room-join-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          position: relative;
          overflow: hidden;
        }

        .mystical-background {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          pointer-events: none;
        }

        .floating-symbols {
          font-size: 4rem;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .room-join-card {
          background: rgba(20, 20, 40, 0.9);
          border: 2px solid #9d4edd;
          border-radius: 20px;
          padding: 3rem;
          width: 90%;
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
          .room-join-card {
            padding: 2rem;
            border-radius: 15px;
          }

          .floating-symbols {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
