const PAPER = [252, 251, 248];

// A CSS colour as [r, g, b]; a band without its own colour is the page itself.
export const parseColor = (css) => {
  const parts = css.match(/[\d.]+/g)?.map(Number) ?? [];
  if (parts.length < 3 || parts[3] === 0) return PAPER;
  return parts.slice(0, 3);
};
