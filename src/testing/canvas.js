// Test double for the 2D canvas context (jsdom has none): drawing does nothing, reading back returns an empty picture.
export const installCanvas = () => {
  const context = new Proxy(
    { getImageData: (x, y, width, height) => ({ data: new Uint8ClampedArray(width * height * 4) }) },
    {
      get: (target, property) => (property in target ? target[property] : () => {}),
      set: () => true,
    }
  );
  HTMLCanvasElement.prototype.getContext = () => context;
};
