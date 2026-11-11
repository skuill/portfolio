import { render, screen } from "@testing-library/react";
import Skills from "./Skills";
import { skills } from "../../editable-stuff/config";

const renderedGroups = (container) =>
  [...container.querySelectorAll("dl > div")].map((group) => [group.querySelector("dt").textContent, group.querySelector("dd").textContent]);

test("renders every skill group as one plain line in config order", () => {
  const { container } = render(<Skills heading="Skills" groups={skills.groups} />);

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Skills");
  expect(renderedGroups(container)).toEqual(skills.groups.map(({ name, items }) => [name, items.join(", ")]));
});
