import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
      <SEO title="Page Not Found" description="This page could not be found. Explore D'Creativs Studio's services and portfolio." noindex />
      <p className="mb-4 font-mono text-sm text-[#C4B5FD]">404</p>
      <h1 className="mb-6 font-heading text-4xl font-bold">Page not found</h1>
      <p className="mb-8 text-slate-400">This link may be incorrect or the page may have moved.</p>
      <Link to="/" className="inline-flex rounded-full bg-[#4100F5] px-6 py-3 font-semibold text-white">Back to home</Link>
    </section>
  );
}
