import Section from "../Section";

const Skills = ({ heading, groups }) => (
  <Section id="skills" crumble>
    <h2>{heading}</h2>
    <dl className="skills">
      {groups.map(({ name, items }) => (
        <div key={name}>
          <dt>{name}</dt>
          <dd>{items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  </Section>
);

export default Skills;
