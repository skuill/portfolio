# portfolio: notes for AI coding agents
Personal site of Vitaly Kvashin (skuill.com/portfolio). Commands, repository layout, tests, resume and deploy: [README.md](README.md). Trust the code over the docs if they disagree.

## Rules
- English in all files: code, comments, docs, commits, pull requests, issues.
- Site content lives in `src/editable-stuff/config.js`; keep `cv/cv.typ` in sync with it.
- New functionality is covered by tests: Jest + Testing Library, assert whole rendered structures or objects, mock external clients (GitHub API, analytics) and verify their calls.
- Do not add workarounds to keep outdated libraries alive (polyfills, module mappers); replace the library instead.
- Follow existing patterns. Never change CI, Docker or deploy settings silently: call it out in the pull request.
- Branches `feature/<issue#>_<desc>`; `master` accepts only pull requests with a green `build` check.
- Texts on the site: no long dashes (— or –) inside sentences.
