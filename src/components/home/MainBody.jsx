import React from "react";
import Container from "react-bootstrap/Container";
import { FaGithub, FaInstagram, FaLinkedin, FaStrava, FaTelegram } from "react-icons/fa";
import Section from "../Section";

const ICONS = {
  "fa-github": FaGithub,
  "fa-linkedin": FaLinkedin,
  "fa-instagram": FaInstagram,
  "fa-telegram": FaTelegram,
  "fa-strava": FaStrava,
};

const MainBody = React.forwardRef(
  ({ gradient, title, message, icons }, ref) => {
    return (
      <Section
        id="home"
        style={{
          background: `linear-gradient(136deg,${gradient})`,
          backgroundSize: "1200% 1200%",
        }}
        className="title bg-transparent bgstyle text-light min-vh-100 d-flex align-content-center align-items-center flex-wrap m-0"
      >
        <div id="stars"></div>
        <div id="stars2"></div>
        <Container className="text-center">
          <h1 ref={ref} className="display-1">
            {title}
          </h1>
          <div className="lead typist">{message}</div>
          <div className="p-5">
            {icons.map((icon) => {
              const Icon = ICONS[icon.image];
              return (
                <a
                  key={icon.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={icon.url}
                  aria-label={`My ${icon.image.split("-")[1]}`}
                >
                  <Icon className="socialicons" size="3em" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <a
            className="btn btn-outline-light btn-lg "
            href="#aboutme"
            role="button"
            aria-label="Learn more about me"
          >
            More about me
          </a>
        </Container>
      </Section>
    );
  }
);

export default MainBody;
