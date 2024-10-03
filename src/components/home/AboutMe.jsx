import React from "react";
import ReactGA from 'react-ga4';

import axios from "axios";
import { Jumbotron } from "./migration";

const pictureLinkRegex = new RegExp(
  /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

const AboutMe = ({ heading, message, link, imgSize, resume }) => {
  const [profilePicUrl, setProfilePicUrl] = React.useState("");
  const [showPic, setShowPic] = React.useState(Boolean(link));
  // https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
  React.useEffect(() => {
    const handleRequest = async () => {
      const instaLink = "https://www.instagram.com/";
      const instaQuery = "/?__a=1";
      try {
        const response = await axios.get(instaLink + link + instaQuery);
        setProfilePicUrl(response.data.graphql.user.profile_pic_url_hd);
      } catch (error) {
        setShowPic(false);
        console.error(error.message);
      }
    };

    if (link && !pictureLinkRegex.test(link)) {
      handleRequest();
    } else {
      setProfilePicUrl(link);
    }
  }, [link]);

  const handleResumeClick = () => {
    ReactGA.event({
        category: 'Resume',
        action: 'Click',
        label: 'Resume Download',
    });
  };

  return (
    <Jumbotron id="aboutme" className="m-0 bg-gray">
      <div className="container">
        <div className="row">
          <h2 className="display-4 mb-5 text-center">{heading}</h2>
        </div>
        <div className="row">
          <div className="mb-5 col-lg-5 d-block align-self-center d-flex justify-content-center text-center">
            {showPic && (
              <img
                className="rounded-circle img-relative-front"
                src={profilePicUrl}
                alt="profilepicture"
                width={imgSize}
                height={imgSize}
              />
            )}
          </div>
          <div className={`col-lg-${showPic ? "7" : "12"}`}>
            <p className="lead text-center">{message}</p>
            {resume && (
              <p className="lead text-center">
                <a
                  className="btn btn-outline-dark btn-lg"
                  href={resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  role="button"
                  aria-label="Resume/CV"
                  onClick={() => handleResumeClick()}
                >
                  Resume
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </Jumbotron>
  );
};

export default AboutMe;
