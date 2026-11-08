import { useEffect, useState } from "react";
import { about, experiences, getInTouch, interests, mainBody, projects, skills } from "../editable-stuff/config.js";

const LINKS = [
  { show: about.show, href: "#aboutme", label: "About" },
  { show: experiences.show, href: "#experience", label: "Experience" },
  { show: projects.show, href: "#projects", label: "Projects" },
  { show: skills.show, href: "#skills", label: "Skills" },
  { show: interests.show, href: "#interests", label: "Interests" },
];

// A menu of anchors on one page: settles once the first screen is gone and follows the section in view.
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: "-70px 0px 0px",
    });
    heroObserver.observe(document.getElementById("home"));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          setActive((current) => {
            if (isIntersecting) return target.id;
            return current === target.id ? null : current;
          });
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll(".band").forEach((section) => sectionObserver.observe(section));

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const menuLink = (href, label) => (
    <li key={href}>
      <a href={href} className={active === href.slice(1) ? "active" : undefined}>
        {label}
      </a>
    </li>
  );

  return (
    <header className={`bar${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href="#home">
        {mainBody.firstName} {mainBody.lastName}
      </a>
      <ul>
        {LINKS.filter(({ show }) => show).map(({ href, label }) => menuLink(href, label))}
        <li>
          <a href={about.resume} target="_blank" rel="noreferrer noopener">
            Resume
          </a>
        </li>
        {getInTouch.show && menuLink("#contact", "Contact")}
      </ul>
    </header>
  );
};

export default Navbar;
