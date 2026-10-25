import React from "react";
import Section from "../Section";

const VISIBLE_ACHIEVEMENTS = 2;

const Achievements = ({ items }) => {
  if (!items || items.length === 0) return null;
  const visible = items.slice(0, VISIBLE_ACHIEVEMENTS);
  const hidden = items.slice(VISIBLE_ACHIEVEMENTS);
  return (
    <>
      <ul className="timeline-achievements">
        {visible.map((item) => <li key={item}>{item}</li>)}
      </ul>
      {hidden.length > 0 && (
        <details className="timeline-more">
          <summary>
            <span className="show-all">Show all</span>
            <span className="show-less">Show less</span>
          </summary>
          <ul className="timeline-achievements">
            {hidden.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </details>
      )}
    </>
  );
};

const Role = ({ title, company, dates, summary, achievements, nested }) => (
  <div className={nested ? "timeline-role nested" : "timeline-role"}>
    <div className="timeline-head">
      <h3 className="timeline-title">
        {title}
        {company && <span className="timeline-company"> · {company}</span>}
      </h3>
      <span className="timeline-dates">{dates}</span>
    </div>
    {summary && <p className="timeline-summary">{summary}</p>}
    <Achievements items={achievements} />
  </div>
);

const Experience = ({ experiences }) => (
  <Section id="experience" className="bg-white">
    <h2 className="display-4 mb-5 text-center">{experiences.heading}</h2>
    <ol className="timeline">
      {experiences.data.map((job) => (
        <li className="timeline-item" key={`${job.company}-${job.dates}`}>
          <div className="timeline-logo">
            <img src={job.logo} alt={`${job.company} logo`} loading="lazy" width="40" height="40" />
          </div>
          <div className="timeline-card">
            {job.roles ? (
              <>
                <div className="timeline-head">
                  <h3 className="timeline-title">{job.company}</h3>
                  <span className="timeline-dates">{job.dates}</span>
                </div>
                {job.roles.map((role) => (
                  <Role key={role.dates} nested title={role.role} dates={role.dates}
                        summary={role.summary} achievements={role.achievements} />
                ))}
              </>
            ) : (
              <Role title={job.role} company={job.company} dates={job.dates}
                    summary={job.summary} achievements={job.achievements} />
            )}
          </div>
        </li>
      ))}
    </ol>
  </Section>
);

export default Experience;
