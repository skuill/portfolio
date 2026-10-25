import React from "react";
import Section from "../Section";

const handleResumeClick = () => {
  // Same event as before the move from react-ga4 to the gtag snippet in public/index.html.
  window.gtag?.("event", "Click", { event_category: "Resume", event_label: "Resume Download" });
};

const AboutMe = ({ heading, message, link, imgSize, resume }) => {
  return (
    <Section id="aboutme" className="m-0 bg-gray">
      <div className="container">
        <div className="row">
          <h2 className="display-4 mb-5 text-center">{heading}</h2>
        </div>
        <div className="row">
          <div className="mb-5 col-lg-5 d-block align-self-center d-flex justify-content-center text-center">
            {link && (
              <img
                className="rounded-circle img-relative-front"
                src={link}
                alt="Vitaly Kvashin"
                width={imgSize}
                height={imgSize}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
          <div className={`col-lg-${link ? "7" : "12"}`}>
            <p className="lead text-center">{message}</p>
            {resume && (
              <p className="lead text-center">
                <a
                  className="btn btn-outline-dark btn-lg"
                  href={resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  role="button"
                  aria-label="Resume/CV"
                  onClick={handleResumeClick}
                >
                  Resume
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutMe;
