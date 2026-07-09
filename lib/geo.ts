// Equirectangular projection kept in sync with scripts/generate-world.mjs so that
// company markers align with the generated country outlines.
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 460;
const LAT_TOP = 84;
const LAT_BOTTOM = -56;

export function projectLngLat(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * MAP_WIDTH;
  const y = ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * MAP_HEIGHT;
  return { x, y };
}
