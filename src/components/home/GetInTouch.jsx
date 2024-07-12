import React from "react";

const GetInTouch = ({ heading, message, email }) => {
  return (
    <div id="contact">
      <h2 className="display-4 pb-3 text-center">{heading}</h2>
      <p className="lead text-center pb-3">
        {message}, <a className="text-decoration-none" href={`mailto:${email}`}>{email}</a>.
      </p>
    </div>
  );
};

export default GetInTouch;
