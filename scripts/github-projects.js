// Refreshes the snapshot of GitHub projects that the page shows before live data loads: npm run projects
import { readFileSync, writeFileSync } from "node:fs";
import { loadGithubProjects } from "../src/utils/githubProjects.js";

const file = new URL("../src/editable-stuff/github-projects.json", import.meta.url);
const settings = JSON.parse(readFileSync(file, "utf8"));
const repos = await loadGithubProjects(settings);
writeFileSync(file, `${JSON.stringify({ ...settings, repos }, null, 2)}\n`);
console.log(`Saved ${repos.length} projects: ${repos.map(({ name }) => name).join(", ")}`);
