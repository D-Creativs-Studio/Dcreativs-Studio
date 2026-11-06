import { webDevelopmentCategory } from "./webDevelopmentData.js";
import { brandingCategory } from "./brandingData.js";
import { models3dCatalog } from "./models3dData.js";

export const portfolioCategories = [
  webDevelopmentCategory,
  brandingCategory,
  {
    id: "03",
    slug: "ui-ux-design",
    serviceSlug: "ui-ux-design",
    name: "UI/UX & Product Design",
    category: "Product Experience & Design Systems",
    discipline: "Research • Wireframes • Prototypes • Design Systems",
    year: "2024 — 2025",
    image: "/services/ui-ux-design.webp",
    accent: "#f472b6",
    glowColor: "rgba(244, 114, 182, 0.35)",
    shortDescription: "User research, wireframes, prototypes and design systems for websites and apps. Case studies coming soon.",
    heroTitle: "UI/UX & Product Design Portfolio",
    heroSubtitle: "Transforming complex workflows into effortless, tactile, and visually breathtaking digital experiences.",
    stats: [
      { label: "Platforms", value: "Web & Mobile" },
      { label: "Design Tool", value: "Figma" },
      { label: "Case Studies", value: "Coming Soon" },
    ],
    technologies: ["Figma", "Protopie", "Design Tokens", "React Native", "Tailwind CSS", "Linear"],
    // Case studies coming soon
    caseStudies: []
  },
  {
    id: "04",
    slug: "motion-video",
    serviceSlug: "motion-video",
    name: "Motion & Video Production",
    category: "Event Films & Social Reels",
    discipline: "Event Films • Social Reels • Video Editing",
    year: "Selected Work",
    image: "/projects/motion/royalties-graduation-poster.webp",
    accent: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.35)",
    shortDescription: "Event highlight films and recap reels that capture the energy of the moment and keep audiences watching.",
    heroTitle: "Motion & Video Production Portfolio",
    heroSubtitle: "Content that moves. Event highlight films and vertical reels that capture the atmosphere of the day and share it with a wider audience.",
    stats: [
      { label: "Featured Films", value: "2" },
      { label: "Formats", value: "Landscape & Vertical" },
      { label: "Focus", value: "Event Coverage" },
    ],
    technologies: ["After Effects", "Premiere Pro", "Cinema 4D", "DaVinci Resolve", "Blender", "Audition"],
    caseStudies: [
      {
        id: "royalties-graduation",
        title: "Royal Icons Graduation Highlight Film",
        client: "Royalties International Christian School",
        year: "2026",
        type: "Event Highlight Video",
        description: "A highlight film of Royalties International Christian School's Royal Icons graduation celebration, capturing student performances, families, staff and the atmosphere of the day.",
        metrics: "2:52 landscape highlight film",
        tags: ["Event Coverage", "Video Editing", "Colour & Effects", "School Marketing"],
        image: "/projects/motion/royalties-graduation-poster.webp",
        imageAlt: "Students dancing in front of the Royalties International Christian School Royal Icons 2026 banner",
        video: "/projects/motion/royalties-graduation.mp4",
        videoOrientation: "landscape",
      },
      {
        id: "awdec-recap",
        title: "AWDEC Conference Recap Reel",
        client: "Abia Webs & Digital Economy Conference (AWDEC)",
        type: "Event Recap Reel",
        description: "A vertical recap reel of the Abia Webs & Digital Economy Conference, featuring speaker sessions, audience moments, performances and on-screen text that carries the energy of the event.",
        metrics: "2:00 vertical reel for social media",
        tags: ["Event Coverage", "Vertical Video", "Kinetic Typography", "Social Media"],
        image: "/projects/motion/awdec-recap-poster.webp",
        imageAlt: "AWDEC conference screen reading Abia Webs and Digital Economy Conference",
        video: "/projects/motion/awdec-recap.mp4",
        videoOrientation: "portrait",
      }
    ]
  },
  {
    id: "05",
    slug: "3d-visual-fx",
    serviceSlug: "3d-visual-fx",
    name: "3D & CGI Visual FX",
    category: "Immersive CGI & Spatial Environments",
    discipline: "Props • Interiors • Characters • Interactive 3D",
    year: "2024 — 2025",
    image: "/models/thumbs/dream-room.webp",
    accent: "#2dd4bf",
    glowColor: "rgba(45, 212, 191, 0.35)",
    shortDescription: "Explore product models, props, furnished interiors and character scenes in an interactive 3D viewer.",
    heroTitle: "3D & CGI Visual FX Portfolio",
    heroSubtitle: "Explore the details. Rotate and inspect our collection of props, product studies, interiors and character scenes.",
    stats: [
      { label: "Interactive Models", value: String(models3dCatalog.length) },
      { label: "Asset Format", value: "GLB" },
      { label: "Viewer", value: "WebGL" },
    ],
    technologies: ["Blender", "Babylon.js", "glTF 2.0", "WebGL"],
    // Keep case-study titles, previews and model links aligned with the viewer.
    caseStudies: models3dCatalog.map((model, index) => ({
      id: `3d-${index + 1}`,
      modelId: model.id,
      title: model.name,
      client: "3D Model Study",
      type: model.category,
      description: model.description,
      metrics: model.polyCount,
      tags: model.tags,
      image: model.image,
      highlight: model.subtitle,
    }))
  },
  {
    id: "06",
    slug: "ai-automations",
    serviceSlug: "ai-automations",
    name: "AI & Smart Automations",
    category: "Intelligent Systems & Workflows",
    discipline: "Workflow Automation • Client Reviews • Python",
    image: "/projects/automations/client-approval.webp",
    // Portrait version for the mobile works list, so the whole laptop screen shows
    listImage: "/projects/automations/client-approval-list.webp",
    accent: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.35)",
    shortDescription: "Practical workflows for client approvals, revision tracking and driving-school recordkeeping.",
    heroTitle: "AI & Smart Automations Portfolio",
    heroSubtitle: "Less repetitive administration. Explore workflows that keep client decisions organised and completed training records up to date.",
    stats: [
      { label: "Featured Workflows", value: "2" },
      { label: "Client Reviews", value: "n8n" },
      { label: "Portal Automation", value: "Python" },
    ],
    technologies: ["n8n", "Gmail", "Google Sheets", "Python", "Browser Automation"],
    caseStudies: [
      {
        id: "client-approval-tracker",
        previewUrl: "https://d-creativs.app.n8n.cloud/form/f23969d7-8733-4468-9524-ad3173504330",
        title: "Client Approval and Revision Tracker",
        audience: "Agencies & Service Businesses",
        type: "Workflow Automation",
        description: "A client review workflow that sends branded emails, records approvals and revision requests, and follows up on pending decisions.",
        metrics: "Version-linked decisions and scheduled follow-up",
        tags: ["n8n", "Gmail", "Google Sheets", "Workflow Automation"],
        image: "/projects/automations/client-approval.webp",
        imageAlt: "Laptop presentation of a branded project review email with a Review & approve button and reminder status.",
        imageFit: "contain",
        highlight: "A clear record of what was reviewed, which version was approved and what needs changing.",
        ctaLabel: "Request a Demo",
        secondaryCtaLabel: "Get This for Your Business",
        sections: [
          {
            title: "The problem",
            body: "A deliverable is ready, but progress stalls while the team chases a response. Feedback arrives across different conversations, versions become confused, and nobody is sure whether the work is approved."
          },
          {
            title: "The solution",
            body: "Each deliverable and version is connected to a recorded decision. The team submits the work once; the client receives a branded review email, opens the deliverable and submits an approval or revision request. The response is saved in a central tracker, with notifications to the client and assigned team member."
          },
          {
            title: "How it works",
            steps: [
              "Submit the project details, deliverable link, version, client email and review deadline.",
              "Send a branded email linking the client to the review response form.",
              "Record the decision and feedback in Google Sheets, then notify the relevant people.",
              "Check pending reviews on a schedule, send spaced reminders within the configured limit and notify the team about overdue decisions."
            ]
          },
          {
            title: "Design and development",
            body: "Built with n8n, Gmail and Google Sheets. Submission, responses and scheduled reminders share a central tracker. Sender details, branding and reminder settings can be adapted for each business."
          },
          {
            title: "Business value",
            body: "Clients have a straightforward way to respond, while the team gains a consistent review history and spends less time chasing decisions. This workflow does not require an AI model subscription; hosting, email services and maintenance depend on the business setup."
          }
        ]
      },
      {
        id: "dssp-driving-school",
        previewUrl: "https://coachmorgan-dssp-automation.hf.space/",
        title: "DSSP Automation for Driving Schools",
        audience: "Driving-School Administration",
        type: "Python Automation",
        description: "A Python automation that checks existing DSSP training records and enters outstanding records for completed sessions, reducing repetitive portal work.",
        metrics: "Existing-record checks before new entries",
        tags: ["Python", "Browser Automation", "Workflow Automation"],
        image: "/projects/automations/dssp-dashboard.webp",
        imageAlt: "DSSP automation interface showing run controls, scheduling and a run summary.",
        imageFit: "contain",
        highlight: "Supports recordkeeping for training already delivered, with existing-record checks and a configured entry sequence.",
        ctaLabel: "Request a Demo",
        secondaryCtaLabel: "Set It Up for Your School",
        sections: [
          {
            title: "The problem",
            body: "The lessons are finished, but the administrative work continues. Staff must open student records, check previously logged sessions and enter training activities one student at a time. As enrolment grows, the repetition makes backlogs harder to manage."
          },
          {
            title: "The solution",
            body: "Drawing on firsthand driving-school administration experience, this automation checks existing entries, identifies outstanding records and follows the configured training sequence when recording lessons already delivered."
          },
          {
            title: "How it works",
            steps: [
              "Connect using the driving school’s authorised portal account.",
              "Scan student records to identify logged sessions and outstanding entries.",
              "Enter the relevant completed training activities in sequence, skipping existing entries.",
              "Schedule repeat runs to help keep administrative records up to date."
            ]
          },
          {
            title: "Design and development",
            body: "Built with Python and browser automation to handle repeated portal navigation and record entry. Existing-record checks and sequence rules guide each update, while scheduling can help prevent administrative backlogs."
          },
          {
            title: "Business value",
            body: "School administrators spend less time repeating portal actions and can keep training records more consistent. Staff remain responsible for confirming that the underlying training and submitted records are accurate. Deployment and maintenance depend on the school’s setup, and portal changes may require automation updates."
          }
        ]
      }
    ]
  }
];

export function getPortfolioByCategory(slug) {
  return portfolioCategories.find((item) => item.slug === slug);
}
