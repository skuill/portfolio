// color: the day's track colour; the block takes a light tint of it.
const DayNumbers = ({ numbers, color }) => (
  <dl className="day-numbers" style={color ? { background: `${color}29` } : undefined}>
    {numbers.map(([name, value]) => (
      <div key={name}>
        <dt>{name}</dt>
        <dd>{value}</dd>
      </div>
    ))}
  </dl>
);

export default DayNumbers;
