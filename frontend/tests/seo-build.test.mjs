import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { seoPages, absoluteUrl, getSeoPage } from "../src/data/seoData.js";

const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");

test("every sitemap URL has a built HTML page with its own canonical and valid structured data", async () => {
  const sitemap = await read("dist/sitemap.xml");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.deepEqual(locations, seoPages.map(page => absoluteUrl(page.path)));
  assert.equal(new Set(locations).size, locations.length);
  assert.doesNotMatch(sitemap, /lastmod/);
  const titles = new Set();
  for (const page of seoPages) {
    const html = await read(`dist${page.path === "/" ? "" : page.path}/index.html`);
    assert.equal((html.match(/<title>/g) || []).length, 1, page.path);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), `duplicate title at ${page.path}`);
    titles.add(title);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="${absoluteUrl(page.path)}"`), page.path);
    assert.equal((html.match(/name="description"/g) || []).length, 1);
    assert.equal((html.match(/application\/ld\+json/g) || []).length, 1);
    const data = JSON.parse(html.match(/<script id="page-structured-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
    const webpage = data["@graph"].find(item => item["@id"] === `${absoluteUrl(page.path)}#webpage`);
    assert.equal(webpage.url, absoluteUrl(page.path));
    assert.equal(webpage.description, page.description);
    assert.equal((html.match(/googletagmanager\.com\/gtag\/js/g) || []).length, 1);
    for (const breadcrumb of data["@graph"].find(item => item["@type"] === "BreadcrumbList")?.itemListElement || []) {
      assert.ok(locations.includes(breadcrumb.item));
    }
    assert.doesNotMatch(html, /"sameAs":\s*\[\s*"https:\/\/x\.com"/);
  }
});

test("hosting rules serve the generated page for every public route", async () => {
  const config = JSON.parse(await read("vercel.json"));
  const rootConfig = JSON.parse(await read("../vercel.json"));
  assert.deepEqual(config, rootConfig);
  for (const page of seoPages.filter(page => page.path !== "/")) {
    const rule = config.rewrites.find(rule => {
      if (rule.source.includes("(.*)")) return false;
      return new RegExp(`^${rule.source.replace(/:[a-zA-Z]+/g, "[^/]+")}$`).test(page.path);
    });
    assert.ok(rule, `missing rewrite for ${page.path}`);
    const names = [...rule.source.matchAll(/:([a-zA-Z]+)/g)].map(match => match[1]);
    const values = new RegExp(`^${rule.source.replace(/:[a-zA-Z]+/g, "([^/]+)")}$`).exec(page.path);
    let destination = rule.destination;
    names.forEach((name, index) => { destination = destination.replace(`:${name}`, values[index + 1]); });
    assert.equal(destination, `${page.path}/index.html`);
  }
  assert.equal(getSeoPage("/services/not-a-service"), undefined);
  assert.equal(getSeoPage("/works/not-a-category"), undefined);
  assert.equal(getSeoPage("/contact/").path, "/contact");
});
