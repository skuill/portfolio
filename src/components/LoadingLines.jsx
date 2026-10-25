import React from "react";
import Placeholder from "react-bootstrap/Placeholder";

// Grey animated lines shown while data is loading (Bootstrap placeholders).
const LoadingLines = ({ count = 1 }) => (
  <Placeholder as="span" animation="glow" className="d-block">
    {Array.from({ length: count }, (_, index) => (
      <Placeholder key={index} xs={12} className="d-block mb-1" />
    ))}
  </Placeholder>
);

export default LoadingLines;
