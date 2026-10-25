import { render } from "@testing-library/react";
import Experience from "./Experience";
import { experiences } from "../../editable-stuff/config";

const texts = (nodes) => [...nodes].map((node) => node.textContent);

// Reads what the timeline shows: per company, its logo, an optional company header and every role.
const readTimeline = (container) =>
  [...container.querySelectorAll(".timeline-item")].map((item) => ({
    logo: item.querySelector(".timeline-logo img").getAttribute("alt"),
    company: item.querySelector(".timeline-card > .timeline-head .timeline-title")?.textContent,
    roles: [...item.querySelectorAll(".timeline-role")].map((role) => ({
      title: role.querySelector(".timeline-title").textContent,
      dates: role.querySelector(".timeline-dates").textContent,
      summary: role.querySelector(".timeline-summary")?.textContent,
      visible: texts(role.querySelectorAll(":scope > .timeline-achievements li")),
      hidden: texts(role.querySelectorAll(":scope > details li")),
    })),
  }));

const expectedRole = (title, dates, summary, achievements = []) => ({
  title,
  dates,
  summary,
  visible: achievements.slice(0, 2),
  hidden: achievements.slice(2),
});

test("shows every job, role, date and achievement from the config, the first two achievements open", () => {
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

test("hides nothing and shows no toggle when a role has two achievements or fewer", () => {
  const data = [{ company: "Acme", logo: "acme.png", role: "Developer", dates: "2020 - 2021", achievements: ["One", "Two"] }];

  const { container } = render(<Experience experiences={{ heading: "Experiences", data }} />);

  expect(readTimeline(container)).toEqual([
    { logo: "Acme logo", company: undefined, roles: [expectedRole("Developer · Acme", "2020 - 2021", undefined, ["One", "Two"])] },
  ]);
  expect(container.querySelector("details")).toBeNull();
});
