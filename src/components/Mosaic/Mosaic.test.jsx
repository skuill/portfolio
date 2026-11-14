import { render, screen, fireEvent } from "@testing-library/react";
import Mosaic from "./Mosaic";
import { createMosaicEngine } from "./mosaicEngine";

vi.mock("./mosaicEngine", () => ({ createMosaicEngine: vi.fn() }));

let engine;
beforeEach(() => {
  engine = { goTo: vi.fn(), pointerEnter: vi.fn(), pointerLeave: vi.fn(), click: vi.fn(), destroy: vi.fn() };
  createMosaicEngine.mockReset();
  createMosaicEngine.mockReturnValue(engine);
});

const button = () => screen.getByRole("button", { name: "Change the mosaic picture" });

test("starts the engine on its own button and canvas with the given settings", () => {
  render(<Mosaic id="stamp" density={1.5} start={2} auto gap={0.5} boost={1.3} />);

  expect(createMosaicEngine).toHaveBeenCalledTimes(1);
  expect(createMosaicEngine.mock.calls[0][0]).toEqual({
    holder: button(),
    canvas: button().querySelector("canvas"),
    density: 1.5,
    start: 2,
    auto: true,
    gap: 0.5,
    boost: 1.3,
    onChange: expect.any(Function),
  });
});

test("passes the mouse to the engine", () => {
  render(<Mosaic density={1} />);

  fireEvent.pointerEnter(button(), { pointerType: "mouse" });
  fireEvent.click(button());
  fireEvent.pointerLeave(button(), { pointerType: "mouse" });

  expect(engine.pointerEnter).toHaveBeenCalledTimes(1);
  expect(engine.click).toHaveBeenCalledTimes(1);
  expect(engine.pointerLeave).toHaveBeenCalledTimes(1);
});

test("flies to the picture its parent picks and reports the ones it picks itself", () => {
  const onFigureChange = vi.fn();
  const { rerender } = render(<Mosaic density={1} figure={1} onFigureChange={onFigureChange} />);
  expect(engine.goTo.mock.calls).toEqual([[1]]);

  rerender(<Mosaic density={1} figure={4} onFigureChange={onFigureChange} />);
  expect(engine.goTo.mock.calls).toEqual([[1], [4]]);

  createMosaicEngine.mock.calls[0][0].onChange(6);
  expect(onFigureChange.mock.calls).toEqual([[6]]);
});

test("a mosaic without a chosen picture is left to itself", () => {
  render(<Mosaic density={1} />);

  expect(engine.goTo).not.toHaveBeenCalled();
});

test("destroys the engine when it leaves the page", () => {
  const { unmount } = render(<Mosaic density={1} />);

  unmount();

  expect(engine.destroy).toHaveBeenCalledTimes(1);
});

test("a finger does not hover: a tap is only a click, so the mosaic keeps changing by itself", () => {
  render(<Mosaic density={1} auto />);

  fireEvent.pointerEnter(button(), { pointerType: "touch" });
  fireEvent.click(button());
  fireEvent.pointerLeave(button(), { pointerType: "touch" });

  expect(engine.pointerEnter).not.toHaveBeenCalled();
  expect(engine.pointerLeave).not.toHaveBeenCalled();
  expect(engine.click).toHaveBeenCalledTimes(1);
});
