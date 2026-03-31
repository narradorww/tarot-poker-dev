const ROOM_ID_PATTERN = /^[a-zA-Z0-9-]{6,}$/;

const normalizePrefix = (prefix) => {
  if (!prefix) return '';
  const trimmed = prefix.trim();
  if (!trimmed || trimmed === '/') return '';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
};

export const getRoomRoutePrefix = () => {
  const configuredPrefix = normalizePrefix(import.meta.env.VITE_ROOM_ROUTE_PREFIX);
  if (configuredPrefix) {
    return configuredPrefix;
  }

  if (typeof window === 'undefined') {
    return '';
  }

  const [firstSegment] = window.location.pathname.split('/').filter(Boolean);
  if (firstSegment === 'tarot-dev') {
    return '/tarot-dev';
  }

  return '';
};

export const getRoomFromLocation = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const roomFromQuery = params.get('room');
  if (roomFromQuery && ROOM_ID_PATTERN.test(roomFromQuery)) {
    return roomFromQuery;
  }

  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  if (pathSegments.length === 0) {
    return null;
  }

  let candidate = null;
  if (pathSegments[0] === 'tarot-dev') {
    candidate = pathSegments[1] || null;
  } else if (pathSegments.length === 1) {
    candidate = pathSegments[0];
  }

  return candidate && ROOM_ID_PATTERN.test(candidate) ? candidate : null;
};

export const getRoomPath = (roomId) => {
  const prefix = getRoomRoutePrefix();
  return prefix ? `${prefix}/${roomId}` : `/${roomId}`;
};

export const getRoomInviteUrl = (roomId) => {
  if (typeof window === 'undefined') {
    return '';
  }
  return `${window.location.origin}${getRoomPath(roomId)}`;
};

export const getLobbyPath = () => {
  const prefix = getRoomRoutePrefix();
  return prefix || '/';
};
