import { useParams, Link, useNavigate } from "react-router-dom";
import { getServiceBySlug, servicesData } from "@/data/servicesData";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu, Layers, Send } from "lucide-react";
import { ToolsStackMarquee } from "@/components/ui/tools-stack-marquee";
import { SEO } from "@/components/common/SEO";

export function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = getServiceBySlug(serviceId);

  // Fallback if slug not found
  if (!service) {
    return (
      <div className="min-h-screen bg-[#F8F8F6] text-[#030412] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-heading font-extrabold mb-4 text-[#4100F5]">Service Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md font-light">
          The service you are looking for does not exist or has been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#4100F5] hover:bg-[#5212FF] text-white font-heading font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(65,0,245,0.25)]"
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
    <div className="min-h-screen bg-[#F8F8F6] text-[#030412] pt-24 pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      <SEO
        title={`${service.text} — Service`}
        description={service.subtitle || service.overview}
        image={service.src}
      />
      {/* Background Ambient Glows */}
      <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-[#4100F5]/[0.06] rounded-full blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#885FFF]/[0.05] rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Back Navigation Bar */}
        <div className="mb-8 flex items-center justify-between border-b border-black/[0.08] pb-4 sm:pb-6">
          <Link
            to="/#services"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm font-heading font-semibold text-[#030412] hover:text-[#4100F5] bg-black/[0.04] hover:bg-black/[0.08] border border-black/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md transition-all duration-300 group shadow-sm"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
            Back to All Services
          </Link>

          <span className="hidden sm:inline-block text-xs font-heading font-semibold tracking-widest text-slate-500 uppercase">
            0{currentIndex + 1} / 0{servicesData.length}
          </span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <p className="font-heading text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#4100F5]">
              Capabilities &amp; Solutions
            </p>

            <h1 className="text-3xl min-[375px]:text-4xl sm:text-5xl lg:text-6xl font-heading font-black leading-tight tracking-tight text-[#030412]">
              {service.text}
            </h1>

            <p className="text-lg sm:text-xl font-heading font-medium bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">
              {service.heroTitle}
            </p>

            <p className="text-slate-600 font-body text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {service.overview}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-heading font-medium bg-white text-slate-700 border border-black/10 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9f7dff] text-white font-heading font-bold px-7 py-3.5 rounded-full shadow-[0_8px_25px_rgba(65,0,245,0.25)] transition-all duration-300 hover:scale-105"
              >
                <Send className="w-4 h-4" /> Start a Project
              </a>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group">
              <img
                src={service.src}
                alt={service.text}
                className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-white/90 p-4 rounded-2xl border border-black/10 shadow-lg">
                <span className="text-xs font-heading font-bold text-[#4100F5] block mb-1">D'Creativs Guarantee</span>
                <p className="text-xs text-slate-700 font-normal">Production-grade deliverables backed by dedicated strategic support.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deliverables Section */}
        <div className="mb-20">
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-widest text-[#4100F5] uppercase mb-2">
              <Layers className="w-4 h-4" /> Key Deliverables
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-[#030412]">
              What You Receive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-black/[0.08] hover:border-[#4100F5]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(65,0,245,0.08)] hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#4100F5]/10 border border-[#4100F5]/20 flex items-center justify-center text-[#4100F5] mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2 text-[#030412] group-hover:text-[#4100F5] transition-colors">{item.title}</h3>
                <p className="text-sm font-body text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Awwwards-Level Tools & Tech Stack Marquee */}
        {service.tools && (
          <ToolsStackMarquee tools={service.tools} serviceName={service.text} />
        )}

        {/* Workflow & Process */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <span className="text-xs font-heading font-semibold tracking-widest text-[#4100F5] uppercase">
              Proven Execution
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold mt-2 text-[#030412]">
              Our 4-Step Process
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 min-[390px]:gap-3.5 sm:gap-6">
            {service.process.map((step, idx) => (
              <div
                key={idx}
                className="relative p-3.5 min-[390px]:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-black/[0.08] hover:border-[#4100F5]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl min-[390px]:text-3xl sm:text-4xl font-heading font-black text-[#4100F5]/25 block mb-1.5 sm:mb-3">
                    {step.step}
                  </span>
                  <h4 className="text-sm min-[390px]:text-base sm:text-lg font-heading font-bold mb-1 sm:mb-2 text-[#030412]">
                    {step.title}
                  </h4>
                </div>
                <p className="text-[11px] min-[390px]:text-xs sm:text-xs font-body text-slate-600 leading-snug sm:leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Contact / Inquiry CTA Banner */}
        <div id="inquiry" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#4100F5]/10 via-[#885FFF]/10 to-[#F8F8F6] border border-[#885FFF]/30 shadow-lg text-center relative overflow-hidden mb-16">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-heading font-black text-[#030412]">Ready to elevate with {service.text}?</h3>
            <p className="text-slate-600 font-body text-sm sm:text-base font-normal">
              Let's turn your vision into a remarkable reality. Reach out today for a consultation and custom project estimate.
            </p>
            <div className="pt-4 flex justify-center">
              <a
                href="mailto:contact@dcreativsstudio.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4100F5] to-[#885FFF] hover:from-[#5212FF] hover:to-[#9f7dff] text-white font-heading font-extrabold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(65,0,245,0.25)] hover:scale-105"
              >
                <Send className="w-4 h-4" /> Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* Next / Previous Service Footer Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-black/[0.08]">
          <Link
            to={`/services/${prevService.slug}`}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white hover:bg-slate-50 border border-black/10 transition-all duration-300 group shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-[#4100F5] group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] font-heading font-medium text-slate-400 uppercase tracking-wider block">Previous Service</span>
              <span className="text-sm font-heading font-bold text-[#030412] group-hover:text-[#4100F5] transition-colors">{prevService.text}</span>
            </div>
          </Link>

          <Link
            to={`/services/${nextService.slug}`}
            className="flex items-center justify-end gap-4 p-4 rounded-2xl bg-white hover:bg-slate-50 border border-black/10 transition-all duration-300 group text-right shadow-sm"
          >
            <div>
              <span className="text-[10px] font-heading font-medium text-slate-400 uppercase tracking-wider block">Next Service</span>
              <span className="text-sm font-heading font-bold text-[#030412] group-hover:text-[#4100F5] transition-colors">{nextService.text}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-[#4100F5] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
