// Fibonacci sequence for planning poker
export const TAROT_VALUES = [0, 1, 2, 3, 5, 8, 13];

// Tarot card descriptions for each value
export const TAROT_DESCRIPTIONS = {
  0: { arcana: 'The Fool', meaning: 'Zero Points - Not Ready' },
  1: { arcana: 'The Magician', meaning: 'One Point - Trivial' },
  2: { arcana: 'The High Priestess', meaning: 'Two Points - Simple' },
  3: { arcana: 'The Empress', meaning: 'Three Points - Easy' },
  5: { arcana: 'The Hierophant', meaning: 'Five Points - Medium' },
  8: { arcana: 'Strength', meaning: 'Eight Points - Hard' },
  13: { arcana: 'Death', meaning: 'Thirteen Points - Very Hard' }
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
