// Builds the site into one self-contained HTML file (elias.html) with all
// JS, CSS and photos inlined, so it opens with a double-click.
import { build } from "vite";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "dist-single";
await build({
  build: { outDir, emptyOutDir: true, assetsInlineLimit: 100_000_000, cssCodeSplit: false, copyPublicDir: false },
  logLevel: "warn",
});

let html = readFileSync(join(outDir, "index.html"), "utf8");
html = html.replace(/<script type="module" crossorigin src="\.?\/?([^"]+)"><\/script>/g, (_, src) => {
  const js = readFileSync(join(outDir, src), "utf8").replace(/<\/script/gi, "<\\/script");
  return `<script type="module">${js}</script>`;
});
html = html.replace(/<link rel="stylesheet" crossorigin href="\.?\/?([^"]+)">/g, (_, href) => {
  return `<style>${readFileSync(join(outDir, href), "utf8")}</style>`;
});
if (/src="\.?\/?assets\/|href="\.?\/?assets\//.test(html)) throw new Error("Some assets were not inlined");
writeFileSync("elias.html", html);
console.log(`elias.html written (${(html.length / 1024).toFixed(0)} KB)`);
