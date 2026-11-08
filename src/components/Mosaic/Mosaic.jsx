import { useEffect, useRef } from "react";
import { createMosaicEngine } from "./mosaicEngine";

// A round mosaic that rebuilds itself into another picture on hover, click or touch.
// figure + onFigureChange: optional, for a parent that picks the picture itself.
const Mosaic = ({ id, density, start = 0, auto = false, gap, boost, figure, onFigureChange }) => {
  const holderRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const onChangeRef = useRef(onFigureChange);

  useEffect(() => {
    onChangeRef.current = onFigureChange;
  }, [onFigureChange]);

  useEffect(() => {
    const engine = createMosaicEngine({
      holder: holderRef.current,
      canvas: canvasRef.current,
      density,
      start,
      auto,
      gap,
      boost,
      onChange: (index) => onChangeRef.current?.(index),
    });
    engineRef.current = engine;
    return () => engine.destroy();
  }, [density, start, auto, gap, boost]);

  useEffect(() => {
    if (figure !== undefined) engineRef.current.goTo(figure);
  }, [figure]);

  return (
    <button
      ref={holderRef}
      id={id}
      className="medallion"
      type="button"
      aria-label="Change the mosaic picture"
      onMouseEnter={(event) => engineRef.current.pointerEnter(event)}
      onMouseLeave={() => engineRef.current.pointerLeave()}
      onClick={(event) => engineRef.current.click(event)}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
    </button>
  );
};

export default Mosaic;
