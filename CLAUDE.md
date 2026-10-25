# portfolio: notes for AI coding agents
Personal site of Vitaly Kvashin (skuill.com/portfolio). Commands, repository layout, tests, resume and deploy: [README.md](README.md). Trust the code over the docs if they disagree.

## Rules
- English in all files: code, comments, docs, commits, pull requests, issues.
- Site content lives in `src/editable-stuff/config.js`; keep `cv/cv.typ` in sync with it.
- New functionality is covered by tests: Vitest + Testing Library, assert whole rendered structures or objects, mock external clients (GitHub API, analytics) and verify their calls.
- Before a pull request: `npm run lint`, `npm test` and `npm run build` pass (CI runs the same). Node 24 or newer.
- Do not add workarounds to keep outdated libraries alive (polyfills, module mappers); replace the library instead. Prefer what the browser or Bootstrap already gives (`fetch`, `<details>`, placeholders) over a new dependency.
- Changes to what the page loads or shows: Lighthouse (mobile and desktop) before and after, scores in the pull request (README → Performance). Images: sized for display, WebP, `loading="lazy"` below the first screen.
- Follow existing patterns. Never change CI, Docker or deploy settings silently: call it out in the pull request.
- Branches `feature/<issue#>_<desc>`; `master` accepts only pull requests with a green `build` check.
- Texts on the site: no long dashes (— or –) inside sentences.
