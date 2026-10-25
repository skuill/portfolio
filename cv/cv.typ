// Source of src/editable-stuff/CV_Vitaly_Kvashin.pdf (the "Resume" button on the site).
// Rebuild after editing: npm run cv (needs Typst, see README).
// Keep the experience and skills text in sync with src/editable-stuff/config.js.

#set document(title: "Vitaly Kvashin CV", author: "Vitaly Kvashin")
#set page(paper: "a4", margin: (x: 1.8cm, top: 1.2cm, bottom: 1.2cm))
#set text(font: "New Computer Modern", size: 10pt, lang: "en")
#set par(leading: 0.55em, spacing: 0.7em)
#set list(indent: 1.6em, body-indent: 0.6em, spacing: 0.45em)
#show link: set text(fill: black)

#let sep = [#h(0.4em)·#h(0.4em)]

#let section(title) = block(
  width: 100%,
  above: 1.1em,
  below: 0.7em,
  stroke: (bottom: 0.5pt),
  inset: (bottom: 2.5pt),
  text(size: 11pt, smallcaps(title)),
)

// One role: the header and its bullets stay on the same page.
#let entry(company: none, location: none, role: none, dates: none, body) = block(
  above: 1.1em,
  below: 0.65em,
  breakable: false,
  {
    pad(left: 0.8em, grid(
      columns: (1fr, auto),
      row-gutter: 0.5em,
      strong(company), location,
      emph(role), dates,
    ))
    body
  },
)

#let skill(name, items) = (name, items)

#align(center)[
  #text(size: 24pt, smallcaps[Vitaly Kvashin])
  #v(-0.6em)
  Stockholm, Sweden #sep #link("mailto:sativkv@gmail.com", "sativkv@gmail.com") #sep #link("tel:+46704944115", "+46 70 494 41 15") #sep #link("https://skuill.com/", "https://skuill.com/")
]

#section[Experience]

#entry(company: "MAJORITY Sweden AB", location: "Stockholm, Sweden", role: "Backend Developer", dates: "May 2025 - Present")[
- Backend developer in the Services team at MAJORITY, a mobile financial app for migrants. The team shares the backend for cross-border deposits, money transfers, phone plans and calling, built in C\#/.NET with SQL Server, RabbitMQ and Kubernetes.
- Built a new deposit (on-ramping) service from scratch: a .NET microservice that lets users fund their digital wallet with local bank transfers in Latin America, including currency conversion, limits, notifications and regression tests.
- Designed and built a new payment provider integration service from scratch, from the provider's API documentation to the architecture and implementation.
- Worked with the team on other payment provider integrations and hardened them after launch with idempotency, automatic retries and recovery, and expiry handling.
- Implemented fraud and risk controls for deposits, with rules the Risk team can configure without code changes.
- Contributed to the stability and new features of the phone plan (eSIM) backend: renewals, payment pre-authorisations, provider webhooks and notifications.
- Improved other parts of the platform: money-transfer reliability (payer routing, provider rate-limit handling), calling features, and lower database load with caching.
- Production on-call and support: root-cause analysis of incidents, permanent fixes instead of manual clean-ups, and production investigations for customer support.
- Built AI tooling for development and testing: an MCP server for the test environment, tools for an AI customer-support assistant, and agent-ready documentation for services. I work inside an AI coding agent (Claude Code) every day.
]

#entry(company: "EPAM Systems", location: "Yerevan, Armenia", role: "Senior Software Engineer", dates: "May 2022 - Jun 2024")[
- Contributed to the development of the alternative investment platform iLEVEL within an international, distributed team for S&P Global, one of the largest financial services providers.
- Stabilized and enhanced a legacy Publishing Service hosted on IIS, enabling clients to generate PDF reports with financial data displayed in charts and grids, sourced from FE reports or Excel worksheets.
- Enhanced a financial data export service hosted in AWS, fixing CI/CD processes and improving integration with third-party libraries. Introduced a multithreaded feature for data export with grouping.
- Developed Cake scripts to automate local deployment of services on Docker and IIS.
- Led the migration of backend services to modern technologies, upgrading microservices from .NET Core to .NET 6 and transitioning outdated third-party libraries to supported, latest versions.
- Remediated XSS vulnerabilities identified in vendor reports, ensuring secure and compliant applications.
- Analyzed and optimized UI performance issues, resolving browser crashes caused by out-of-memory (OOM) errors when loading large datasets by enhancing the entity graph caching strategy.
- Mentored junior developers, facilitated meetings as Scrum Master, contributed to demo sessions, and managed roadmap creation in Azure DevOps.
]

#entry(company: "Sberbank-Technology", location: "Moscow, Russia", role: "Senior Software Developer", dates: "Feb 2022 - Apr 2022")[
- Contributed to the design and development of a helpdesk platform that streamlined internal processes using BPMN.
- Performed bug fixes and integrated third-party systems.
]

