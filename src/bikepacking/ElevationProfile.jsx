const WIDTH = 600;
const HEIGHT = 110;

// The elevation of a day along its distance, as a small filled chart in the day's colour.
// highest and lowest: the exact values from the day's statistics; the profile itself is a sample of the track.
const ElevationProfile = ({ profile, color, highest: exactHighest, lowest: exactLowest }) => {
  if (!profile || profile.length < 2) return null;
  const length = profile[profile.length - 1][0] || 1;
  const heights = profile.map(([, height]) => height);
  const lowest = Math.min(...heights);
  const highest = Math.max(...heights);
  const span = Math.max(highest - lowest, 50); // flat days are not stretched into mountains
  const x = (km) => ((km / length) * WIDTH).toFixed(1);
  const y = (height) => (HEIGHT - 6 - ((height - lowest) / span) * (HEIGHT - 16)).toFixed(1);
  const line = profile.map(([km, height], index) => `${index ? "L" : "M"}${x(km)},${y(height)}`).join("");

  return (
    <figure className="profile">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" role="img" aria-label={`Elevation from ${lowest} to ${highest} m over ${Math.round(length)} km`}>
        <path d={`${line}L${WIDTH},${HEIGHT}L0,${HEIGHT}Z`} fill={color} fillOpacity="0.18" />
        <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <figcaption>
        <span>{exactHighest ?? highest} m</span>
        <span>{exactLowest ?? lowest} m</span>
        <span>{Math.round(length)} km</span>
      </figcaption>
    </figure>
  );
};

export default ElevationProfile;
