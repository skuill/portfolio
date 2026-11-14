import portrait from "./portrait.webp";
import resumePdf from "./CV_Vitaly_Kvashin.pdf";
import tatevikWebsite from "./tatevik_mamian_website.webp";
import lyricsApiSwagger from "./lyrics_scraper_api_swagger.webp";
import caucasusCollage from "./interests_caucasus-collage.webp";
import tourUniteStart from "./interests_tourunite-start.webp";
import mosaicBusStop from "./interests_mosaic-skuill.webp";
import majorityLogo from "../assets/img/MAJORITY.png";
import epamLogo from "../assets/img/epam.png";
import sbertechLogo from "../assets/img/sbertech.png";
import mtsLogo from "../assets/img/MTS.png";
import ikvaLogo from "../assets/img/ikva.png";
import githubProjects from "./github-projects.json";
import photoPreviews from "./photo-placeholders.json";

// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  firstName: "Vitaly",
  lastName: "Kvashin",
  message: "Backend Developer, C# / .NET",
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
    },
  ],
};

// ABOUT SECTION
const about = {
  show: true,
  heading: "About me",
  image: portrait,
  paragraphs: [
    "I have been developing software for over 12 years, and I enjoy solving complex problems and finding root causes instead of fixing symptoms.",
    "After graduating in computer science from Moscow State University, I spent about 4 years at a small startup specializing in computer vision. Then I grew to Senior .NET Developer at MTS, the largest telecom operator in Russia, working on a platform that lets developers and businesses monitor and troubleshoot interactions between complex distributed systems.",
    "In 2022 I moved to Armenia and joined EPAM, where I developed an alternative financial platform for one of the large clients in a distributed team.",
    "Since May 2025 I have been a backend developer at MAJORITY, a mobile financial app for migrants, where I build payment services and integrations with payment providers, from the first API investigation to a stable production flow. AI coding agents are a daily part of my work.",
  ],
  resume: resumePdf,
};

// PROJECTS SECTION
// github: which repositories get live star counts (github-projects.json, snapshot refreshed with npm run projects).
// repo: the name in that file. stat: a figure of the project, rounded down so it stays true.
// family: neighbouring projects with the same family share one title from `families`.
// preview: { image, alt } for a picture, { code } for a code sample, { chat } for a sketch of a conversation.
// Keep the texts true over time: no versions and no counts that change.
const projects = {
  show: true,
  heading: "Recent projects",
  github: githubProjects,
  families: {
    lyrics: {
      title: "Song lyrics in one call",
      text: "One search across many lyrics sites, as a library or as a service.",
    },
  },
  items: [
    {
      name: "tatevikmamian.com",
      hook: "An architect's work, online",
      text: "Projects, sketches, zines and museum floors, served by my own image API.",
      stack: "React, TypeScript, Vite, ASP.NET Core, Nginx, Docker",
      url: "https://tatevikmamian.com/",
      links: [],
      preview: { image: tatevikWebsite, alt: "The start page of tatevikmamian.com" },
    },
    {
      name: "LyricsScraperNET",
      repo: "LyricsScraperNET",
      family: "lyrics",
      hook: "LyricsScraperNET",
      text: "A .NET library: one client for all the sites.",
      stat: "8,600+ NuGet downloads",
      stack: "C#, .NET, NuGet",
      url: "https://github.com/skuill/LyricsScraperNET",
      links: [{ label: "NuGet", url: "https://www.nuget.org/packages/LyricsScraperNET/" }],
      preview: {
        code: `ILyricsScraperClient lyricsScraperClient = new LyricsScraperClient()
    .WithAllProviders();

var searchRequest = new ArtistAndSongSearchRequest(
    artist: "Metallica",
    song: "Nothing Else Matters"
);

var searchResult = await lyricsScraperClient
    .SearchLyricAsync(searchRequest);

Console.WriteLine(searchResult.LyricText);`,
      },
    },
    {
      name: "LyricsScraperApi",
      repo: "LyricsScraperApi",
      family: "lyrics",
      hook: "LyricsScraperApi",
      text: "A REST API over the library: post an artist and a song, get the lyrics.",
      stat: "800+ Docker pulls",
      stack: "ASP.NET Core, OpenAPI, Serilog, FluentValidation, Docker",
      url: "https://github.com/skuill/LyricsScraperApi",
      links: [{ label: "Docker Hub", url: "https://hub.docker.com/r/skuill/lyrics-scraper-api" }],
      preview: { image: lyricsApiSwagger, alt: "The Swagger page of LyricsScraperApi" },
    },
    {
      name: "ConcertBuddy",
      repo: "ConcertBuddy",
      urlLabel: "@concert_buddy_bot",
      hook: "Your music buddy in Telegram",
      text: "Write a band name and get its story, setlists, tracks and lyrics.",
      stack: ".NET, Telegram.Bot, MusicBrainz, Last.fm, Setlist.fm, Docker",
      url: "https://t.me/concert_buddy_bot",
      links: [{ label: "GitHub", url: "https://github.com/skuill/ConcertBuddy" }],
      // A sketch of what the bot does until there is a screenshot: replace with { image, alt }.
      preview: { chat: { ask: "Parkway Drive", reply: "What would you like to know?", options: ["Biography", "Setlists", "Tracks", "Lyrics"] } },
    },
  ],
};

