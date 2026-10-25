<h1 align="center">Vitaly Kvashin: portfolio site</h1>

<p align="center">
  Personal site of Vitaly Kvashin, backend developer (C# / .NET).<br>
  <a href="https://skuill.com/portfolio/">skuill.com/portfolio</a> · <a href="https://skuill.github.io/portfolio">skuill.github.io/portfolio</a>
</p>

[![Site preview](/public/social-image.png)](https://skuill.com/portfolio/)

## Stack
React 18 (Create React App), React Bootstrap + Bootstrap 5, Sass, react-icons; Jest + Testing Library. Recent projects come from the GitHub API (browser `fetch`); analytics: Google Analytics 4 (gtag snippet in `public/index.html`). Served by nginx in Docker and by GitHub Pages.

Planned: move to Vite ([#3](https://github.com/skuill/portfolio/issues/3)), then a redesign ([#4](https://github.com/skuill/portfolio/issues/4)).

## Repository layout
| Path | What |
|---|---|
| `src/editable-stuff/config.js` | All site content: about, experience, projects, skills, interests, contacts |
| `src/editable-stuff/` | Images and the resume PDF used by the site |
| `src/components/` | Page sections (`home/`), navbar, footer |
| `src/scss/` | Styles |
| `public/index.html` | Page title and meta description; `public/social-image.png` is the link preview |
| `cv/cv.typ` | Resume source (Typst), builds the PDF |
| `branding/linkedin-cover/` | LinkedIn cover and its generator |
| `.github/workflows/build-and-deploy.yml` | CI (tests, build) and release deploy |
| `Dockerfile` | nginx image that serves the site under `/portfolio` |
| `CLAUDE.md` | Notes for AI coding agents |

## Run locally
```bash
npm install
npm start          # http://localhost:3000/portfolio/
```

## Tests
Tests live next to the components (`*.test.js`):

```bash
npm test -- --watchAll=false
```

CI runs the same command on every pull request; `master` accepts only pull requests with a green `build` check.

## Performance (Lighthouse)
Every change that affects what the page loads or shows is measured with [Lighthouse](https://developer.chrome.com/docs/lighthouse) before and after, and the scores go into the pull request (mobile preset first: it is the strict one).

```bash
npx lighthouse https://skuill.com/portfolio/ --view                   # the live site
npx lighthouse http://127.0.0.1:8080/portfolio/ --view                # a local build served under /portfolio/
```

Lighthouse needs Chrome or Edge; without Chrome set `CHROME_PATH` to Edge (`C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe`). An automatic Lighthouse check on every pull request is planned with the move to Vite ([#3](https://github.com/skuill/portfolio/issues/3)).

## Resume PDF
The "Resume" button opens `src/editable-stuff/CV_Vitaly_Kvashin.pdf`, built from `cv/cv.typ` with [Typst](https://typst.app/) 0.15.1 (Windows: `winget install Typst.Typst`). Edit `cv/cv.typ`, keeping its text in sync with `config.js`, then:

```bash
npm run cv
```

## Deploy
Automatic, from a GitHub release:
1. Bump `version` in `package.json` (through a pull request).
2. Publish a [release](https://github.com/skuill/portfolio/releases) with a new version tag.

The [workflow](.github/workflows/build-and-deploy.yml) then deploys to GitHub Pages, pushes the Docker image `skuill/portfolio` to Docker Hub and restarts the container on the droplet. Manual Docker commands: [READMEdocs/docker-deployment.md](READMEdocs/docker-deployment.md).

## Contact
[sativkv@gmail.com](mailto:sativkv@gmail.com) · [Telegram](https://t.me/skuill) · [LinkedIn](https://www.linkedin.com/in/vitaly-kvashin/)

## Credits
Started as a fork of the [hashirshoaeb/home](https://github.com/hashirshoaeb/home) template; the licence from that project (LGPL-3.0) is in [LICENSE](LICENSE).

If you like the site, you can [buy me a coffee](https://www.buymeacoffee.com/skuill).
