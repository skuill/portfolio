import { render } from "@testing-library/react";
import ElevationProfile from "./ElevationProfile";

test("draws the day's elevation and labels the highest and lowest points and the distance", () => {
  const { container } = render(<ElevationProfile profile={[[0, 100], [5, 150], [10, 120]]} highest={152} lowest={98} color="#d08a68" />);

  expect(container.querySelector("svg")).toHaveAttribute("aria-label", "Elevation from 100 to 150 m over 10 km");
  expect(container.querySelectorAll("path")[1].getAttribute("d")).toBe("M0.0,104.0L300.0,10.0L600.0,66.4");
  expect([...container.querySelectorAll("figcaption span")].map((s) => s.textContent)).toEqual(["152 m", "98 m", "10 km"]);
});

test("draws nothing for a day without a recorded elevation", () => {
  const { container } = render(<ElevationProfile profile={undefined} color="#000" />);

  expect(container.innerHTML).toBe("");
});