// Interests SECTION
// The words next to the mosaic come from src/components/Mosaic/figures.js, one per picture.
const interests = {
  show: true,
  heading: "Interests",
  // Text and links in order; a link inside the site is written without the base path ("bikepacking/").
  intro: [
    "Nature and sport take up a big part of my life: ",
    { text: "bikepacking", href: "bikepacking/" },
    ", rides and hikes on quiet unpaved trails through forests and mountains, ",
    { text: "all of it on Strava", href: "https://www.strava.com/athletes/39721809" },
    ". Sometimes a camera comes along. In the evenings I play bass or ukulele, draw, or dive into fantasy and sci-fi books.",
  ],
  allTrips: { text: "All bikepacking trips →", href: "bikepacking/" },
  trip: { slug: "gravel-land-saga", label: "across Sweden, summer 2026" },
  // An image with `trip` links to that trip's page and takes its distance from the trip data.
  images: [
    {
      img: caucasusCollage,
      blur: photoPreviews["interests_caucasus-collage.webp"],
      alt: "A drawing of a bike trip across the Caucasus",
      label: "Caucasus Crossing, Armenia and Georgia, 2023",
      trip: "caucasus-crossing",
    },
    {
      img: tourUniteStart,
      blur: photoPreviews["interests_tourunite-start.webp"],
      alt: "At the start of the Tour Unite bikepacking route",
      label: "Tour Unite, Sortavala to Konakovo, 2021",
      trip: "tour-unite",
    },
    {
      img: mosaicBusStop,
      blur: photoPreviews["interests_mosaic-skuill.webp"],
      alt: "In front of a Soviet mosaic bus stop",
      label: "Soviet mosaic bus stops, south of Russia, 2021",
      url: "https://tatevikmamian.com/zins",
    },
  ],
};

// SKILLS SECTION: the first group is the headline of the screen, the last one a quiet closing line. The resume has more.
const skills = {
  show: true,
  heading: "Skills",
  groups: [
    {
      name: "Main stack",
      items: ["C#", ".NET / ASP.NET Core", "SQL Server", "RabbitMQ", "Docker", "Kubernetes"],
    },
    {
      name: "Architecture",
      items: ["Microservices", "event-driven architecture", "DDD", "distributed systems"],
    },
    {
      name: "Payments and integrations",
      items: ["Provider integrations", "cross-border payments", "webhooks", "idempotency", "KYC", "fraud and risk limits"],
    },
    {
      name: "Observability and testing",
      items: ["Datadog", "Elasticsearch / Kibana", "Grafana", "Jaeger", "xUnit", "NUnit"],
    },
    {
      name: "AI-assisted development",
      items: ["Claude Code", "Cursor", "MCP servers", "agent skills"],
    },
    {
      name: "Also worked with",
      items: ["Python", "TypeScript / React", "Java", "PostgreSQL", "Oracle", "Redis", "Apache Kafka", "AWS"],
    },
  ],
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get in touch",
  message: "Have a question, an idea, or just want to say hi?",
  email: "sativkv@gmail.com",
};

