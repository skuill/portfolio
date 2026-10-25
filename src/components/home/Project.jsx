import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";
import Section from "../Section";
import { Row, Col, Card } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import { fetchJson } from "../../utils/fetchJson";
import LoadingLines from "../LoadingLines";

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

const dummyProject = {
  name: null,
  description: null,
  svn_url: null,
  stargazers_count: null,
  languages_url: null,
  pushed_at: null,
};
const API = "https://api.github.com";
// const gitHubQuery = "/repos?sort=updated&direction=desc";
// const specficQuerry = "https://api.github.com/repos/skuill/";

const Project = ({ heading, username, length, specfic, projects }) => {
  const allReposAPI = `${API}/users/${username}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${username}`;
  const dummyProjectsArr = new Array(length + specfic.length).fill(
    dummyProject
  );

  const [projectsArray, setProjectsArray] = useState([]);

  const fetchRepos = useCallback(async () => {
    let repoList = [];
    try {
      // getting all repos
      const allRepos = await fetchJson(allReposAPI);
      // slicing to the length
      repoList = [...allRepos.slice(0, length)];
      // adding specified repos
      try {
        for (let repoName of specfic) {
          repoList.push(await fetchJson(`${specficReposAPI}/${repoName}`));
        }
      } catch (error) {
        console.error(error.message);
      }
      // setting projectArray
      // TODO: remove the duplication.
      setProjectsArray(repoList);
    } catch (error) {
      console.error(error.message);
    }
  }, [allReposAPI, length, specfic, specficReposAPI]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);
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
        <Row>
          {projectsArray.length
            ? projectsArray.map((project, index) => (
                <ProjectCard
                  key={`project-card-${index}`}
                  id={`project-card-${index}`}
                  value={project}
                />
              ))
            : dummyProjectsArr.map((project, index) => (
                <ProjectCard
                  key={`dummy-${index}`}
                  id={`dummy-${index}`}
                  value={project}
                />
              ))}
        </Row>
      </Container>
    </Section>
  );
};

export default Project;
