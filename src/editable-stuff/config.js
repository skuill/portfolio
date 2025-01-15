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
    },
    {
      image: "fa-telegram",
      url: "https://www.t.me/skuill/",
    },
    {
      image: "fa-strava",
      url: "https://www.strava.com/athletes/39721809",
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
//      i.e: profilePictureLink: require("../editable-stuff/portfolio.jpg"),
//d) If you do not want any picture to be displayed, just leave it empty :)
//      i.e: profilePictureLink: "",
// For Resume either provide link to your resume or import from "editable-stuff" directory
//     i.e resume: require("../editable-stuff/CV_Vitaly_Kvashin.pdf"),
//         resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/portfolio.jpg"),
  imageSize: 375,
  message:
    "I’m Vitaly Kvashin, a software developer with 9 years of experience. After earning my degree in computer science from Moscow State University, I began my career in a startup focused on computer vision, where I spent 4 years honing my skills. I then advanced to Senior .NET Developer at Russia’s largest telecom operator, working on a project to monitor and troubleshoot interactions in complex distributed systems. Nearly two years ago, I joined EPAM in Armenia, contributing to a large-scale alternative financial platform with an international team. I excel in solving complex problems and delivering high-quality, creative solutions that meet stakeholder needs. With extensive experience across the full software development life cycle, I’m open to new opportunities and exciting projects.",
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

const projects = {
  show: true,
  websites: [
    {
      imageLink: require("../editable-stuff/tatevik_mamian_website.png"),
      url: "https://tatevikmamian.com/",
      description: "Architect's personal website",
      technologies: "C#, .NET 8, WebApi, Javascript, Typescript, React, Nginx, Docker"
    }
  ],
};

// Interests SECTION
const interests = {
  show: true,
  heading: "Interests",
  message:
    "I love spending my free time immersed in nature. Whether it's cycling, bikepacking, or hiking, I seek out quiet, unpaved trails through forests, mountains, and along rivers, where I can truly unwind and recharge. Occasionally, I bring along my camera to capture stunning landscapes or unique architectural details. In the evenings, I find joy and relaxation in playing the ukulele and bass. To end the day, I often dive into the captivating worlds of fantasy and sci-fi literature, which inspire and relax me before bed.",
  images: [
    { 
      img: require("../editable-stuff/interests_caucasus-collage.png"), 
      label: "Caucasus Crossing. Armenia And Georgia in 2023.", 
      paragraph: "A picture drawn by my girlfriend Tata on the theme of my trip on a bike.",
      links: [
        {
          description: "Post in Strava about the trip.",
          url: "https://www.strava.com/athletes/39721809/posts/24797729"
        }]
    },
    { 
      img: require("../editable-stuff/interests_tourunite-start.jpg"), 
      label: "Tour Unite. Sortavala — Konakovo. 2021.", 
      paragraph: "I rode part of the bikepacking route of the Tour Unite race in northern Russia.",
      links: [
        {
          description: "Report about my trip.",
          url: "https://www.tourunite.info/2021/09/tui-itt21-kvashin.html"
        }
      ]
    },
    { 
      img: require("../editable-stuff/interests_mosaic-skuill.png"), 
      label: "A trip to the south of Russia in 2021.", 
      paragraph: "The purpose of the trip was to capture in photographs the Soviet heritage of mosaic bus stops.",
      links: []
    },
    {
      img: require("../editable-stuff/interests_caucasus-zekari.jpg"), 
      label: "Caucasus Crossing. Armenia And Georgia in 2023.", 
      paragraph: "In beautiful Georgia on the Zekar Pass among mountains and forests.",
      links: []
    },
  ],
  imageSize: {
    width:"615",
    height:"700"
  }
};

// SKILLS SECTION
const skills = {
  show: true,
  heading: "Skills",
  hardSkills: [
    { name: "Backend. C#, Java, Python", value: 90 },
    { name: "Technologies. .NET, ASP.NET, WEB API, WPF, WCF, ...", value: 85 },
    { name: "DevOps. Ansible, Azure DevOps, Jenkins, ...", value: 60 },
    { name: "Cloud. AWS: EC2, ECS, S3, CloudFront, SQS, ...", value: 55 },
    { name: "Data Structures and Algorithms", value: 75 },
    { name: "Frontend. Javascript, Typescript, React", value: 40 },
    { name: "Tools. Postman, Fiddler, Wireshark, Kibana, Grafana, Jaeger, ...", value: 70 },
    { name: "Databases. MS SQL Server, Oracle, PostgreSQL, ElasticSearch, ...", value: 60 }
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
      title: '02 May 2022 - 10 Jun 2024. EPAM Systems.', 
      cardSubtitle: "Contributed to the development of the alternative investment platform iLEVEL within an international, distributed team for S&P Global, one of the largest financial services providers.",
      cardDetailedText: [
        "• Stabilized and enhanced a legacy Publishing Service hosted on IIS, enabling clients to generate PDF reports with financial data displayed in charts and grids, sourced from FE reports or Excel worksheets.",
        "• Enhanced a financial data export service hosted in AWS, fixing CI/CD processes and improving integration with third-party libraries. Introduced a multithreaded feature for data export with grouping.",
        "• Developed Cake scripts to automate local deployment of services on Docker and IIS.",
        "• Led the migration of backend services to modern technologies, upgrading microservices from .NET Core to .NET 6 and transitioning outdated third-party libraries to supported, latest versions.",
        "• Remediated XSS vulnerabilities identified in vendor reports, ensuring secure and compliant applications.",
        "• Analyzed and optimized UI performance issues, resolving browser crashes caused by out-of-memory (OOM) errors when loading large datasets by enhancing the entity graph caching strategy",
        "• Mentored junior developers, facilitated meetings as Scrum Master, contributed to demo sessions, and managed roadmap creation in Azure DevOps."
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
      cardSubtitle: 'Contributed to the design and development of a helpdesk platform that streamlined internal processes using BPMN.',
      title: '09 Feb 2022 - 08 Apr 2022. Sberbank-Technology', 
      media: {
        type: "IMAGE",
        source: {
          url: require('../assets/img/sbertech.png')
        }
      }
    },
    {
      title: '17 Sep 2018 - 10 Jun 2021. MTS Digital',
      items: [
        { cardTitle: 'Senior Software Developer',
          title: '01 Mar 2020 - 10 Jun 2021',
          cardDetailedText: [
            "• Contributed to the development of an Observability Platform, a SaaS technology solution that ensures the observability of the MTS product ecosystem. This platform leverages OpenTracing, ELK and Matomo to collect and analyze logs, metrics, distributed traces, and web analytics.",
            "• Led the development and support of the project throughout all stages of the software development life cycle, from the MVP to a Full-Scale Product.",
            "• Designed and implemented LDAP authorization and Single Sign-On solutions.",
            "• Facilitated the integration of new Java consumers by optimizing and stabilizing Maven packages.",
            "• Developed a .NET Core service that provides an API for gathering metrics and analyzing relationships between products.",
            "• Resolved critical incidents during production-like deployments and facilitated retrospectives.",
            "• Participated in bandwidth optimization and resource estimation for 2021."
          ]
         },
        { cardTitle: 'Software Developer',
          title: '17 Sep 2018 - 01 Mar 2020',
          cardDetailedText: [
            "• Contributed to the development of CentralLogging, a centralized logging and tracing system, wich involved adding multithreading for data stream processing and performing load tests to ensure effective multitenancy support.",
            "• Developed the methodology and conducted load testing for the MVP of the Observability platform, presenting at the internal \"Demo Day\" conference attended by over 250 people.",
            "• Developed a prototype microservice for compatibility with the legacy CentralLogging system, which was a key component in the R&D phase of the Observability Platform.",
            "• Configured CI/CD for the Observability Platform using Ansible technologies in a Kubernetes environment from scratch using TFS.",
            "• Designed architectural solutions including data encryption, consumer connection tutorials, monitoring and deployment strategies in Kubernetes and Docker."
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
      title: '15 Jul 2014 - 14 Sep 2018. IKVA LLC.', 
      cardDetailedText: [
        "• Developed a WPF desktop application for a management console, enabling remote and centralized operations for setting up, commissioning, and maintaining the traffic enforcement system.",
        "• Enhanced the Zabbix monitoring system by developing utilities, data collection scripts, and operational statistics for both software and hardware performance.",
        "• Developed an application for software provisioning, configuration management, and application deployment.",
        "• Contributed to the development of the system core, enhancing existing and creating new computer vision algorithms, as well as developing various utilities for analysis, data collection, and testing.",
        "• Developed a high-load multi-threaded system for processing and transmitting data using various protocols, including SOAP and ProtoBuf."
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

export { navBar, mainBody, about, repos, projects, skills, interests, getInTouch, experiences };
