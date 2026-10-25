import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { seoPages, SITE_NAME, DEFAULT_IMAGE, absoluteUrl, getStructuredData } from "../src/data/seoData.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(root, "dist");
const html = await readFile(resolve(output, "index.html"), "utf8");
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

// Replace the shared app-shell metadata with the actual requested page's metadata.
const shell = html
  .replace(/<title>[\s\S]*?<\/title>/gi, "")
  .replace(/<meta\b[^>]*(?:name=["'](?:title|description|keywords|robots|twitter:[^"']+)["']|property=["']og:[^"']+["'])[^>]*>/gi, "")
  .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, "")
  .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, "");

for (const page of seoPages) {
  const title = `${page.title} | ${SITE_NAME}`;
  const url = absoluteUrl(page.path);
  const image = page.image || DEFAULT_IMAGE;
  const metadata = `
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escape(url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escape(SITE_NAME)}" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(page.description)}" />
    <meta property="og:url" content="${escape(url)}" />
    <meta property="og:image" content="${escape(image)}" />
    <meta property="og:image:alt" content="${escape(page.name)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(page.description)}" />
    <meta name="twitter:image" content="${escape(image)}" />
    <script id="page-structured-data" type="application/ld+json">${JSON.stringify(getStructuredData(page)).replace(/</g, "\\u003c")}</script>
  `;
  const destination = resolve(output, `.${page.path}`, "index.html");
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, shell.replace("</head>", `${metadata}</head>`));
}

// Include every valid service, portfolio category, and project; omit invented modification dates.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${seoPages.map(page => `  <url><loc>${escape(absoluteUrl(page.path))}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(resolve(output, "sitemap.xml"), sitemap);
console.log(`Generated metadata, structured data, and sitemap for ${seoPages.length} pages.`);
