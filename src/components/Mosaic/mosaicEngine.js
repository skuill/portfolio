import { BACKGROUND, FIGURES, UNIT } from "./figures";

const RESOLUTION = 5; // canvas pixels per unit of a figure when it is read back
const SIZE = UNIT * RESOLUTION;
const AUTO_MS = 9000;
// The click that ends the same mouse approach as the hover must not change the picture a second time.
const HOVER_CLICK_MS = 500;

const rand = (a, b) => a + Math.random() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const tone = ([r, g, b]) => r * 0.3 + g * 0.59 + b * 0.11;

// Makes a colour more saturated by moving it away from its own grey.
export const vivid = (rgb, factor) => {
  const grey = tone(rgb);
  return rgb.map((value) => Math.max(0, Math.min(255, grey + (value - grey) * factor)));
};

const rowHeight = (density) => 0.84 * density;
const tileWidth = (density) => 1.2 * density;

// Centres of the tiles: brick-laid rows, slightly uneven, inside the circle.
export const buildSpots = (density) => {
  const spots = [];
  const row = rowHeight(density);
  const wide = tileWidth(density);
  for (let index = 0, y = row / 2; y < UNIT; index++, y += row) {
    for (let x = index % 2 ? wide : wide / 2; x < UNIT; x += wide) {
      const shift = rand(-0.09, 0.09) * density;
      if (Math.hypot(x - UNIT / 2, y - UNIT / 2) < 23.5 - density * 0.4) spots.push({ x: x + shift, y: y + shift });
    }
  }
  return spots;
};

// Figures are painted once, the first time they are needed.
const painted = new Map();
const pixelsOf = (index) => {
  if (!painted.has(index)) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SIZE;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.fillStyle = BACKGROUND;
    context.fillRect(0, 0, SIZE, SIZE);
    context.scale(RESOLUTION, RESOLUTION);
    FIGURES[index].draw(context);
    painted.set(index, context.getImageData(0, 0, SIZE, SIZE).data);
  }
  return painted.get(index);
};
const sample = (index, x, y) => {
  const pixels = pixelsOf(index);
  const offset = (Math.floor(y * RESOLUTION) * SIZE + Math.floor(x * RESOLUTION)) * 4;
  return [pixels[offset], pixels[offset + 1], pixels[offset + 2]];
};

