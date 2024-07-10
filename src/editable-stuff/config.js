// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "#6293ca, #1ad7c0, #f0b35d, #9c62b3, #cf7171, #d2eaf0",
  firstName: "Vitaly",
  middleName: "",
  lastName: "Kvashin",
  message: " Passionate Senior Software Developer ",
  icons: [
    {
      image: "fa-github",
      url: "https://github.com/skuill",
    },
    {
      image: "fa-linkedin",
      url: "https://www.linkedin.com/in/vitaly-kvashin/",
    },
    {
      image: "fa-instagram",
      url: "https://www.instagram.com/graznayagora/",
    }
  ],
};

// ABOUT SECTION
// If you want the About Section to show a profile picture you can fill the profilePictureLink either with:
//a) your Instagram username
//      i.e:profilePictureLink:"johnDoe123",
//b) a link to an hosted image
//      i.e:profilePictureLink:"www.picturesonline.com/johnDoeFancyAvatar.jpg",
//c) image in "editable-stuff" directory and use require("") to import here,
//      i.e: profilePictureLink: require("../editable-stuff/hashirshoaeb.png"),
//d) If you do not want any picture to be displayed, just leave it empty :)
//      i.e: profilePictureLink: "",
// For Resume either provide link to your resume or import from "editable-stuff" directory
//     i.e resume: require("../editable-stuff/resume.pdf"),
//         resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/skuill.png"),
  imageSize: 375,
  message:
    "My name is Vitaly Kvashin. I have been developing software for 9 years already. After graduating in computer science from Moscow State University, I worked as a developer in a small startup specializing in computer vision for about 4 years. Then I grew up to Senior NET Developer at the largest telecom operator in Russia - MTS, where I worked on a project, that allow developers and businesses to monitor and troubleshoot interactions between complex distributed systems. Almost two years ago I moved to Armenia and work at EPAM, where I am developing an alternative financial platform for one of the large clients in a distributed team. I enjoy solving complex problems and helping other developers and customers create and deliver quality solutions. I have deep experience at all stages of the software development life cycle. Now I am open to any opportunities and interesting projects!",
  resume: require("../editable-stuff/resume.pdf"),
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]
const repos = {
  show: true,
  heading: "Recent Projects",
  gitHubUsername: "skuill", //i.e."johnDoe12Gh"
  reposLength: 4,
  specificRepos: [],
};

// Leadership SECTION
const leadership = {
  show: false,
  heading: "Leadership",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae auctor eu augue ut lectus arcu bibendum at varius. Libero justo laoreet sit amet cursus sit amet. Imperdiet dui accumsan sit amet nulla facilisi morbi. At auctor urna nunc id. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Et magnis dis parturient montes nascetur ridiculus mus mauris. In nisl nisi scelerisque eu ultrices vitae auctor. Mattis nunc sed blandit libero volutpat sed cras ornare. Pulvinar neque laoreet suspendisse interdum consectetur libero.",
  images: [
    { 
      img: require("../editable-stuff/skuill.png"), 
      label: "First slide label", 
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum." 
    },
    { 
      img: require("../editable-stuff/skuill.png"), 
      label: "Second slide label", 
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum." 
    },
  ],
  imageSize: {
    width:"615",
    height:"450"
  }
};

// SKILLS SECTION
const skills = {
  show: false,
  heading: "Skills",
  hardSkills: [
    { name: "Python", value: 90 },
    { name: "SQL", value: 75 },
    { name: "Data Structures", value: 85 },
    { name: "C/C++", value: 65 },
    { name: "JavaScript", value: 90 },
    { name: "React", value: 65 },
    { name: "HTML/CSS", value: 55 },
    { name: "C#", value: 80 },
  ],
  softSkills: [
    { name: "Goal-Oriented", value: 80 },
    { name: "Collaboration", value: 90 },
    { name: "Positivity", value: 75 },
    { name: "Adaptability", value: 85 },
    { name: "Problem Solving", value: 75 },
    { name: "Empathy", value: 90 },
    { name: "Organization", value: 70 },
    { name: "Creativity", value: 90 },
  ],
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get In Touch",
  message:
    "I'm currently looking for full-time Senior Software Developer opportunities! If you know of any positions available, if you have any questions, or if you just want to say hi, please feel free to email me at",
  email: "sativkv@gmail.com",
};

const experiences = {
  show: true,
  heading: "Experiences",
  data: [
    {
      role: 'Senior Software Engineer', // Here Add Company Name
      companylogo: require('../assets/img/epam.png'),
      date: 'May 2022 - Jun 2024', 
    },
    {
      role: 'Senior Software Developer',
      companylogo: require('../assets/img/sbertech.png'),
      date: 'Feb 2022 - Apr 2022',
    },
    {
      role: 'Senior Software Developer',
      companylogo: require('../assets/img/MTS.png'),
      date: 'Jun 2020 - Jun 2021',
    },
    {
      role: 'Software Developer',
      companylogo: require('../assets/img/MTS.png'),
      date: 'Sep 2018 - Mar 2020',
    },
    {
      role: 'Software Developer',
      companylogo: require('../assets/img/ikva.png'),
      date: 'Jul 2014 - Sep 2018',
    }
  ]
}

// Blog SECTION
// const blog = {
//   show: false,
// };

export { navBar, mainBody, about, repos, skills, leadership, getInTouch, experiences };
