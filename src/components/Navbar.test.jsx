import { render, screen, within } from "@testing-library/react";
import Navbar from "./Navbar";
import { installIntersectionObserver } from "../testing/intersectionObserver";
import { about } from "../editable-stuff/config";

let viewport;
let sections;
beforeEach(() => {
  viewport = installIntersectionObserver();
  document.body.innerHTML = `<div id="home"></div><section id="aboutme" class="band"></section><section id="skills" class="band"></section>`;
  sections = { home: document.getElementById("home"), about: document.getElementById("aboutme"), skills: document.getElementById("skills") };
});

const renderBar = () => render(<Navbar />, { container: document.body.appendChild(document.createElement("div")) });
const header = () => screen.getByRole("banner");
const activeLinks = () => within(header()).getAllByRole("link").filter((link) => link.classList.contains("active")).map((link) => link.textContent);

test("links to every section of the one page and opens the resume separately", () => {
  renderBar();

  expect(within(header()).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
    ["Vitaly Kvashin", "#home"],
    ["About", "#aboutme"],
    ["Experience", "#experience"],
    ["Projects", "#projects"],
    ["Skills", "#skills"],
    ["Interests", "#interests"],
    ["Resume", about.resume],
    ["Contact", "#contact"],
  ]);
});

test("settles only after the first screen has gone", () => {
  renderBar();
  expect(header()).not.toHaveClass("scrolled");

  viewport.intersect(sections.home, false);
  expect(header()).toHaveClass("scrolled");

  viewport.intersect(sections.home, true);
  expect(header()).not.toHaveClass("scrolled");
});

test("marks the section in view and clears the mark when no section is in view", () => {
  renderBar();
  expect(activeLinks()).toEqual([]);

  viewport.intersect(sections.about);
  expect(activeLinks()).toEqual(["About"]);

  viewport.intersect(sections.skills);
  expect(activeLinks()).toEqual(["Skills"]);

  viewport.intersect(sections.about, false);
  expect(activeLinks()).toEqual(["Skills"]);

  viewport.intersect(sections.skills, false);
  expect(activeLinks()).toEqual([]);
});
