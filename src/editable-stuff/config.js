import profilePicture from "./portfolio.webp";
import resumePdf from "./CV_Vitaly_Kvashin.pdf";
import tatevikWebsite from "./tatevik_mamian_website.webp";
import caucasusCollage from "./interests_caucasus-collage.webp";
import tourUniteStart from "./interests_tourunite-start.webp";
import mosaicBusStop from "./interests_mosaic-skuill.webp";
import caucasusZekari from "./interests_caucasus-zekari.webp";
import majorityLogo from "../assets/img/MAJORITY.png";
import epamLogo from "../assets/img/epam.png";
import sbertechLogo from "../assets/img/sbertech.png";
import mtsLogo from "../assets/img/MTS.png";
import ikvaLogo from "../assets/img/ikva.png";
import githubProjects from "./github-projects.json";

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
// imageLink: an imported image (or an image URL); resume: an imported PDF (or a URL).
const about = {
  show: true,
  heading: "About Me",
  imageLink: profilePicture,
  imageSize: 375,
  message:
    "I have been developing software for over 12 years. After graduating in computer science from Moscow State University, I worked as a developer in a small startup specializing in computer vision for about 4 years. Then I grew to Senior .NET Developer at MTS, the largest telecom operator in Russia, where I worked on a platform that allows developers and businesses to monitor and troubleshoot interactions between complex distributed systems. In 2022 I moved to Armenia and joined EPAM, where I developed an alternative financial platform for one of the large clients in a distributed team. Since May 2025 I have been a backend developer at MAJORITY, a mobile financial app for migrants, where I build payment services and integrations with payment providers, from the first API investigation to a stable production flow, and work with the team on the stability of the wider platform. I enjoy solving complex problems, finding root causes instead of fixing symptoms, and helping other developers and customers create and deliver quality solutions. I have deep experience at all stages of the software development life cycle, and I use AI coding agents as a daily part of my work.",
  resume: resumePdf,
};

// PROJECTS SECTION
// GitHub projects live in github-projects.json: the username, how many recently updated repositories to show (latest),
// extra repository names (specific) and the last snapshot of them. The page shows the snapshot at once and replaces it
// with live data from GitHub when the reader scrolls to the section. Refresh the snapshot: npm run projects.
const repos = {
  show: true,
  heading: "Recent Projects",
  github: githubProjects,
};