// A round mosaic on a canvas. Tiles fly from one picture to the next and stay inside the circle's neighbourhood.
// Animation runs only while tiles are flying; at rest nothing is scheduled.
export const createMosaicEngine = ({ holder, canvas, density, start = 0, auto = false, gap = 1, boost = 1, onChange }) => {
  const context = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const row = rowHeight(density);
  const wide = tileWidth(density);
  const spots = buildSpots(density);
  const tiles = spots.map(() => ({
    x: 0,
    y: 0,
    rgb: [241, 235, 223],
    size: 0,
    spin: rand(-2, 2),
    tint: [rand(-6, 6), rand(-6, 6), rand(-6, 6)],
    corners: Array.from({ length: 8 }, () => rand(-0.12, 0.12) * density),
  }));

  let diameter = 0;
  let scale = 1;
  let pad = 0;
  let current = start;
  let running = false;
  let startedAt = 0;
  let frame = 0;
  let hovering = false;
  let hoverAt = -Infinity;
  let lastInteraction = -Infinity;
  let visible = false;
  let assembled = false;

  const measure = () => {
    diameter = holder.offsetWidth;
    scale = diameter / UNIT;
    pad = Math.max(44, diameter * 0.34);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const full = diameter + pad * 2;
    canvas.style.width = canvas.style.height = `${full}px`;
    canvas.width = canvas.height = Math.round(full * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const toPixels = (value) => pad + value * scale;
  const goalsFor = (index) =>
    spots.map((spot) => ({ x: toPixels(spot.x), y: toPixels(spot.y), rgb: vivid(sample(index, spot.x, spot.y), boost) }));

  const draw = () => {
    const now = performance.now();
    const full = diameter + pad * 2;
    context.clearRect(0, 0, full, full);
    const halfWidth = (wide * scale - gap) / 2;
    const halfHeight = (row * scale - gap) / 2;
    let flying = false;
    for (const tile of tiles) {
      let wave = 0;
      if (running) {
        const progress = Math.min(1, Math.max(0, (now - startedAt - tile.delay) / tile.duration));
        if (progress < 1) flying = true;
        const e = ease(progress);
        const u = 1 - e;
        tile.x = u * u * tile.fromX + 2 * u * e * tile.controlX + e * e * tile.toX;
        tile.y = u * u * tile.fromY + 2 * u * e * tile.controlY + e * e * tile.toY;
        tile.size = lerp(tile.fromSize, 1, e);
        tile.rgb = tile.fromRgb.map((value, i) => lerp(value, tile.toRgb[i], e));
        wave = Math.sin(Math.PI * e);
      }
      if (tile.size < 0.02) continue;
      const shrink = tile.size * (1 - 0.2 * wave);
      const angle = tile.spin * wave;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const c = tile.corners;
      const [r, g, b] = tile.rgb.map((value, i) => (value + tile.tint[i]) | 0);
      context.fillStyle = `rgb(${r},${g},${b})`;
      context.beginPath();
      [
        [-halfWidth + c[0] * scale, -halfHeight + c[1] * scale],
        [halfWidth + c[2] * scale, -halfHeight + c[3] * scale],
        [halfWidth + c[4] * scale, halfHeight + c[5] * scale],
        [-halfWidth + c[6] * scale, halfHeight + c[7] * scale],
      ].forEach(([px, py], i) => {
        const x = tile.x + (px * cos - py * sin) * shrink;
        const y = tile.y + (px * sin + py * cos) * shrink;
        if (i) context.lineTo(x, y);
        else context.moveTo(x, y);
      });
      context.closePath();
      context.fill();
    }
    if (running && !flying) running = false;
    if (running) frame = requestAnimationFrame(draw);
  };

  const snap = (index) => {
    running = false;
    cancelAnimationFrame(frame);
    current = index;
    goalsFor(index).forEach((goal, i) => Object.assign(tiles[i], { x: goal.x, y: goal.y, size: 1, rgb: goal.rgb }));
    draw();
  };

  const morph = (index, origin) => {
    if (reducedMotion) {
      snap(index);
      onChange?.(index);
      return;
    }
    current = index;
    onChange?.(index);
    // Tiles keep roughly their own tone: pale ones stay background, coloured ones rebuild the figure.
    const byTone = (items, colorOf) =>
      items
        .map((item) => ({ item, key: tone(colorOf(item)) + rand(-16, 16) }))
        .sort((a, b) => a.key - b.key)
        .map(({ item }) => item);
    const movers = byTone(tiles, (tile) => tile.rgb);
    const goals = byTone(goalsFor(index), (goal) => goal.rgb);
    const centreX = toPixels(UNIT / 2);
    const centreY = toPixels(UNIT / 2);
    const from = origin ?? { x: centreX, y: centreY };
    movers.forEach((tile, i) => {
      const goal = goals[i];
      const middleX = (tile.x + goal.x) / 2;
      const middleY = (tile.y + goal.y) / 2;
      const length = Math.hypot(middleX - centreX, middleY - centreY) || 1;
      const push = rand(0.04, 0.3) * diameter;
      Object.assign(tile, {
        fromX: tile.x,
        fromY: tile.y,
        fromSize: tile.size,
        fromRgb: tile.rgb,
        toX: goal.x,
        toY: goal.y,
        toRgb: goal.rgb,
        controlX: middleX + ((middleX - centreX) / length) * push + rand(-0.06, 0.06) * diameter,
        controlY: middleY + ((middleY - centreY) / length) * push + rand(-0.06, 0.06) * diameter,
        delay: Math.min(1, Math.hypot(tile.x - from.x, tile.y - from.y) / (diameter || 1)) * 300 + rand(0, 110),
        duration: rand(800, 1250),
      });
    });
    startedAt = performance.now();
    if (!running) {
      running = true;
      frame = requestAnimationFrame(draw);
    }
  };

  const assemble = () => {
    assembled = true;
    if (reducedMotion) {
      snap(current);
      return;
    }
    for (const tile of tiles) {
      const angle = rand(0, 7);
      const distance = rand(0.45, 0.72) * diameter;
      tile.x = toPixels(UNIT / 2) + Math.cos(angle) * distance;
      tile.y = toPixels(UNIT / 2) + Math.sin(angle) * distance;
      tile.size = 0;
    }
    morph(current);
  };

  const next = (origin) => {
    lastInteraction = performance.now();
    morph((current + 1) % FIGURES.length, origin);
  };
  const localPoint = ({ clientX, clientY }) => {
    const box = holder.getBoundingClientRect();
    return { x: clientX - box.left + pad, y: clientY - box.top + pad };
  };

  measure();
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !assembled) assemble();
    },
    { threshold: 0.3 }
  );
  observer.observe(holder);

  const timer =
    auto && !reducedMotion
      ? setInterval(() => {
          if (document.hidden || !visible || running || hovering) return;
          if (performance.now() - lastInteraction >= AUTO_MS) morph((current + 1) % FIGURES.length);
        }, AUTO_MS)
      : 0;

  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      measure();
      if (assembled) snap(current);
    }, 120);
  };
  window.addEventListener("resize", onResize);

  return {
    state: () => ({ current, running, assembled, tiles: tiles.length }),
    pointerEnter(event) {
      hovering = true;
      if (!running) {
        hoverAt = performance.now();
        next(localPoint(event));
      }
    },
    pointerLeave() {
      hovering = false;
    },
    // A click always changes the picture, even in flight.
    click(event) {
      if (performance.now() - hoverAt < HOVER_CLICK_MS) return;
      next(event.detail ? localPoint(event) : undefined);
    },
    goTo(index) {
      lastInteraction = performance.now();
      if (index !== current) morph(index);
    },
    destroy() {
      observer.disconnect();
      clearInterval(timer);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    },
  };
};
