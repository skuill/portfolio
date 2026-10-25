import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Section from "../Section";
import { Row, Col, Card } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import LoadingLines from "../LoadingLines";
import useNearViewport from "../../hooks/useNearViewport";
import { loadGithubProjects } from "../../utils/githubProjects.js";

const WebsiteCard = ({ website }) => {
  const { imageLink, url, description, technologies } =
    website;
  return (
    <Col md={6}>
      <Card className="card shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Img src={imageLink} alt={description} loading="lazy" decoding="async" />
        <Card.Body>
          {description ? <Card.Title as="h5">{description}</Card.Title> : <LoadingLines />}
          <Card.Text>
            {technologies ? `Created using: ${technologies}` : ""}
          </Card.Text>
          {url ? <Card.Link href={url}>Website Link</Card.Link> : <LoadingLines />}
        </Card.Body>
      </Card>
    </Col>
  );
};

// GitHub allows 60 requests per hour per IP without a token, so live data loads only when the reader
// scrolls close to the cards (this far ahead, to be ready on arrival); until then the snapshot is shown.
const PRELOAD_MARGIN = "600px 0px";

// github: { username, latest, specific, repos } from github-projects.json; repos is the snapshot.
const Project = ({ heading, github, projects }) => {
  const reposRef = useRef(null);
  const near = useNearViewport(reposRef, PRELOAD_MARGIN);
  const [repoList, setRepoList] = useState(github.repos);

  useEffect(() => {
    if (!near) return;
    loadGithubProjects(github).then(setRepoList, (error) => console.error(error.message));
  }, [near, github]);

  return (
    <Section id="projects" className="bg-light m-0">
      <Container className="">
        <h2 className="display-4 pb-5 text-center">{heading}</h2>
        <Row>
          {projects.websites &&
            projects.websites.length > 0 &&
            projects.websites.map((website, index) => (
              <WebsiteCard
                key={`website-card-${index}`}
                id={`website-card-${index}`}
                website={website}
              />
            ))}
        </Row>
        <Row ref={reposRef}>
          {repoList.map((project) => (
            <ProjectCard key={project.name} value={project} />
          ))}
        </Row>
      </Container>
    </Section>
  );
};

export default Project;
