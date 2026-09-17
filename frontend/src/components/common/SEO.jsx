import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE = "D'Creativs Studio — Digital Experience & Brand Innovation";
const DEFAULT_DESC =
  "D'Creativs Studio crafts bespoke digital experiences, high-performance web platforms, 3D motion graphics, and scalable brand identity systems that captivate and convert.";
const DEFAULT_IMAGE = "https://dcreativs.vercel.app/og-image.png";
const BASE_URL = "https://dcreativs.vercel.app";

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
}) {
  const location = useLocation();
  const pageTitle = title ? `${title} | D'Creativs Studio` : DEFAULT_TITLE;
  const pageDesc = description || DEFAULT_DESC;
  const pageImage = image || DEFAULT_IMAGE;
  const pageUrl = `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    // 1. Title
    document.title = pageTitle;

    // 2. Standard Description
    setMetaTag('meta[name="description"]', "content", pageDesc);

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
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);
  }, [pageTitle, pageDesc, pageImage, pageUrl, type]);

  return null;
}
