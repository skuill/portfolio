import { FaGithub, FaInstagram, FaLinkedin, FaStrava, FaTelegram } from "react-icons/fa";
import Mosaic from "../Mosaic/Mosaic";

const ICONS = {
  "fa-github": FaGithub,
  "fa-linkedin": FaLinkedin,
  "fa-instagram": FaInstagram,
  "fa-telegram": FaTelegram,
  "fa-strava": FaStrava,
};

const MainBody = ({ firstName, lastName, message, icons }) => (
  <section id="home">
    <div className="name">
      <h1>
        <span>{firstName}</span> <span>{lastName}</span>
      </h1>
      {/* Small mosaics need thinner gaps and a colour boost, or the page shows through and the picture fades. */}
      <Mosaic id="stamp" density={1.45} auto gap={0.55} boost={1.3} />
    </div>
    <p className="role">{message}</p>
    <div className="socials">
      {icons.map((icon) => {
        const Icon = ICONS[icon.image];
        return (
          <a key={icon.url} target="_blank" rel="noopener noreferrer" href={icon.url} aria-label={`My ${icon.image.split("-")[1]}`}>
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
    <a className="more" href="#aboutme">
      More about me
    </a>
  </section>
);

export default MainBody;