const projects = {
  show: true,
  websites: [
    {
      imageLink: tatevikWebsite,
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
      img: caucasusCollage, 
      label: "Caucasus Crossing. Armenia And Georgia in 2023.", 
      paragraph: "A picture drawn by my girlfriend Tata on the theme of my trip on a bike.",
      links: [
        {
          description: "Post in Strava about the trip.",
          url: "https://www.strava.com/athletes/39721809/posts/24797729"
        }]
    },
    { 
      img: tourUniteStart, 
      label: "Tour Unite. Sortavala - Konakovo. 2021.", 
      paragraph: "I rode part of the bikepacking route of the Tour Unite race in northern Russia.",
      links: [
        {
          description: "Report about my trip.",
          url: "https://www.tourunite.info/2021/09/tui-itt21-kvashin.html"
        }
      ]
    },
    { 
      img: mosaicBusStop, 
      label: "A trip to the south of Russia in 2021.", 
      paragraph: "The purpose of the trip was to capture in photographs the Soviet heritage of mosaic bus stops.",
      links: []
    },
    {
      img: caucasusZekari, 
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
  groups: [
    {
      name: "Core",
      items: ["C#", ".NET / ASP.NET Core", "Web API", "MS SQL Server (T-SQL)", "RabbitMQ", "Docker", "Kubernetes"],
    },
    {
      name: "Architecture",
      items: ["Microservices", "Event-driven architecture", "DDD", "Distributed systems"],
    },
    {
      name: "Payments and Integrations",
      items: [
        "Third-party payment provider integrations",
        "Cross-border payments",
        "Webhooks",
        "Idempotency",
        "Retry and dead-letter handling",
        "Distributed locks",
        "KYC",
        "Fraud and risk limits",
      ],
    },
    {
      name: "Observability",
      items: ["Datadog", "Elasticsearch / Kibana", "Grafana", "Jaeger"],
    },
    {
      name: "Testing",
      items: ["xUnit", "NUnit", "Integration and regression tests"],
    },
    {
      name: "AI-assisted Development",
      items: ["Claude Code", "Cursor", "MCP servers", "Agent skills", "CLAUDE.md / AGENTS.md context files"],
    },
    {
      name: "Also worked with",
      items: [
        "Python",
        "TypeScript / React",
        "Java",
        "PostgreSQL",
        "Oracle",
        "Redis",
        "Apache Kafka",
        "AWS (EC2, ECS, S3, CloudFront, SQS, SNS)",
        "WPF",
        "WCF",
        "Ansible",
      ],
    },
  ],
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get In Touch",
  message:
    "Have a question, an idea, or just want to say hi? Feel free to email me at",
  email: "sativkv@gmail.com",
};

const experiences = {
  show: true,
  heading: "Experiences",
  data: [
    {
      role: 'Backend Developer',
      dates: '05 May 2025 - Present',
      company: 'MAJORITY Sweden AB',
      summary: "Backend developer in the Services team at MAJORITY, a mobile financial app for migrants. The team shares the backend for cross-border deposits, money transfers, phone plans and calling, built in C#/.NET with SQL Server, RabbitMQ and Kubernetes.",
      achievements: [
        "Built a new deposit (on-ramping) service from scratch: a .NET microservice that lets users fund their digital wallet with local bank transfers in Latin America, including currency conversion, limits, notifications and regression tests.",
        "Designed and built a new payment provider integration service from scratch, from the provider's API documentation to the architecture and implementation.",
        "Worked with the team on other payment provider integrations and hardened them after launch with idempotency, automatic retries and recovery, and expiry handling.",
        "Implemented fraud and risk controls for deposits, with rules the Risk team can configure without code changes.",
        "Contributed to the stability and new features of the phone plan (eSIM) backend: renewals, payment pre-authorisations, provider webhooks and notifications.",
        "Improved other parts of the platform: money-transfer reliability (payer routing, provider rate-limit handling), calling features, and lower database load with caching.",
        "Production on-call and support: root-cause analysis of incidents, permanent fixes instead of manual clean-ups, and production investigations for customer support.",
        "Built AI tooling for development and testing: an MCP server for the test environment, tools for an AI customer-support assistant, and agent-ready documentation for services. I work inside an AI coding agent (Claude Code) every day."
      ],
      logo: majorityLogo,
    },
    {
      role: 'Senior Software Engineer',
      dates: '02 May 2022 - 10 Jun 2024',
      company: 'EPAM Systems',
      summary: "Contributed to the development of the alternative investment platform iLEVEL within an international, distributed team for S&P Global, one of the largest financial services providers.",
      achievements: [
        "Stabilized and enhanced a legacy Publishing Service hosted on IIS, enabling clients to generate PDF reports with financial data displayed in charts and grids, sourced from FE reports or Excel worksheets.",
        "Enhanced a financial data export service hosted in AWS, fixing CI/CD processes and improving integration with third-party libraries. Introduced a multithreaded feature for data export with grouping.",
        "Developed Cake scripts to automate local deployment of services on Docker and IIS.",
        "Led the migration of backend services to modern technologies, upgrading microservices from .NET Core to .NET 6 and transitioning outdated third-party libraries to supported, latest versions.",
        "Remediated XSS vulnerabilities identified in vendor reports, ensuring secure and compliant applications.",
        "Analyzed and optimized UI performance issues, resolving browser crashes caused by out-of-memory (OOM) errors when loading large datasets by enhancing the entity graph caching strategy",
        "Mentored junior developers, facilitated meetings as Scrum Master, contributed to demo sessions, and managed roadmap creation in Azure DevOps."
      ],
      logo: epamLogo,
    },
    {
      role: 'Senior Software Developer',
      summary: 'Contributed to the design and development of a helpdesk platform that streamlined internal processes using BPMN.',
      dates: '09 Feb 2022 - 08 Apr 2022',
      company: 'Sberbank-Technology',
      logo: sbertechLogo,
    },
    {
      dates: '17 Sep 2018 - 10 Jun 2021',
      company: 'MTS Digital',
      roles: [
        { role: 'Senior Software Developer',
          dates: '01 Mar 2020 - 10 Jun 2021',
          achievements: [
            "Contributed to the development of an Observability Platform, a SaaS technology solution that ensures the observability of the MTS product ecosystem. This platform leverages OpenTracing, ELK and Matomo to collect and analyze logs, metrics, distributed traces, and web analytics.",
            "Led the development and support of the project throughout all stages of the software development life cycle, from the MVP to a Full-Scale Product.",
            "Designed and implemented LDAP authorization and Single Sign-On solutions.",
            "Facilitated the integration of new Java consumers by optimizing and stabilizing Maven packages.",
            "Developed a .NET Core service that provides an API for gathering metrics and analyzing relationships between products.",
            "Resolved critical incidents during production-like deployments and facilitated retrospectives.",
            "Participated in bandwidth optimization and resource estimation for 2021."
          ]
         },
        { role: 'Software Developer',
          dates: '17 Sep 2018 - 01 Mar 2020',
          achievements: [
            "Contributed to the development of CentralLogging, a centralized logging and tracing system, which involved adding multithreading for data stream processing and performing load tests to ensure effective multitenancy support.",
            "Developed the methodology and conducted load testing for the MVP of the Observability platform, presenting at the internal \"Demo Day\" conference attended by over 250 people.",
            "Developed a prototype microservice for compatibility with the legacy CentralLogging system, which was a key component in the R&D phase of the Observability Platform.",
            "Configured CI/CD for the Observability Platform using Ansible technologies in a Kubernetes environment from scratch using TFS.",
            "Designed architectural solutions including data encryption, consumer connection tutorials, monitoring and deployment strategies in Kubernetes and Docker."
          ]
        },
      ],
      logo: mtsLogo,
    },
    {
      role: 'Software Developer',
      dates: '15 Jul 2014 - 14 Sep 2018',
      company: 'IKVA LLC',
      achievements: [
        "Developed a WPF desktop application for a management console, enabling remote and centralized operations for setting up, commissioning, and maintaining the traffic enforcement system.",
        "Enhanced the Zabbix monitoring system by developing utilities, data collection scripts, and operational statistics for both software and hardware performance.",
        "Developed an application for software provisioning, configuration management, and application deployment.",
        "Contributed to the development of the system core, enhancing existing and creating new computer vision algorithms, as well as developing various utilities for analysis, data collection, and testing.",
        "Developed a high-load multi-threaded system for processing and transmitting data using various protocols, including SOAP and ProtoBuf."
      ],
      logo: ikvaLogo,
    }
  ]
}

export { navBar, mainBody, about, repos, projects, skills, interests, getInTouch, experiences };
