<h1 align="center">Vitaly Kvashin: portfolio site</h1>

<p align="center">
  Personal site of Vitaly Kvashin, backend developer (C# / .NET).<br>
  <a href="https://skuill.com/portfolio/">skuill.com/portfolio</a> · <a href="https://skuill.github.io/portfolio">skuill.github.io/portfolio</a>
</p>

[![Site preview](/public/social-image.png)](https://skuill.com/portfolio/)

## Stack
React 19 built with Vite, React Bootstrap + Bootstrap 5, Sass, react-icons; Vitest + Testing Library, ESLint. Node 24 or newer (CI and Docker use Node 26). Recent projects: a snapshot in `src/editable-stuff/github-projects.json` is shown at once and replaced by live data from the GitHub API (browser `fetch`) when the reader scrolls near the section; if GitHub does not answer (60 requests per hour per IP without a token), the snapshot stays. Analytics: Google Analytics 4 (gtag snippet in `index.html`). Served by nginx in Docker and by GitHub Pages.

Planned: SEO and link previews ([#12](https://github.com/skuill/portfolio/issues/12)), a redesign ([#4](https://github.com/skuill/portfolio/issues/4)).

## Repository layout
| Path | What |
|---|---|
| `src/editable-stuff/config.js` | All site content: about, experience, projects, skills, interests, contacts |
| `src/editable-stuff/` | Images and the resume PDF used by the site |
| `src/editable-stuff/github-projects.json` | Which GitHub repositories the Projects section shows (`username`, `latest`, `specific`) and their snapshot (`repos`) |
| `scripts/github-projects.js` | Refreshes that snapshot: `npm run projects` |
| `src/components/` | Page sections (`home/`), navbar, footer |
| `src/scss/` | Styles |
| `index.html` | Page title and meta description, the entry point of the build |
| `public/` | Files served as they are: favicon, `social-image.png` (the link preview), `robots.txt` |
| `vite.config.js` | Build (base path `/portfolio/`, Sass options) and test settings |
| `eslint.config.js` | Lint rules |
| `cv/cv.typ` | Resume source (Typst), builds the PDF |
| `branding/linkedin-cover/` | LinkedIn cover and its generator |
| `.github/workflows/build-and-deploy.yml` | CI (lint, tests, build) and release deploy |
| `Dockerfile`, `nginx/default.conf` | nginx image that serves the site under `/portfolio`, with compression and cache headers |
| `lighthouserc.json` | Lighthouse thresholds checked on every pull request |
| `scripts/check-container.sh` | Checks the image's nginx: compression, cache headers, redirects |
| `.github/dependabot.yml` | Monthly dependency update pull requests |
| `CLAUDE.md` | Notes for AI coding agents |

## Run locally
Needs Node 24 or newer.

```bash
npm install
npm start                          # dev server: http://localhost:5173/portfolio/
npm run build && npm run preview   # production build: http://localhost:4173/portfolio/
```

## Tests
Tests ([Vitest](https://vitest.dev/) + Testing Library) live next to the code (`*.test.js`, `*.test.jsx`):

```bash
npm test           # all tests once
npx vitest         # watch mode
npm run lint       # ESLint
```

CI runs lint, tests and the build on every pull request; `master` accepts only pull requests with a green `build` check.

## Performance (Lighthouse)
Every change that affects what the page loads or shows is measured with [Lighthouse](https://developer.chrome.com/docs/lighthouse) before and after, and the scores go into the pull request (mobile preset first: it is the strict one).

```bash
npx lighthouse https://skuill.com/portfolio/ --view                   # the live site
npx lighthouse http://localhost:4173/portfolio/ --view                # a local build (npm run build && npm run preview)
```

Lighthouse needs Chrome or Edge; without Chrome set `CHROME_PATH` to Edge (`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`). `vite preview` serves files without compression, so a local build scores lower than the live site.

Every pull request also runs the `lighthouse` job: it builds the Docker image, checks its nginx with `scripts/check-container.sh` and runs Lighthouse (mobile, 3 runs, analytics and the GitHub API blocked) against the thresholds in `lighthouserc.json`. The scores are in the run's summary, the full reports in its `lighthouse` artifact. To run the same locally:

```bash
docker build -t portfolio . && docker run -d -p 8080:80 portfolio
bash scripts/check-container.sh http://localhost:8080
npx @lhci/cli@0.15.1 autorun
```

## Resume PDF
The "Resume" button opens `src/editable-stuff/CV_Vitaly_Kvashin.pdf`, built from `cv/cv.typ` with [Typst](https://typst.app/) 0.15.1 (Windows: `winget install Typst.Typst`). Edit `cv/cv.typ`, keeping its text in sync with `config.js`, then:

```bash
npm run cv
```

## Deploy
Automatic, from a GitHub release:
1. Bump `version` in `package.json` (through a pull request); worth running `npm run projects` in the same pull request to refresh the projects snapshot.
2. Publish a [release](https://github.com/skuill/portfolio/releases) with a new version tag.

The [workflow](.github/workflows/build-and-deploy.yml) then deploys to GitHub Pages, pushes the Docker image `skuill/portfolio` to Docker Hub and restarts the container on the droplet. Manual Docker commands: [READMEdocs/docker-deployment.md](READMEdocs/docker-deployment.md).

## Contact
[sativkv@gmail.com](mailto:sativkv@gmail.com) · [Telegram](https://t.me/skuill) · [LinkedIn](https://www.linkedin.com/in/vitaly-kvashin/)

## Credits
Started as a fork of the [hashirshoaeb/home](https://github.com/hashirshoaeb/home) template; the licence from that project (LGPL-3.0) is in [LICENSE](LICENSE).

If you like the site, you can [buy me a coffee](https://www.buymeacoffee.com/skuill).
