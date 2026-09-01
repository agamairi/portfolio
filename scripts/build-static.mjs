// Renders the vinext SSR app to a fully static site for GitHub Pages.
//
// The portfolio is a single client-rendered React page with no server data, so
// we SSR "/" once, rewrite every root-absolute reference to a relative one
// (so it works under https://<user>.github.io/portfolio/ or any base), copy the
// built client assets, and drop the result in `dist/static/`.
//
// Run AFTER `vite build --base=./`.
//   node scripts/build-static.mjs

import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const root = new URL("..", import.meta.url);
const serverEntry = new URL("dist/server/index.js", root);
const clientDir = new URL("dist/client/", root);
const outDir = new URL("dist/static/", root);

if (!existsSync(serverEntry) || !existsSync(clientDir)) {
  console.error("dist/server or dist/client missing. Run `vite build --base=./` first.");
  process.exit(1);
}

const { default: worker } = await import(serverEntry.href);

const res = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (res.status !== 200) {
  console.error(`SSR render returned ${res.status}`);
  process.exit(1);
}

let html = await res.text();

// Make every root-absolute asset/file reference relative so the page works from
// any path (project Pages sites are served under /<repo>/).
html = html
  .replace(/([="'(]|\\")\/assets\//g, "$1./assets/")
  .replace(/([="'(]|\\")\/(Agam_[^"'()\\]+\.pdf)/g, "$1./$2")
  .replace(/([="'(]|\\")\/(og\.png|favicon\.svg|file\.svg|globe\.svg|window\.svg|_headers)/g, "$1./$2")
  .replace(/href="\/"/g, 'href="./"');

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await cp(clientDir, outDir, { recursive: true });
await writeFile(new URL("index.html", outDir), html);
await writeFile(new URL("404.html", outDir), html);
await writeFile(new URL(".nojekyll", outDir), "");

const leftover = html.match(/(?<![.\w])\/assets\//g);
if (leftover) {
  console.error(`WARNING: ${leftover.length} root-absolute /assets/ ref(s) survived the rewrite.`);
  process.exit(1);
}

console.log(`Static site written to dist/static/ (${html.length} bytes of HTML).`);
