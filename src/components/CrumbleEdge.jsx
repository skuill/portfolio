import { useEffect, useRef } from "react";
import { parseColor } from "../utils/parseColor";

const HEIGHT = 40;
const TILE_WIDTH = 14;
const TILE_HEIGHT = 9;
// Chance that a tile exists in each row, from the coloured band upwards.
const ROW_FILL = [0.9, 0.62, 0.34, 0.13];

const rand = (a, b) => a + Math.random() * (b - a);

const paint = (canvas, color, width) => {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(HEIGHT * ratio);
  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  ROW_FILL.forEach((chance, row) => {
    const y = HEIGHT - (row + 1) * TILE_HEIGHT;
    for (let x = row % 2 ? -TILE_WIDTH / 2 : 0; x < width; x += TILE_WIDTH) {
      if (Math.random() > chance) continue;
      const shade = rand(-8, 8);
      context.fillStyle = `rgb(${color.map((value) => Math.max(0, Math.min(255, value + shade)) | 0).join(",")})`;
      context.fillRect(x + rand(-1, 1), y + rand(-0.8, 0.8), TILE_WIDTH - 2 + rand(-1.2, 0.8), TILE_HEIGHT - 2 + rand(-1, 0.6));
    }
  });
};

// The top edge of a coloured band, crumbling into mosaic tiles. Takes the colour of its parent unless given one.
const CrumbleEdge = ({ color }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const update = () => {
      const parent = canvas.parentElement;
      paint(canvas, color ?? parseColor(getComputedStyle(parent).backgroundColor), parent.clientWidth);
    };
    update();
    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [color]);

  return <canvas ref={ref} className="crumble" aria-hidden="true" />;
};

export default CrumbleEdge;
