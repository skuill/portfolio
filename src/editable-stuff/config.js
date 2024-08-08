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
//      i.e: profilePictureLink: require("../editable-stuff/skuill.png"),
//d) If you do not want any picture to be displayed, just leave it empty :)
//      i.e: profilePictureLink: "",
// For Resume either provide link to your resume or import from "editable-stuff" directory
//     i.e resume: require("../editable-stuff/CV_Vitaly_Kvashin.pdf"),
//         resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/skuill.png"),
  imageSize: 375,
  message:
    "My name is Vitaly Kvashin. I have been developing software for 9 years already. After graduating in computer science from Moscow State University, I worked as a developer in a small startup specializing in computer vision for about 4 years. Then I grew up to Senior NET Developer at the largest telecom operator in Russia - MTS, where I worked on a project, that allow developers and businesses to monitor and troubleshoot interactions between complex distributed systems. Almost two years ago I moved to Armenia and work at EPAM, where I am developing an alternative financial platform for one of the large clients in a distributed team. I enjoy solving complex problems and helping other developers and customers create and deliver quality solutions. I have deep experience at all stages of the software development life cycle. Now I am open to any opportunities and interesting projects!",
  resume: require("../editable-stuff/CV_Vitaly_Kvashin.pdf"),
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
  show: true,
  heading: "Skills",
  hardSkills: [
    { name: "Backend. C#, Java, Python", value: 90 },
    { name: "Technologies. .NET, ASP.NET, WEB API, WPF, WCF, ...", value: 85 },
    { name: "DevOps. Ansible, Azure DevOps, Jenkins, ...", value: 70 },
    { name: "Cloud. AWS: EC2, ECS, S3, CloudFront, SQS, ...", value: 75 },
    { name: "Data Structures and Algorithms", value: 80 },
    { name: "Frontend. Javascript, Typescript, React", value: 60 },
    { name: "Tools. Postman, Fiddler, Wireshark, Kibana, Grafana, Jaeger, ...", value: 80 },
    { name: "Databases. MS SQL Server, Oracle, PostgreSQL, ElasticSearch, ...", value: 80 }
  ],
  softSkills: [
    { name: "Goal-Oriented", value: 80 },
    { name: "Collaboration", value: 90 },
    { name: "Positivity", value: 75 },
    { name: "Adaptability", value: 90 },
    { name: "Problem Solving", value: 85 },
    { name: "Empathy", value: 95 },
    { name: "Organization", value: 70 },
    { name: "Creativity", value: 85 },
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
      cardTitle: 'Senior Software Engineer',
      title: 'May 2022 - Jun 2024. EPAM Systems.', 
      cardSubtitle: "Development of an alternative investment platform iLEVEL in a international distributed team for one of the largest client - S&P Global.",
      cardDetailedText: [
        "• Stabilization and improvement of the legacy Publishing Service hosted in IIS, which allows clients to build reports in PDF format based on financial data in charts and grids from FE reports or Excel worksheets.",
        "• Improvement of the service for exporting financial data to Excel hosted in AWS. Fixed CI/CD and integration with third-party libraries. Added a new feature for exporting data with grouping using multithreading.",
        "• Writing Cake scripts for automatic local deployment of services in Docker and IIS.",
        "• Migration of the backend services to the up-to-date technologies. Migration of microservices from .Net Core to .NET 6 and from old third-party libraries to supported new ones.",
        "• Fixing XSS vulnerabilities based on vendor reports.",
        "• Analysis and optimization of UI performance bugs. Fixed the problem of the browsers crashing due to OOM when loading large amounts of data by optimizing the entities graph caching strategy.",
        "• Mentoring Juniors developers, running meetings as a scrum master, participation in demo sessions, roadmap creation in Azure DevOps."
      ],
      media: {
        type: "IMAGE",
        source: {
          url: require('../assets/img/epam.png')
        }
      }
    },
    {
      cardTitle: 'Senior Software Developer',
      cardSubtitle: 'Design and development of a helpdesk platform for internal processes in BPMN.',
      title: 'Feb 2022 - Apr 2022. Sberbank-Technology', 
      media: {
        type: "IMAGE",
        source: {
          url: require('../assets/img/sbertech.png')
        }
      }
    },
    {
      title: 'Sep 2018 - Jun 2021. MTS Digital',
      items: [
        { cardTitle: 'Senior Software Developer',
          title: 'Jun 2020 - Jun 2021',
          cardDetailedText: [
            "• Development of Observability Platform - a SaaS technological platform that ensures observability of the ecosystem of MTS products based on OpenTracing and Matomo. The platform collects and analyzes logs, metrics, distributed traces and web analytics.",
            "• Development and support of the project at all stages of the software development life cycle from MVP to a Full-Scale Product.",
            "• Designed and implemented LDAP authorization and Single Sign-on",
            "• Provided the connection of new JAVA consumers by stabilizing maven packages.",
            "• Created a Net core service that provides an API for collecting metrics and calculating links between products.",
            "• Solved emergency situations on PROD-like deployments, led retrospectives.",
            "• Participated in bandwidth optimization and resource calculation for 2021."
          ]
         },
        { cardTitle: 'Software Developer',
          title: 'Sep 2018 - Mar 2020',
          cardDetailedText: [
            "• Development of CentralLogging - a tracing and centralized logging system. Added multithreading for processing data streams. Implementation and load testing of multitenancy.",
            "• Developed a methodology and performed load testing of the MVP named Observability platform. Made a presentation at the internal conference \"Demo Day\" (250+ people)",
            "• Implemented a prototype microservice for compatibility with the legacy CentralLogging system. The main element of the RND phase of the Observability Platform.",
            "• Built CI/CD for Observability Platform based on ansible technologies in the kubernetes environment from scratch using TFS.",
            "• Development of architectural solutions: encryption of transmitted data, a tutorial for connecting consumers to the platform, monitoring and deployment in kubernetes and docker."
          ]
        },
      ],
      media: {
        type: "IMAGE",
        source: {
          url: require('../assets/img/MTS.png')
        }
      }
    },
    {
      cardTitle: 'Software Developer.',
      title: 'Jul 2014 - Sep 2018. IKVA LLC.', 
      cardDetailedText: [
        "• Development of a desktop application in WPF for the management console for remote and centralized performance of work on setting up, commissioning and maintenance of the traffic enforcement system.",
        "• Improvement of Zabbix monitoring system. Writing utilities, data collection scripts and system operation statistics both in terms of software and hardware.",
        "• Development of an application for software provisioning, configuration management, and application-deployment.",
        "• Participation in the development of the system core. Improvement of existing and development of new computer vision algorithms, creation of various utilities for analysis and data collection, testing.",
        "• Development of a highly loaded multi-threaded system for processing and transmitting data using various protocols like SOAP, ProtoBuf."
      ],
      media: {
        type: "IMAGE",
        source: {
          url: require('../assets/img/ikva.png')
        }
      }
    }
  ]
}

// Blog SECTION
const blogConfig = {
  show: false,
};

export { navBar, mainBody, about, repos, skills, leadership, getInTouch, experiences, blogConfig };
