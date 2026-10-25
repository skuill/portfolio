import { fireEvent, render, screen } from "@testing-library/react";
import Experience from "./Experience";
import { experiences } from "../../editable-stuff/config";

const texts = (nodes) => [...nodes].map((node) => node.textContent);

// Reads what the timeline shows: per company, its logo, an optional company header and every role.
const readTimeline = (container) =>
  [...container.querySelectorAll(".timeline-item")].map((item) => ({
    logo: item.querySelector(".timeline-logo img").getAttribute("alt"),
    company: item.querySelector(".timeline-card > .timeline-head .timeline-title")?.textContent,
    roles: [...item.querySelectorAll(".timeline-role")].map((role) => {
      const toggle = role.querySelector(":scope > .timeline-toggle");
      const collapse = role.querySelector(":scope > .timeline-collapse");
      return {
        title: role.querySelector(".timeline-title").textContent,
        dates: role.querySelector(".timeline-dates").textContent,
        summary: role.querySelector(".timeline-summary")?.textContent,
        visible: texts(role.querySelectorAll(":scope > .timeline-achievements li")),
        hidden: texts(role.querySelectorAll(":scope > .timeline-collapse li")),
        toggle: toggle && {
          text: toggle.textContent,
          expanded: toggle.getAttribute("aria-expanded"),
          controlsCollapse: toggle.getAttribute("aria-controls") === collapse.id,
          collapseOpen: collapse.classList.contains("open"),
          collapseHidden: collapse.getAttribute("aria-hidden"),
        },
      };
    }),
  }));

const closedToggle = (hiddenCount) => ({
  text: `Show ${hiddenCount} more`,
  expanded: "false",
  controlsCollapse: true,
  collapseOpen: false,
  collapseHidden: "true",
});

const expectedRole = (title, dates, summary, achievements = []) => ({
  title,
  dates,
  summary,
  visible: achievements.slice(0, 2),
  hidden: achievements.slice(2),
  toggle: achievements.length > 2 ? closedToggle(achievements.length - 2) : null,
});

test("shows every job, role, date and achievement from the config, extra achievements folded", () => {
  const { container } = render(<Experience experiences={experiences} />);

  expect(readTimeline(container)).toEqual(
    experiences.data.map((job) => ({
      logo: `${job.company} logo`,
      company: job.roles ? job.company : undefined,
      roles: job.roles
        ? job.roles.map((role) => expectedRole(role.role, role.dates, role.summary, role.achievements))
        : [expectedRole(`${job.role} · ${job.company}`, job.dates, job.summary, job.achievements)],
    }))
  );
});

test("the toggle opens and closes the extra achievements of its own role only", () => {
  const data = [
    { company: "Acme", logo: "acme.png", role: "Developer", dates: "2020 - 2021", achievements: ["A", "B", "C", "D"] },
    { company: "Beta", logo: "beta.png", role: "Engineer", dates: "2018 - 2020", achievements: ["E", "F", "G"] },
  ];
  const { container } = render(<Experience experiences={{ heading: "Experiences", data }} />);
  const open = { expanded: "true", collapseOpen: true, collapseHidden: "false", text: "Show less", controlsCollapse: true };

  fireEvent.click(screen.getByRole("button", { name: "Show 2 more" }));

  expect(readTimeline(container).map((job) => job.roles[0].toggle)).toEqual([open, closedToggle(1)]);

  fireEvent.click(screen.getByRole("button", { name: "Show less" }));

  expect(readTimeline(container).map((job) => job.roles[0].toggle)).toEqual([closedToggle(2), closedToggle(1)]);
});

test("shows no toggle when a role has two achievements or fewer", () => {
  const data = [{ company: "Acme", logo: "acme.png", role: "Developer", dates: "2020 - 2021", achievements: ["One", "Two"] }];

  const { container } = render(<Experience experiences={{ heading: "Experiences", data }} />);

  expect(readTimeline(container)).toEqual([
    { logo: "Acme logo", company: undefined, roles: [expectedRole("Developer · Acme", "2020 - 2021", undefined, ["One", "Two"])] },
  ]);
});
