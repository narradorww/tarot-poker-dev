const cardModules = import.meta.glob('../assets/cards/*.webp', {
  eager: true,
  import: 'default'
});

const CARD_IMAGE_MAP = Object.entries(cardModules).reduce((acc, [path, url]) => {
  const match = path.match(/\/([^/]+)\.webp$/);
  if (!match) return acc;

  const key = match[1].toLowerCase();
  acc[key] = url;
  return acc;
}, {});

export function getCardImage(value) {
  return CARD_IMAGE_MAP[String(value).toLowerCase()] || null;
}

