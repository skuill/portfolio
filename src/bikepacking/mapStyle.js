// Day colours from the mosaic palette; neighbouring days never share one.
export const DAY_COLORS = ["#d08a68", "#4f6d8c", "#7fb3a8", "#e4b267", "#6f93b1", "#55806f", "#b98d6a", "#a3667e"];
export const dayStyle = (index, selected) => {
  const color = DAY_COLORS[index % DAY_COLORS.length];
  if (selected === null) return { color, weight: 4, opacity: 0.9 };
  return index + 1 === selected ? { color, weight: 6, opacity: 1 } : { color, weight: 3, opacity: 0.3 };
};
