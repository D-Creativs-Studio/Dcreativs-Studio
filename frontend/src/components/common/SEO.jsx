import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoPage, getStructuredData, normalizePath } from "@/data/seoData";

const DEFAULT_TITLE = "D'Creativs Studio — Digital Experience & Brand Innovation";
const DEFAULT_DESC =
  "D'Creativs Studio crafts bespoke digital experiences, high-performance web platforms, 3D motion graphics, and scalable brand identity systems that captivate and convert.";
const DEFAULT_IMAGE = "https://dcreativs.com/og-image.png";
const BASE_URL = "https://dcreativs.com";

function setMetaTag(selector, attribute, value) {
  if (!value) return;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [attrName, attrVal] = selector
      .replace("meta[", "")
      .replace("]", "")
      .split("=");
    element.setAttribute(attrName, attrVal.replace(/['"]/g, ""));
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export function SEO({
  title,
  description,
  image,
  type = "website",
  noindex = false,
}) {
  const location = useLocation();
  const page = getSeoPage(location.pathname);
  const resolvedTitle = page?.title || title;
  const pageTitle = resolvedTitle ? `${resolvedTitle} | D'Creativs Studio` : DEFAULT_TITLE;
  const pageDesc = page?.description || description || DEFAULT_DESC;
  const pageImage = page?.image || image || DEFAULT_IMAGE;
  const pageUrl = `${BASE_URL}${normalizePath(location.pathname)}`;
  const excludeFromSearch = noindex || !page;
  const structuredData = page && !excludeFromSearch ? JSON.stringify(getStructuredData(page)) : null;

  useEffect(() => {
    // 1. Title
    document.title = pageTitle;

    // 2. Standard Description
    setMetaTag('meta[name="description"]', "content", pageDesc);
    setMetaTag('meta[name="robots"]', "content", excludeFromSearch ? "noindex, follow" : "index, follow, max-image-preview:large");

    // 3. Open Graph (WhatsApp, Facebook, LinkedIn)
    setMetaTag('meta[property="og:title"]', "content", pageTitle);
    setMetaTag('meta[property="og:description"]', "content", pageDesc);
    setMetaTag('meta[property="og:url"]', "content", pageUrl);
    setMetaTag('meta[property="og:image"]', "content", pageImage);
    setMetaTag('meta[property="og:type"]', "content", type);

    // 4. X (Twitter)
    setMetaTag('meta[name="twitter:title"]', "content", pageTitle);
    setMetaTag('meta[name="twitter:description"]', "content", pageDesc);
    setMetaTag('meta[name="twitter:image"]', "content", pageImage);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical && !excludeFromSearch) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    if (excludeFromSearch) canonical?.remove();
    else canonical.setAttribute("href", pageUrl);

    let schema = document.getElementById("page-structured-data");
    if (structuredData) {
      if (!schema) {
        schema = document.createElement("script");
        schema.id = "page-structured-data";
        schema.type = "application/ld+json";
        document.head.appendChild(schema);
      }
      schema.textContent = structuredData;
    } else schema?.remove();
  }, [pageTitle, pageDesc, pageImage, pageUrl, type, excludeFromSearch, structuredData]);

  return null;
}
