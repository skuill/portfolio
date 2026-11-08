import { useState } from "react";
import Section from "../Section";

// Pick a company on the left, its card shows on the right. All cards share one grid cell, so the tallest
// one holds the height and nothing on the page moves when another is picked.
const Experience = ({ experiences, resume }) => {
  const [selected, setSelected] = useState(0);

  return (
    <Section id="experience" tall crumble>
      <div className="jobs">
        <div>
          <h2>{experiences.heading}</h2>
          <ol>
            {experiences.data.map((job, index) => (
              <li key={job.company}>
                <button className="job-pick" type="button" aria-pressed={index === selected} onClick={() => setSelected(index)}>
                  <img src={job.logo} alt="" loading="lazy" decoding="async" />
                  <span>
                    <b>{job.company}</b>
                    <small>{job.dates}</small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="stack">
          {experiences.data.map((job, index) => (
            <article key={job.company} className={`panel${index === selected ? " current" : ""}`}>
              <h3>{job.role}</h3>
              <div className="dates">{job.company}</div>
              <p>{job.summary}</p>
              {job.achievements.length > 0 && (
                <ul>
                  {job.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              )}
              <a className="full" href={resume} target="_blank" rel="noreferrer noopener">
                Full list in the resume
              </a>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
