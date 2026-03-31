// Planning Poker deck values + doubt card
export const TAROT_VALUES = [0, 1, 2, 3, 5, 8, 13, 'D'];

export const TAROT_DESCRIPTIONS = {
  0: { label: '0', meaning: 'Sem estimativa' },
  1: { label: '1', meaning: 'Muito simples' },
  2: { label: '2', meaning: 'Simples' },
  3: { label: '3', meaning: 'Baixa complexidade' },
  5: { label: '5', meaning: 'Complexidade média' },
  8: { label: '8', meaning: 'Complexa' },
  13: { label: '13', meaning: 'Muito complexa' },
  D: { label: 'D', meaning: 'Dúvida' }
};

// Server URL configuration
export const getServerUrl = () => {
  const configuredServerUrl = import.meta.env.VITE_SERVER_URL;

  if (configuredServerUrl) {
    return configuredServerUrl;
  }

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }
  return window.location.origin;
};

export const TIMER_DURATIONS = {
  SHORT: 30,
  MEDIUM: 60,
  LONG: 120
};
