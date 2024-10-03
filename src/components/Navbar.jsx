import React, { useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import useResizeObserver from "../hooks/useResizeObserver";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { mainBody, repos, about, skills, experiences, interests } from "../editable-stuff/config.js";
import { NavLink, StyledNavLink } from "./home/migration";

const Navigation = React.forwardRef((props, ref) => {
  const [isTop, setIsTop] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navbarMenuRef = React.useRef();
  const navbarDimensions = useResizeObserver(navbarMenuRef);
  const navBottom = navbarDimensions ? navbarDimensions.bottom : 0;
  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!navbarDimensions) return;
      if (ref.current === undefined) return;
      currPos.y + ref.current.offsetTop - navbarDimensions.bottom > 5 || (currPos.y === 0 && ref.current.offsetTop === 0)
        ? setIsTop(true)
        : setIsTop(false);
      setScrollPosition(currPos.y);
    },
    [navBottom]
  );

  React.useEffect(() => {
    if (!navbarDimensions) return;
    if (ref.current === undefined) return;
    // The second condition fixed case when component with ref is on the top with fixed offset. 
    navBottom - scrollPosition >= ref.current.offsetTop && !(-scrollPosition < navbarDimensions.bottom && ref.current.offsetTop === 0) 
      ? setIsTop(false)
      : setIsTop(true);
  }, [navBottom, navbarDimensions, ref, scrollPosition]);

  return (
    <Navbar
      ref={navbarMenuRef}
      className={`px-3 fixed-top  ${!isTop ? "navbar-white" : "navbar-transparent"
        }`}
      expand="lg"
    >
      <Navbar.Brand className="navbar-brand" href={process.env.PUBLIC_URL + "/#home"}>
        {`<${mainBody.firstName} />`}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar-nav mr-auto">
          {about.show && (
            <StyledNavLink
              pathName="/#aboutme"
              linkName="About"
            >
            </StyledNavLink>
          )}
          {experiences.show && (
            <StyledNavLink
              pathName="/#experience"
              linkName="Experiences"
            >
            </StyledNavLink>
          )}
          {repos.show && (
            <StyledNavLink
              pathName="/#projects"
              linkName="Projects"
            >
            </StyledNavLink>
          )}
          {skills.show && (
            <StyledNavLink
              pathName="/#skills"
              linkName="Skills"
            >
            </StyledNavLink>
          )}
          {interests.show && (
            <StyledNavLink
              pathName="/#interests"
              linkName="Interests"
            >
            </StyledNavLink>
          )}
          <NavLink
            className="nav-item lead"
            href={about.resume}
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume
          </NavLink>
          <StyledNavLink
            pathName="/#contact"
            linkName="Contact"
          >
          </StyledNavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;
