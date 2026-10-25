import Container from "react-bootstrap/Container";
import { FaCode, FaHeart, FaReact } from "react-icons/fa";

const Footer = (props) => {
  const bgStyle = { backgroundColor: "#f0eded" };

  return (
    <footer style={bgStyle} className="mt-auto py-5 text-center">
      <Container>
        {props.children}
        <FaCode aria-label="Code" /> with <FaHeart aria-label="love" /> by{" "}
        <a
          rel="noopener"
          href="https://github.com/skuill"
          aria-label="My GitHub"
        > <span className="badge bg-dark">
            Vitaly Kvashin
          </span>
        </a>{" "}
        using <FaReact aria-label="React" />
        <p>
          <small className="text-muted">
            Project code is open source. Feel free to fork and make your own
            version.
          </small>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
