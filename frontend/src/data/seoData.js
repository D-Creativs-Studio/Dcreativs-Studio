import { servicesData } from "./servicesData.js";
import { portfolioCategories } from "./portfolioData.js";

export const SITE_URL = "https://dcreativs.com";
export const SITE_NAME = "D'Creativs Studio";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
export const absoluteUrl = (value) => new URL(value, `${SITE_URL}/`).href;
export const normalizePath = (value) => value.replace(/\/+$/, "") || "/";

const serviceCopy = {
  "brand-design": ["Brand Identity & Logo Design", "Build a consistent brand with logo design, visual identity, brand guidelines, print design, and packaging from D'Creativs Studio."],
  "web-app-development": ["Website & Web App Development", "Custom business websites, e-commerce stores, web applications, and dashboards. Explore web design and development services from D'Creativs Studio."],
  "motion-video": ["Motion Graphics & Video Editing", "Bring your brand to life with motion graphics, video editing, animated logos, social media ads, and product videos from D'Creativs Studio."],
  "3d-visual-fx": ["3D Modeling, Product Renders & Visual Effects", "Explore 3D modeling, product visualization, environment design, and visual effects for marketing and interactive websites from D'Creativs Studio."],
  "social-marketing": ["Social Media & Digital Marketing", "Connect with your audience through content strategy, social media management, and ad creatives. Explore D'Creativs Studio's digital marketing services."],
  "ai-automations": ["AI Integration & Workflow Automation", "Reduce repetitive work with custom AI assistants, chatbots, API integrations, and workflow automation built for your business by D'Creativs Studio."],
};

export const seoPages = [
  { path: "/", title: "Web Development, Branding & Creative Design", description: "D'Creativs Studio is a creative tech agency in Nigeria offering web development, brand identity, UI/UX design, 3D visuals, and AI automation.", name: "Home" },
  { path: "/about", title: "About Our Creative Technology Studio", description: "Meet the people behind D'Creativs Studio, explore a website project, and see how we approach scope, feedback, and handover for your website or brand.", name: "About" },
  { path: "/works", title: "Web Design, Branding & 3D Portfolio", description: "Explore D'Creativs Studio's selected website, branding, UI/UX, motion graphics, 3D, and automation projects. Find inspiration for your next project.", name: "Portfolio" },
  { path: "/contact", title: "Discuss Your Website, Brand or Automation Project", description: "Send a short enquiry to D'Creativs Studio about your website, brand, or automation goals. Budget and timing are optional. Discuss the next steps before committing.", name: "Contact" },
  ...servicesData.map(service => ({
    path: `/services/${service.slug}`,
    title: serviceCopy[service.slug][0],
    description: serviceCopy[service.slug][1],
    name: service.text,
    image: service.src,
    service: true,
  })),
  ...portfolioCategories.flatMap(category => [
    { path: `/works/${category.slug}`, title: `${category.name} Portfolio`, description: category.shortDescription || category.heroSubtitle, image: absoluteUrl(category.image), name: category.name, parent: "/works" },
    ...(category.caseStudies || []).map(project => ({
      path: `/works/${category.slug}/${project.id}`,
      title: `${project.title} | ${category.name}`,
      description: project.description,
      image: absoluteUrl(project.image),
      name: project.title,
      parent: `/works/${category.slug}`,
    })),
  ]),
];

const pageMap = new Map(seoPages.map(page => [page.path, page]));
export const getSeoPage = (path) => pageMap.get(normalizePath(path));

export function getStructuredData(page) {
  const url = absoluteUrl(page.path);
  const organization = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: `${SITE_URL}/`, logo: `${SITE_URL}/android-chrome-512x512.png`, email: "dcreativs.studio@gmail.com" };
  const graph = [organization,
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE_NAME, url: `${SITE_URL}/`, publisher: { "@id": organization["@id"] } },
    { "@type": page.path === "/contact" ? "ContactPage" : page.path === "/about" ? "AboutPage" : "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": organization["@id"] } },
  ];
  if (page.service) graph.push({ "@type": "Service", "@id": `${url}#service`, name: page.name, description: page.description, url, provider: { "@id": organization["@id"] } });
  if (page.path !== "/") {
    const ancestors = [];
    let parent = page.parent;
    while (parent) { const ancestor = getSeoPage(parent); ancestors.unshift(ancestor); parent = ancestor.parent; }
    const crumbs = [getSeoPage("/"), ...ancestors, page];
    graph.push({ "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: absoluteUrl(crumb.path) })) });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
