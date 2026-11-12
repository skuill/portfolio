<h1 align="center">Vitaly Kvashin: portfolio site</h1>

<p align="center">
  Personal site of Vitaly Kvashin, backend developer (C# / .NET).<br>
  <a href="https://skuill.com/portfolio/">skuill.com/portfolio</a> · <a href="https://skuill.github.io/portfolio">skuill.github.io/portfolio</a>
</p>

[![Site preview](/public/social-image.png)](https://skuill.com/portfolio/)

## Stack
React 19 built with Vite, Sass, react-icons, fonts from `@fontsource`, Leaflet for the trip maps (OpenStreetMap tiles); Vitest + Testing Library, ESLint. Node 24 or newer (CI and Docker use Node 26). Star counts of the projects: a snapshot in `src/editable-stuff/github-projects.json` is shown at once and replaced by live data from the GitHub API (browser `fetch`) when the reader scrolls near the section; if GitHub does not answer (60 requests per hour per IP without a token), the snapshot stays. Analytics: Google Analytics 4 (gtag snippet in `index.html`). Served by nginx in Docker and by GitHub Pages.

## Documentation
| Topic | What is inside |
|---|---|
| [Design](docs/design.md) | Screens, palette and type, the mosaic and how to add a picture, how the content is organized |
| [Bikepacking pages](docs/bikepacking.md) | The trip pages, how a trip is imported from the local archive and how to add one |

## Repository layout
| Path | What |
|---|---|
| `src/editable-stuff/config.js` | All site content: about, experience, projects, skills, interests, contacts |
| `src/editable-stuff/` | Images and the resume PDF used by the site |
| `src/editable-stuff/github-projects.json` | Which GitHub repositories get live star counts (`username`, `repos`) and the snapshot of those counts |
| `scripts/github-projects.js` | Refreshes that snapshot: `npm run projects` |
| `src/components/` | Page sections (`home/`), navbar, the mosaic (`Mosaic/`) |
| `bikepacking/`, `src/bikepacking/` | The pages of the trips and their code; `src/trips/` holds the data of every trip, written by `npm run trips` from `scripts/trips.json` |
| `src/scss/` | Styles |
| `index.html` | Page title, meta description, canonical address, link preview tags and structured data; the entry point of the build |
| `public/` | Files served as they are: favicon, `social-image.png` (the link preview), `robots.txt` |
| `vite.config.js` | Build (base path `/portfolio/`) and test settings |
| `eslint.config.js` | Lint rules |
| `cv/cv.typ` | Resume source (Typst), builds the PDF |
| `branding/linkedin-cover/` | LinkedIn cover and its generator |
| `branding/social-image/` | Generator of `public/social-image.png`, the link preview picture |
| `.github/workflows/build-and-deploy.yml` | CI (lint, tests, build); a release deploys to GitHub Pages and Docker Hub |
| `.github/workflows/deploy.yml` | Manual deploy of the Docker image to the droplet |
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

## Search and link previews
Search engines and link previews (LinkedIn, Telegram, Slack, X) read the static `<head>` of `index.html` without running the app: the title and description, the canonical address `https://skuill.com/portfolio/` (the same on both hosts, so search engines index skuill.com), Open Graph and X tags with an absolute image URL, and a schema.org `Person` in JSON-LD. `src/seo.test.js` checks them, matches the name and profile links with `config.js` and the image size with `public/social-image.png` (built by [branding/social-image](branding/social-image/README.md)).

After a release that changes them, check the live page:
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/): the preview as LinkedIn shows it; inspecting also refreshes LinkedIn's cached copy.
- Telegram: send the link to [@WebpageBot](https://t.me/WebpageBot) first (it refreshes Telegram's cached preview), then to yourself.
- [validator.schema.org](https://validator.schema.org/) (Fetch URL): one `Person`, no errors. Google's Rich Results Test finds nothing here: `Person` alone is not a rich result type.
- Lighthouse SEO 100 on the live page needs the root `https://skuill.com/robots.txt`, which the droplet's front nginx serves (configured in the server configuration repository); the copy in `public/` is served at `/portfolio/robots.txt`, where crawlers do not look.

Google Search Console has the property `https://skuill.com/portfolio/`, verified through the Google Analytics snippet in `index.html`.

## Resume PDF
The "Resume" button opens `src/editable-stuff/CV_Vitaly_Kvashin.pdf`, built from `cv/cv.typ` with [Typst](https://typst.app/) 0.15.1 (Windows: `winget install Typst.Typst`). Edit `cv/cv.typ`, keeping its text in sync with `config.js`, then:

```bash
npm run cv
```

## Deploy
1. Bump `version` in `package.json` (through a pull request); worth running `npm run projects` in the same pull request to refresh the projects snapshot.
2. Publish a [release](https://github.com/skuill/portfolio/releases) with a new version tag. The [workflow](.github/workflows/build-and-deploy.yml) deploys to GitHub Pages and pushes the Docker image `skuill/portfolio` (the version and `latest`) to Docker Hub.
3. When it is green: Actions → [Deploy](.github/workflows/deploy.yml) → Run workflow. On the droplet it pulls the image and recreates the container with `docker compose` in `/srv/docker/portfolio`, checks that the container runs the pulled image, then that https://skuill.com/portfolio/ answers.

The droplet's compose file and its nginx live in the server configuration repository, not here. Without GitHub Actions, the same by hand on the droplet: `cd /srv/docker/portfolio && docker compose pull && docker compose up -d --force-recreate`.

## Contact
[sativkv@gmail.com](mailto:sativkv@gmail.com) · [Telegram](https://t.me/skuill) · [LinkedIn](https://www.linkedin.com/in/vitaly-kvashin/)

## Support
If you like the site, you can [buy me a coffee](https://www.buymeacoffee.com/skuill) or donate via [PayPal](https://paypal.me/VitalyKvashin) or crypto. Send crypto only on the networks listed, a coin sent on another network may be lost:

| Network | Coins | Address |
|---|---|---|
| Bitcoin | BTC | `bc1q02d7p4qhjhjn5mnu99wdfc2j06d364jt8qeq0c` |
| Ethereum, Base, Arbitrum, Polygon, BNB Chain | ETH, USDT, USDC | `0xa56541B7DF6263ab84c3e1B69bD37f2a6d848412` |
| Solana | SOL, USDT, USDC | `BZcuV721p9XPsdreiKY9rsmxZDVf8qHNRk3EoPp25nrS` |
| Tron | USDT (TRC-20) | `TGyoTufYzVPU6igcQmFGwH1SFrNes9q3UP` |

## Credits
Started as a fork of the [hashirshoaeb/home](https://github.com/hashirshoaeb/home) template; the licence from that project (LGPL-3.0) is in [LICENSE](LICENSE).
