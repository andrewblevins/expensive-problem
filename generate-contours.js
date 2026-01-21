// Hand-crafted topographic lines - more intentional, less random
const WIDTH = 1920;
const HEIGHT = 300;

// Warm gray palette for dark mode
const COLORS = [
  '#0a0a0a',
  '#141311',
  '#1e1c18',
  '#28251f',
  '#322e26',
  '#3c372d',
  '#464034',
];

// Define intentional "peaks" - focal points where contours emanate from
const peaks = [
  { x: 350, y: 80, strength: 1.0 },
  { x: 900, y: 120, strength: 0.7 },
  { x: 1500, y: 60, strength: 0.85 },
];

// Calculate "elevation" at a point based on distance to peaks
function getElevation(x, y) {
  let elevation = 0;
  for (const peak of peaks) {
    const dx = x - peak.x;
    const dy = y - peak.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // Gaussian-ish falloff
    elevation += peak.strength * Math.exp(-distance * distance / 120000);
  }
  return elevation;
}

// Generate a contour line at a specific elevation threshold
function generateContourPath(threshold) {
  const points = [];
  const step = 8;

  for (let x = 0; x <= WIDTH; x += step) {
    // Find y where elevation crosses threshold (scan from top)
    let foundY = HEIGHT; // default to bottom
    for (let y = 0; y < HEIGHT; y += 2) {
      if (getElevation(x, y) >= threshold) {
        foundY = y;
        break;
      }
    }
    points.push({ x, y: foundY });
  }

  // Smooth the path using quadratic bezier curves
  let d = `M 0 ${HEIGHT} L 0 ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    d += ` Q ${curr.x} ${curr.y} ${midX} ${midY}`;
  }

  const last = points[points.length - 1];
  d += ` L ${WIDTH} ${last.y} L ${WIDTH} ${HEIGHT} Z`;

  return d;
}

// Generate SVG with layered contours
function generateSVG() {
  const layers = 6;
  let paths = '';

  for (let i = 0; i < layers; i++) {
    // Threshold from low to high
    const threshold = 0.15 + (i * 0.12);
    const path = generateContourPath(threshold);
    paths += `  <path d="${path}" fill="${COLORS[i + 1]}" />\n`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="none">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS[0]}" />
${paths}</svg>`;
}

console.log(generateSVG());
