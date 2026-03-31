import React, { useState, useEffect } from 'react';

export default function Timer({ isActive, duration = 60, onTimeEnd, size = 'md' }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const isSmall = size === 'sm';
  const timerSize = isSmall ? 82 : 120;
  const timerFontSize = isSmall ? 1.15 : 1.8;

  useEffect(() => {
    if (!isActive) return;

    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration, onTimeEnd]);

  const percentage = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 10;

  return (
    <div
      className={`timer-container ${isActive ? 'active' : ''} ${isWarning ? 'warning' : ''}`}
      style={{
        '--timer-size': `${timerSize}px`,
        '--timer-font-size': `${timerFontSize}rem`
      }}
    >
      <div className="timer-display">
        <div className="timer-circle">
          <svg className="timer-svg" viewBox="0 0 100 100">
            <circle
              className="timer-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="timer-progress"
              cx="50"
              cy="50"
              r="45"
              style={{
                strokeDasharray: `${(percentage / 100) * 283} 283`
              }}
            />
          </svg>
          <div className="timer-text">
            <span className="time">{timeLeft}s</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .timer-container {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .timer-container.active {
          opacity: 1;
        }

        .timer-display {
          width: var(--timer-size);
          height: var(--timer-size);
        }

        .timer-circle {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .timer-bg {
          fill: none;
          stroke: rgba(157, 78, 221, 0.2);
          stroke-width: 3;
        }

        .timer-progress {
          fill: none;
          stroke: url(#timerGradient);
          stroke-width: 3;
          stroke-linecap: round;
          transition: stroke-dasharray 0.1s linear;
        }

        .timer-text {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: #a78bfa;
          font-weight: bold;
        }

        .time {
          font-size: var(--timer-font-size);
          text-shadow: 0 0 10px rgba(157, 78, 221, 0.5);
        }

        .timer-container.warning .timer-progress {
          stroke: url(#timerWarningGradient);
        }

        .timer-container.warning .time {
          color: #ff006e;
          animation: blink 0.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 600px) {
          .timer-display {
            width: calc(var(--timer-size) - 12px);
            height: calc(var(--timer-size) - 12px);
          }
        }
      `}</style>

      <svg style={{ display: 'none' }}>
        <defs>
          <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9d4edd" />
            <stop offset="100%" stopColor="#c77dff" />
          </linearGradient>
          <linearGradient id="timerWarningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff006e" />
            <stop offset="100%" stopColor="#ff4d6d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
