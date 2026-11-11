import { render } from "@testing-library/react";
import CrumbleEdge from "./CrumbleEdge";
import { parseColor } from "../utils/parseColor";

const PAPER = [252, 251, 248];

test("reads a band colour and treats a band without one as the page", () => {
  expect(parseColor("rgb(63, 90, 115)")).toEqual([63, 90, 115]);
  expect(parseColor("rgba(0, 0, 0, 0)")).toEqual(PAPER);
  expect(parseColor("")).toEqual(PAPER);
});

test("is a decorative canvas sized for the screen's pixel density", () => {
  window.devicePixelRatio = 2;
  const { container } = render(
    <div style={{ backgroundColor: "rgb(1, 2, 3)" }}>
      <CrumbleEdge />
    </div>
  );
  const canvas = container.querySelector("canvas");

  expect(canvas).toHaveClass("crumble");
  expect(canvas).toHaveAttribute("aria-hidden", "true");
  expect(canvas.height).toBe(80);
});
