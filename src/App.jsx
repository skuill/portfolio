import { navBar, mainBody, about, projects, interests, skills, getInTouch, experiences } from "./editable-stuff/config.js";
import MainBody from "./components/home/MainBody";
import AboutMe from "./components/home/AboutMe";
import Project from "./components/home/Project";
import Navbar from "./components/Navbar";
import Skills from "./components/home/Skills";
import GetInTouch from "./components/home/GetInTouch.jsx";
import Interests from "./components/home/Interests.jsx";
import Experience from "./components/home/Experience";

// Google Analytics: the gtag snippet in index.html sends the page view.
const App = () => (
  <>
    {navBar.show && <Navbar />}
    <MainBody firstName={mainBody.firstName} lastName={mainBody.lastName} message={mainBody.message} icons={mainBody.icons} />
    {about.show && <AboutMe heading={about.heading} paragraphs={about.paragraphs} image={about.image} resume={about.resume} />}
    {experiences.show && <Experience experiences={experiences} resume={about.resume} />}
    {projects.show && <Project heading={projects.heading} github={projects.github} items={projects.items} families={projects.families} />}
    {skills.show && <Skills heading={skills.heading} groups={skills.groups} />}
    {interests.show && (
      <Interests heading={interests.heading} intro={interests.intro} allTrips={interests.allTrips} trip={interests.trip} images={interests.images} />
    )}
    {getInTouch.show && <GetInTouch heading={getInTouch.heading} message={getInTouch.message} email={getInTouch.email} />}
  </>
);

export default App;
