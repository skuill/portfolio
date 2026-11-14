// Day colours from the mosaic palette; neighbouring days never share one.
export const DAY_COLORS = ["#d08a68", "#4f6d8c", "#7fb3a8", "#e4b267", "#6f93b1", "#537d6c", "#b98d6a", "#a0637b"];

const INK = "#22282f";
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
// Text on a day's colour: white where it is readable (contrast 4.5:1, WCAG AA), dark ink on the light colours.
export const labelColor = (color) => ((1 + 0.05) / (luminance(color) + 0.05) >= 4.5 ? "#fff" : INK);
export const dayStyle = (index, selected) => {
  const color = DAY_COLORS[index % DAY_COLORS.length];
  if (selected === null) return { color, weight: 4, opacity: 0.9 };
  return index + 1 === selected ? { color, weight: 6, opacity: 1 } : { color, weight: 3, opacity: 0.3 };
};
