// A full-width page section with a padded container (the markup Bootstrap 4's Jumbotron used to give).
const Section = ({ id, className = "", style, children }) => (
  <div id={id} className={`py-3 ${className}`} style={style ?? { backgroundColor: "#e9ecef" }}>
    <div className="container py-5">{children}</div>
  </div>
);

export default Section;
