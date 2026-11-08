import { useEffect, useRef, useState } from "react";
import Section from "../Section";
import useNearViewport from "../../hooks/useNearViewport";
import { loadGithubProjects } from "../../utils/githubProjects.js";

// GitHub allows 60 requests per hour per IP without a token, so live stars load only when the reader
// scrolls close to the section (this far ahead, to be ready on arrival); until then the snapshot is shown.
const PRELOAD_MARGIN = "600px 0px";

const Preview = ({ preview }) => {
  if (preview.image) return <img src={preview.image} alt={preview.alt} loading="lazy" decoding="async" />;
  if (preview.code) return <pre>{preview.code}</pre>;
  return (
    <div className="chat">
      <div className="bubble me">{preview.chat.ask}</div>
      <div className="bubble">{preview.chat.reply}</div>
      <div className="chat-actions">
        {preview.chat.options.map((option) => (
          <span key={option}>{option}</span>
        ))}
      </div>
    </div>
  );
};

// The small line under a project: its own figure and, for a repository, the live stars.
const statOf = (project, stars) =>
  [project.stat, project.repo && stars[project.repo] !== undefined ? `★ ${stars[project.repo]}` : null].filter(Boolean).join(" · ");

const toStars = (repos) => Object.fromEntries(repos.map(({ name, stargazers_count }) => [name, stargazers_count]));

// Neighbouring projects of one family become a single group; the others stand alone.
const groupByFamily = (items) =>
  items.reduce((groups, project, index) => {
    const last = groups[groups.length - 1];
    if (project.family && last?.family === project.family) last.members.push({ project, index });
    else groups.push({ family: project.family, members: [{ project, index }] });
    return groups;
  }, []);

const Project = ({ heading, github, items, families }) => {
  const showRef = useRef(null);
  const near = useNearViewport(showRef, PRELOAD_MARGIN);
  const [stars, setStars] = useState(() => toStars(github.repos));
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!near) return;
    loadGithubProjects(github).then(
      (repos) => setStars(toStars(repos)),
      (error) => console.error(error.message)
    );
  }, [near, github]);

  return (
    <Section id="projects" tall crumble>
      <h2>{heading}</h2>
      <div className="projects">
        <div ref={showRef} className="show">
          <div key={items[selected].name} className="stage-box">
            <Preview preview={items[selected].preview} />
          </div>
          <div className="show-meta stack">
            {items.map((project, index) => (
              <div key={project.name} className={index === selected ? "current" : undefined}>
                <h3>
                  <a href={project.url}>{project.urlLabel ?? project.name}</a>
                </h3>
                <div className="tech">{project.stack}</div>
                {project.links.length > 0 && (
                  <div className="show-links">
                    {project.links.map(({ label, url }) => (
                      <a key={url} href={url}>
                        {label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="picks">
          {groupByFamily(items).map(({ family, members }) => {
            const buttons = members.map(({ project, index }) => {
              const stat = statOf(project, stars);
              return (
                <button key={project.name} className="pick" type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>
                  <b>{project.hook}</b>
                  <span>{project.text}</span>
                  {stat && <em>{stat}</em>}
                </button>
              );
            });
            if (!family) return buttons;
            return (
              <div key={family} className="pick-family">
                <b>{families[family].title}</b>
                <span>{families[family].text}</span>
                {buttons}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Project;