// EXPERIENCE SECTION: the highlights of each job; the resume has the full list.
const experiences = {
  show: true,
  heading: "Experience",
  data: [
    {
      role: "Backend Developer",
      dates: "May 2025 to present",
      company: "MAJORITY Sweden AB",
      summary:
        "Backend developer in the Services team at MAJORITY, a mobile financial app for migrants. The team shares the backend for cross-border deposits, money transfers, phone plans and calling.",
      achievements: [
        "Built a new deposit (on-ramping) service from scratch: a .NET microservice that lets users fund their digital wallet with local bank transfers in Latin America, including currency conversion, limits, notifications and regression tests.",
        "Designed and built a new payment provider integration service from scratch, from the provider's API documentation to the architecture and implementation.",
        "Implemented fraud and risk controls for deposits, with rules the Risk team can configure without code changes.",
        "Production on-call and support: root-cause analysis of incidents, permanent fixes instead of manual clean-ups, and production investigations for customer support.",
      ],
      logo: majorityLogo,
    },
    {
      role: "Senior Software Engineer",
      dates: "May 2022 to Jun 2024",
      company: "EPAM Systems",
      summary: "The alternative investment platform iLEVEL, within an international, distributed team for S&P Global.",
      achievements: [
        "Led the migration of backend services to modern technologies, upgrading microservices from .NET Core to .NET 6 and transitioning outdated third-party libraries to supported, latest versions.",
        "Analyzed and optimized UI performance issues, resolving browser crashes caused by out-of-memory (OOM) errors when loading large datasets by enhancing the entity graph caching strategy.",
        "Remediated XSS vulnerabilities identified in vendor reports, ensuring secure and compliant applications.",
        "Mentored junior developers, facilitated meetings as Scrum Master, contributed to demo sessions, and managed roadmap creation in Azure DevOps.",
      ],
      logo: epamLogo,
    },
    {
      role: "Senior Software Developer",
      dates: "Feb 2022 to Apr 2022",
      company: "Sberbank-Technology",
      summary: "Contributed to the design and development of a helpdesk platform that streamlined internal processes using BPMN.",
      achievements: [],
      logo: sbertechLogo,
    },
    {
      role: "Senior Software Developer",
      dates: "Sep 2018 to Jun 2021",
      company: "MTS Digital",
      summary: "From Software Developer to Senior Software Developer on the Observability Platform, a SaaS solution for the MTS product ecosystem.",
      achievements: [
        "Led the development and support of the project throughout all stages of the software development life cycle, from the MVP to a full-scale product.",
        "Designed and implemented LDAP authorization and Single Sign-On solutions.",
        'Developed the methodology and conducted load testing for the MVP, presenting at the internal "Demo Day" conference attended by over 250 people.',
        "Configured CI/CD for the Observability Platform using Ansible in a Kubernetes environment from scratch.",
      ],
      logo: mtsLogo,
    },
    {
      role: "Software Developer",
      dates: "Jul 2014 to Sep 2018",
      company: "IKVA LLC",
      summary: "A traffic enforcement system: desktop tooling, monitoring and computer vision.",
      achievements: [
        "Developed a WPF desktop application for a management console, enabling remote and centralized operations for the traffic enforcement system.",
        "Contributed to the development of the system core, enhancing existing and creating new computer vision algorithms.",
        "Developed a high-load multi-threaded system for processing and transmitting data using various protocols, including SOAP and ProtoBuf.",
      ],
      logo: ikvaLogo,
    },
  ],
};

export { navBar, mainBody, about, projects, skills, interests, getInTouch, experiences };