#entry(company: "MTS Digital", location: "Moscow, Russia", role: "Senior Software Developer", dates: "Mar 2020 - Jun 2021")[
- Contributed to the development of an Observability Platform, a SaaS technology solution that ensures the observability of the MTS product ecosystem. This platform leverages OpenTracing, ELK and Matomo to collect and analyze logs, metrics, distributed traces, and web analytics.
- Led the development and support of the project throughout all stages of the software development life cycle, from the MVP to a Full-Scale Product.
- Designed and implemented LDAP authorization and Single Sign-On solutions.
- Facilitated the integration of new Java consumers by optimizing and stabilizing Maven packages.
- Developed a .NET Core service that provides an API for gathering metrics and analyzing relationships between products.
- Resolved critical incidents during production-like deployments and facilitated retrospectives.
- Participated in bandwidth optimization and resource estimation for 2021.
]

#entry(company: "MTS Digital", location: "Moscow, Russia", role: "Software Developer", dates: "Sep 2018 - Mar 2020")[
- Contributed to the development of CentralLogging, a centralized logging and tracing system, which involved adding multithreading for data stream processing and performing load tests to ensure effective multitenancy support.
- Developed the methodology and conducted load testing for the MVP of the Observability platform, presenting at the internal "Demo Day" conference attended by over 250 people.
- Developed a prototype microservice for compatibility with the legacy CentralLogging system, which was a key component in the R&D phase of the Observability Platform.
- Configured CI/CD for the Observability Platform using Ansible technologies in a Kubernetes environment from scratch using TFS.
- Designed architectural solutions including data encryption, consumer connection tutorials, monitoring and deployment strategies in Kubernetes and Docker.
]

#entry(company: "IKVA LLC", location: "Moscow, Russia", role: "Software Developer", dates: "Jul 2014 - Sep 2018")[
- Developed a WPF desktop application for a management console, enabling remote and centralized operations for setting up, commissioning, and maintaining the traffic enforcement system.
- Enhanced the Zabbix monitoring system by developing utilities, data collection scripts, and operational statistics for both software and hardware performance.
- Developed an application for software provisioning, configuration management, and application deployment.
- Contributed to the development of the system core, enhancing existing and creating new computer vision algorithms, as well as developing various utilities for analysis, data collection, and testing.
- Developed a high-load multi-threaded system for processing and transmitting data using various protocols, including SOAP and ProtoBuf.
]

#section[Education]

#entry(company: "Lomonosov Moscow State University (MSU)", location: "Moscow, Russia", role: "Master of Science, Applied Mathematics and Computer Science", dates: "Sep 2011 - Jun 2015")[
]

#section[Skills]

#pad(left: 0.8em, grid(
  columns: (auto, 1fr),
  column-gutter: 1.2em,
  row-gutter: 0.6em,
  ..(
    skill[Core][C\#, .NET / ASP.NET Core, Web API, MS SQL Server (T-SQL), RabbitMQ, Docker, Kubernetes],
    skill[Architecture][Microservices, event-driven architecture, DDD, distributed systems],
    skill[Payments and integrations][Third-party payment provider integrations, cross-border payments, webhooks, idempotency, retry and dead-letter handling, distributed locks, KYC, fraud and risk limits],
    skill[Observability][Datadog, Elasticsearch / Kibana, Grafana, Jaeger],
    skill[Testing][xUnit, NUnit, integration and regression tests],
    skill[AI-assisted development][Claude Code, Cursor, MCP servers, agent skills, CLAUDE.md / AGENTS.md context files],
    skill[Also worked with][Python, TypeScript / React, Java, PostgreSQL, Oracle, Redis, Apache Kafka, AWS (EC2, ECS, S3, CloudFront, SQS, SNS), WPF, WCF, Ansible],
    skill[Tools][Azure DevOps, TFS, Jira, Confluence, Jenkins, Splunk, Postman, Fiddler, Wireshark, SoapUI, Figma],
    skill[Methodologies][Agile (Scrum, Kanban), Waterfall],
    skill[Personal][Problem solving, adaptability, teamwork, critical thinking, conflict management],
  ).flatten(),
))

#section[Projects]

#let project(name, tech, url, description) = pad(left: 0.8em, block(above: 0.8em, below: 0.6em)[
  #grid(columns: (1fr, auto), [*#name* #h(0.3em) #emph(tech)], link(url, url))
  #v(-0.3em)
  #description
])

#project("ConcertBuddy", [C\#, .NET, Docker, API integration], "https://github.com/skuill/ConcertBuddy")[A Telegram bot that will be an excellent buddy at a music concert. Will provide information on the artist, setlist, songs and lyrics.]
#project("LyricsScraperNET", [C\#, .NET, API/WEB scraping, NuGet], "https://github.com/skuill/LyricsScraperNET")[Library to search for lyrics of a song from the web.]

#section[Interests]

#pad(left: 0.8em)[Cycling, bikepacking, hiking, playing bass and ukulele, reading fantasy books, participating in open-source projects.]
