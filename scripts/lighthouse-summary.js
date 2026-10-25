// Prints the Lighthouse CI result (the representative run) as a Markdown table for the GitHub job summary.
// Usage: node scripts/lighthouse-summary.js >> "$GITHUB_STEP_SUMMARY"   (after `lhci autorun`)
import { readFileSync } from "node:fs";

const dir = ".lighthouseci/reports";
const runs = JSON.parse(readFileSync(`${dir}/manifest.json`, "utf8"));
const run = runs.find((r) => r.isRepresentativeRun) ?? runs[0];
const report = JSON.parse(readFileSync(run.jsonPath, "utf8"));

const score = (category) => Math.round(report.categories[category].score * 100);
const metric = (audit) => report.audits[audit].displayValue;

console.log(`### Lighthouse (mobile, median of ${runs.length} runs; analytics and the GitHub API blocked)

| Performance | Accessibility | Best practices | SEO | First contentful paint | Largest contentful paint | Total blocking time | Layout shift |
|---|---|---|---|---|---|---|---|
| ${score("performance")} | ${score("accessibility")} | ${score("best-practices")} | ${score("seo")} | ${metric("first-contentful-paint")} | ${metric("largest-contentful-paint")} | ${metric("total-blocking-time")} | ${metric("cumulative-layout-shift")} |

Thresholds: \`lighthouserc.json\`. Full reports: the \`lighthouse\` artifact of this run.`);
