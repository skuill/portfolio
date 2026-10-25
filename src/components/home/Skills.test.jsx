import { render, screen, within } from "@testing-library/react";
import Skills from "./Skills";
import { skills } from "../../editable-stuff/config";

const renderedGroups = () =>
  screen.getAllByRole("heading", { level: 3 }).map((heading) => ({
    name: heading.textContent,
    items: within(heading.nextElementSibling)
      .getAllByRole("listitem")
      .map((item) => item.textContent),
  }));

test("renders every skill group with all its items in config order", () => {
  render(<Skills heading="Skills" groups={skills.groups} />);

  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Skills");
  expect(renderedGroups()).toEqual(skills.groups);
});

test("renders the given groups and nothing else", () => {
  const groups = [
    { name: "Core", items: ["C#", "RabbitMQ"] },
    { name: "Testing", items: ["xUnit"] },
  ];

  render(<Skills heading="Skills" groups={groups} />);

  expect(renderedGroups()).toEqual(groups);
  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
});
