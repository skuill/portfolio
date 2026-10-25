import { useState } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { FaGithub } from "react-icons/fa";

// value: a repository as loadGithubProjects returns it (languages: bytes per language).
const ProjectCard = ({ value }) => {
  const {
    name,
    description,
    svn_url,
    stargazers_count,
    languages,
    pushed_at,
  } = value;
  return (
    <Col md={6}>
      <Card className="card shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title as="h5">{name}</Card.Title>
          <Card.Text>{description || ""}</Card.Text>
          <CardButtons svn_url={svn_url} />
          <hr />
          <Language data={languages} repo_url={svn_url} />
          <CardFooter star_count={stargazers_count} repo_url={svn_url} pushed_at={pushed_at} />
        </Card.Body>
      </Card>
    </Col>
  );
};

const CardButtons = ({ svn_url }) => {
  return (
    <div className="d-grid gap-2 d-md-block">
      <a
        href={`${svn_url}/archive/master.zip`}
        className="btn btn-outline-secondary mx-2"
      >
        <FaGithub aria-hidden="true" /> Clone Project
      </a>
      <a href={svn_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary mx-2">
        <FaGithub aria-hidden="true" /> Repo
      </a>
    </div>
  );
};

const Language = ({ data, repo_url }) => {
  const array = [];
  let total_count = 0;
  for (let index in data) {
    array.push(index);
    total_count += data[index];
  }

  return (
    <div className="pb-3">
      Languages:{" "}
      {array.length
        ? array.map((language) => (
          <a
            key={language}
            className="card-link"
            href={repo_url + `/search?l=${language}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="badge bg-light text-dark">
              {language}:{" "}
              {Math.trunc((data[language] / total_count) * 1000) / 10} %
            </span>
          </a>

        ))
        : "code yet to be deployed."}
    </div>
  );
};

// "just now", "5 hours ago" or "on October 1, 2026".
const updatedAgo = (pushed_at, now) => {
  const date = new Date(pushed_at);
  const hours = Math.trunc((now - date.getTime()) / 1000 / 60 / 60);

  if (hours < 1) return "just now";
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const options = { day: "numeric", month: "long", year: "numeric" };
  return `on ${new Intl.DateTimeFormat("en-US", options).format(date)}`;
};

const CardFooter = ({ star_count, repo_url, pushed_at }) => {
  // The time of the first render: rendering stays pure, the text does not change while the page is open.
  const [now] = useState(Date.now);
  const updated_at = updatedAgo(pushed_at, now);

  return (
    <p className="card-text">
      <a
        href={repo_url + "/stargazers"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-dark text-decoration-none"
      >
        <span className="text-dark card-link me-4">
          <FaGithub aria-hidden="true" /> Stars{" "}
          <span className="badge text-bg-dark">{star_count}</span>
        </span>
      </a>
      <small className="text-muted">Updated {updated_at}</small>
    </p>
  );
};

export default ProjectCard;
