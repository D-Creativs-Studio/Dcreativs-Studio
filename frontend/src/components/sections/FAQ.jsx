import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";

const questions = [
  {
    question: "What web development and creative design services do you offer?",
    answer: "We work across brand identity, web and app development, motion and video, 3D and visual effects, social marketing, and AI automation. Bring us a single project or a bigger idea that connects a few of these services.",
  },
  {
    question: "How much does a business website or brand identity project cost?",
    answer: "Pricing depends on the scope, deliverables, and complexity of your project. Share your goals and budget range so we can suggest an approach. Your proposal sets out what is included, payment terms, revision rounds, and any separate costs before you decide to proceed.",
  },
  {
    question: "How long does it take to design and build a website?",
    answer: "A website timeline depends on the number of pages, custom features, integrations, and how much content is ready. A landing page has a different scope from an online store or web application. We discuss milestones and agree on a schedule with you before work begins.",
  },
  {
    question: "What do I need before starting a website or branding project?",
    answer: "A rough idea, a problem you want to solve, or a few references is enough to start a conversation. Share your goals, audience, and any deadlines. We will identify the content, brand assets, and access needed for your project before work starts.",
  },
  {
    question: "Can you work with my existing brand or website?",
    answer: "Yes. We can discuss building on what you already have, whether that means refreshing your identity, improving a website, or adding new features. We review the existing work first to understand what is needed.",
  },
  {
    question: "How do feedback, revisions, and handover work?",
    answer: "We agree on review milestones and revision rounds in your project scope, so you know when to give feedback and what is included. At handover, you receive the agreed files, access, and guidance. Additional revisions, maintenance, or ongoing support are discussed and scoped separately.",
  },
  {
    question: "How do we get started?",
    answer: "Send your name, email, the service you need, and a few words about your goals through our contact form. Budget and timeline are optional and can be discussed when we follow up. We will discuss whether we are a fit and outline the next steps. Sending an enquiry does not commit you to a project.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-[#000422] px-4 py-12 text-white min-[390px]:px-6 sm:px-10 sm:py-16 lg:px-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#4100F5]/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="mb-4 font-heading text-xs font-semibold uppercase tracking-[0.25em] text-[#A78BFA]">
            A few things to know
          </p>
          <h2 id="faq-heading" className="max-w-md text-balance font-heading text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
            Questions? <span className="text-[#C4B5FD]">We’ve got answers.</span>
          </h2>
          <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-slate-400 sm:text-base">
            A little clarity before we create something together.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-md font-heading text-sm font-semibold text-[#C4B5FD] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA]"
          >
            Have another question?
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-t border-white/15">
          {questions.map(({ question, answer }, index) => (
            <details key={question} className="group border-b border-white/15">
              <summary className="flex cursor-pointer list-none items-center gap-3 py-5 font-heading text-sm font-semibold leading-relaxed transition-colors hover:text-[#C4B5FD] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A78BFA] sm:gap-4 sm:py-6 sm:text-base [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="shrink-0 font-mono text-xs font-normal text-[#A78BFA]/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{question}</span>
                <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#A78BFA] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
              </summary>
              <div className="pb-6 pl-7 pr-4 font-body text-sm leading-relaxed text-slate-400 sm:pl-8 sm:pr-9 sm:text-base">
                <p>
                {answer}
                </p>
                {index === 0 && (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    <Link className="text-[#C4B5FD] underline underline-offset-4 hover:text-white" to="/services/web-app-development">Website development</Link>
                    <Link className="text-[#C4B5FD] underline underline-offset-4 hover:text-white" to="/services/brand-design">Brand identity design</Link>
                    <Link className="text-[#C4B5FD] underline underline-offset-4 hover:text-white" to="/services/ai-automations">AI and automation</Link>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
