import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Section from "../Section";
import { Container } from "react-bootstrap";

const Skills = ({ heading, groups }) => {
  return (
    <Section className="bg-white m-0" id="skills">
      <Container className="p-3">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {groups.map((group) => (
            <Col key={group.name} xs={12} md={6} className="pb-4">
              <h3 className="h5">{group.name}</h3>
              <ul className="list-unstyled d-flex flex-wrap gap-2 m-0">
                {group.items.map((item) => (
                  <li key={item} className="skill-tag">
                    {item}
                  </li>
                ))}
              </ul>
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
};

export default Skills;
