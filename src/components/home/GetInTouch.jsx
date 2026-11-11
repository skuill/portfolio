import Section from "../Section";

const GetInTouch = ({ heading, message, email }) => (
  <Section id="contact" crumble>
    <h2>{heading}</h2>
    <p>{message}</p>
    <a className="mail" href={`mailto:${email}`}>
      {email}
    </a>
  </Section>
);

export default GetInTouch;
