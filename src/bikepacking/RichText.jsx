// Text with the little markdown the trip texts use inside a line: [links](https://...) and **bold**.
const INLINE = /\[([^\]]+)\]\((https?:[^)]+)\)|\*\*([^*]+)\*\*/g;

export const Inline = ({ text }) => {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      match[1] ? (
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer">
          {match[1]}
        </a>
      ) : (
        <b key={match.index}>{match[3]}</b>
      )
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
};

// The text about the whole trip (a report or an interview) as blocks written by scripts/import_trips.py:
// {h: heading}, {p: paragraph}, {ul: [items]}, {ol: [items]}.
export const GeneralText = ({ general }) => (
  <article className="general">
    <h3>{general.title}</h3>
    {general.blocks.map((block, index) => {
      if (block.h) return <h4 key={index}>{block.h}</h4>;
      if (block.p) return <p key={index}><Inline text={block.p} /></p>;
      const List = block.ol ? "ol" : "ul";
      return (
        <List key={index}>
          {(block.ol || block.ul).map((item) => (
            <li key={item}><Inline text={item} /></li>
          ))}
        </List>
      );
    })}
  </article>
);
