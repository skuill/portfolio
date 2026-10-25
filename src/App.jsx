import React from "react";
import {
  navBar,
  mainBody,
  about,
  repos,
  projects,
  interests,
  skills,
  getInTouch,
  experiences
} from "./editable-stuff/config.js";
import MainBody from "./components/home/MainBody";
import AboutMe from "./components/home/AboutMe";
import Project from "./components/home/Project";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Skills from "./components/home/Skills";
import GetInTouch from "./components/home/GetInTouch.jsx";
import Interests from "./components/home/Interests.jsx";
import Experience from "./components/home/Experience";

// Google Analytics: the gtag snippet in public/index.html sends the page view.
const App = () => {
  const titleRef = React.useRef();

  return (
    <>
      {navBar.show && <Navbar ref={titleRef} />}
      <MainBody
        gradient={mainBody.gradientColors}
        title={`${mainBody.firstName} ${mainBody.middleName} ${mainBody.lastName}`}
        message={mainBody.message}
        icons={mainBody.icons}
        ref={titleRef}
      />
      {about.show && (
        <AboutMe
          heading={about.heading}
          message={about.message}
          link={about.imageLink}
          imgSize={about.imageSize}
          resume={about.resume}
        />
      )}
      {experiences.show && <Experience experiences={experiences} />}
      {(repos.show || projects.show) && (
        <Project
          heading={repos.heading}
          github={repos.github}
          projects={projects}
        />
      )}
      {skills.show && (
        <Skills
          heading={skills.heading}
          groups={skills.groups}
        />
      )}
      {interests.show && (
        <Interests
          heading={interests.heading}
          message={interests.message}
          img={interests.images}
          imageSize={interests.imageSize}
        />
      )}
      <Footer>
        {getInTouch.show && (
          <GetInTouch
            heading={getInTouch.heading}
            message={getInTouch.message}
            email={getInTouch.email}
          />
        )}
      </Footer>
    </>
  );
};

export default App;
