import { useRef } from "react";
import CrumbleEdge from "./CrumbleEdge";
import useNearViewport from "../hooks/useNearViewport";

// One screen of the page. tall: fills the window; crumble: its top edge breaks into mosaic tiles.
const Section = ({ id, tall = false, crumble = false, children }) => {
  const contentRef = useRef(null);
  const seen = useNearViewport(contentRef, "0px 0px -8% 0px");

  return (
    <section id={id} className={`band${tall ? " tall" : ""}`}>
      {crumble && <CrumbleEdge />}
      <div ref={contentRef} className={`wrap reveal${seen ? " in" : ""}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
