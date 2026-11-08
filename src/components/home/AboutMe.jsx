import Section from "../Section";

const handleResumeClick = () => {
  // Same event as before the move from react-ga4 to the gtag snippet in index.html.
  window.gtag?.("event", "Click", { event_category: "Resume", event_label: "Resume Download" });
};

const AboutMe = ({ heading, paragraphs, image, resume }) => (
  <Section id="aboutme" tall>
    <div className="about">
      <img className="portrait" src={image} alt="Vitaly Kvashin" width="400" height="400" loading="lazy" decoding="async" />
      <div>
        <h2>{heading}</h2>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <a className="pill" href={resume} target="_blank" rel="noreferrer noopener" role="button" aria-label="Resume/CV" onClick={handleResumeClick}>
          Resume
        </a>
      </div>
    </div>
  </Section>
);

export default AboutMe;
