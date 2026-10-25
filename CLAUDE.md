# portfolio (skuill.com/portfolio)
Knowledge base (read first, saves tokens): `C:\Projects\_knowledge-base\README.md`, then `projects/portfolio.md`, `infrastructure.md`.

- React 18 CRA. All site content: `src/editable-stuff/config.js`. Sections: `src/components/home/`.
- Run: `npm install && npm start` → http://localhost:3000/portfolio/ · Build: `npm run build` · Tests: `npm test -- --watchAll=false`.
- `master` accepts only pull requests with a green `build` check (ruleset). Branches: `feature/<issue#>_<desc>`.
- Release: bump `version` in package.json → GitHub Release with tag → CI deploys GH Pages + Docker Hub + droplet.

## Rules
- English only in files (code, comments, docs, commits). Russian is only for chat with Vitaly.
- New functionality must be covered by tests: Jest + Testing Library, assert whole rendered structures/objects, mock and verify calls to external clients (GitHub API, analytics). Keep this repo's existing style. Details: `C:\Projects\_knowledge-base\coding-standards.md`.
- Do not add workarounds to keep outdated libraries alive (polyfills, module mappers); replace the library instead (#3).
- Do not assume. If it is not in code or the KB, ask Vitaly.
- Trust code over README (README may be outdated).
- Follow existing patterns; do not silently change working configs (CI, docker, lint/coverage).
- Never open secrets (real appsettings*.json, .env values, certificates, keys).
- Skip bin/ obj/ .vs/ node_modules/ build/ TestResults/ logs/ when searching.
- Update the KB project file when versions, ports or deploy flow change.
