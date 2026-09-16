import { useParams, Link, useNavigate } from "react-router-dom";
import { getServiceBySlug, servicesData } from "@/data/servicesData";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Layers, Sparkles, Send } from "lucide-react";

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = getServiceBySlug(serviceId);

  // Fallback if slug not found
  if (!service) {
    return (
      <div className="min-h-screen bg-[#030412] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-heading font-extrabold mb-4 text-[#885FFF]">Service Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          The service you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#4100F5] hover:bg-[#5212FF] text-white font-heading font-semibold px-6 py-3 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  // Find next and previous service for seamless navigation
  const currentIndex = servicesData.findIndex((s) => s.slug === service.slug);
  const prevService = servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];

  return (
    <div className="min-h-screen bg-[#030412] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-[#4100F5]/15 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#885FFF]/12 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/#services"
            onClick={(e) => {
              e.preventDefault();
              navigate("/", { replace: false });
              setTimeout(() => {
                const el = document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to All Services
          </Link>

          <span className="text-xs font-heading font-semibold tracking-widest text-[#885FFF] uppercase bg-[#4100F5]/20 border border-[#4100F5]/40 px-3 py-1 rounded-full">
            0{currentIndex + 1} / 0{servicesData.length}
          </span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-medium bg-[#4100F5]/20 text-[#C4B5FD] border border-[#4100F5]/40">
              <Sparkles className="w-3.5 h-3.5" /> Capabilities & Solutions
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black leading-tight tracking-tight">
              {service.text}
            </h1>

            <p className="text-lg sm:text-xl font-heading font-medium text-[#C4B5FD]">
              {service.heroTitle}
            </p>

            <p className="text-slate-300 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
              {service.overview}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-heading font-medium bg-white/5 text-slate-200 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:opacity-90 text-white font-heading font-bold px-7 py-3.5 rounded-full shadow-[0_0_30px_rgba(65,0,245,0.4)] transition-all duration-300"
              >
                <Send className="w-4 h-4" /> Start a Project
              </a>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
              <img
                src={service.src}
                alt={service.text}
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030412] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-[#0A0C22]/80 p-4 rounded-2xl border border-white/10">
                <span className="text-xs font-heading font-bold text-[#885FFF] block mb-1">D'Creativs Guarantee</span>
                <p className="text-xs text-slate-300">Production-grade deliverables backed by dedicated strategic support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="mb-20">
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest text-[#885FFF] uppercase mb-2">
              <Layers className="w-4 h-4" /> Key Deliverables
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold">
              What You Receive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0A0C22] to-[#050616] border border-white/10 hover:border-[#885FFF]/40 transition-all duration-300 shadow-lg group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#4100F5]/20 border border-[#4100F5]/40 flex items-center justify-center text-[#C4B5FD] mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-sm font-body text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Tech Stack */}
        {service.tools && (
          <div className="mb-20 p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-5 h-5 text-[#885FFF]" />
              <h3 className="text-xl font-heading font-bold">Tools & Tech Stack</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {service.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-4 py-2 rounded-xl text-sm font-heading font-semibold bg-[#0A0C22] border border-white/15 text-slate-200 shadow-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Workflow & Process */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <span className="text-xs font-heading font-semibold tracking-widest text-[#885FFF] uppercase">
              Proven Execution
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold mt-2">
              Our 4-Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-[#0A0C22] border border-white/10 hover:border-[#4100F5]/50 transition-all duration-300"
              >
                <span className="text-4xl font-heading font-black text-[#4100F5]/40 block mb-3">
                  {step.step}
                </span>
                <h4 className="text-lg font-heading font-bold mb-2">{step.title}</h4>
                <p className="text-xs font-body text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact / Inquiry CTA Banner */}
        <div id="inquiry" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#4100F5]/30 via-[#885FFF]/20 to-[#0A0C22] border border-[#885FFF]/30 text-center relative overflow-hidden mb-16">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-heading font-black">Ready to elevate with {service.text}?</h3>
            <p className="text-slate-300 font-body text-sm sm:text-base">
              Let's turn your vision into a remarkable reality. Reach out today for a consultation and custom project estimate.
            </p>
            <div className="pt-4 flex justify-center">
              <a
                href="mailto:contact@dcreativsstudio.com"
                className="inline-flex items-center gap-2 bg-white text-[#030412] hover:bg-slate-200 font-heading font-extrabold px-8 py-4 rounded-full transition-all duration-300 shadow-xl"
              >
                <Send className="w-4 h-4 text-[#4100F5]" /> Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Next / Previous Service Footer Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
          <Link
            to={`/services/${prevService.slug}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 text-[#885FFF] group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] font-heading font-medium text-slate-400 uppercase tracking-wider block">Previous Service</span>
              <span className="text-sm font-heading font-bold text-white">{prevService.text}</span>
            </div>
          </Link>

          <Link
            to={`/services/${nextService.slug}`}
            className="flex items-center justify-end gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group text-right"
          >
            <div>
              <span className="text-[10px] font-heading font-medium text-slate-400 uppercase tracking-wider block">Next Service</span>
              <span className="text-sm font-heading font-bold text-white">{nextService.text}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#885FFF] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
