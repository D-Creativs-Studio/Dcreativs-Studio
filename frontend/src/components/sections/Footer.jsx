import { CosmicParallaxBg } from '@/components/ui/parallax-cosmic-background';

/**
 * Footer – D-Creativs Studio
 * Full-bleed cosmic parallax footer featuring:
 *  • Interactive star-field + horizon glow planet hero
 *  • Sleek gradient divider line
 *  • Navigation, Services, Contact & Social links
 *  • Copyright & attribution footer
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home',     href: '/' },
    { label: 'About',    href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact',  href: '#contact' },
  ];

  const services = [
    'Brand Identity',
    'UI/UX Design',
    'Web Development',
    'Motion & Animation',
    'Social Media Strategy',
    'Creative Direction',
  ];

  const socials = [
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3" />
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://x.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="w-4 h-4">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Behance',
      href: 'https://behance.net',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             className="w-4 h-4">
          <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.482.105.894.276 1.24.514.344.235.612.547.804.938.188.387.281.871.281 1.443 0 .619-.14 1.137-.421 1.551-.283.414-.7.753-1.256 1.015.757.219 1.317.602 1.681 1.148.362.549.543 1.209.543 1.985 0 .623-.12 1.162-.36 1.618a3.26 3.26 0 0 1-.979 1.13 4.39 4.39 0 0 1-1.441.67 6.36 6.36 0 0 1-1.72.229H2V5.698h5.799zm-.351 4.972c.48 0 .878-.114 1.192-.344.312-.229.467-.586.467-1.069 0-.27-.049-.497-.148-.677a1.13 1.13 0 0 0-.404-.428 1.73 1.73 0 0 0-.59-.225 3.38 3.38 0 0 0-.713-.073H4.645v2.816h2.803zm.156 5.229c.267 0 .521-.026.762-.08.241-.053.455-.143.637-.27.183-.127.329-.301.437-.52.108-.218.162-.499.162-.838 0-.667-.188-1.147-.562-1.435-.375-.288-.875-.433-1.5-.433H4.645v3.576h2.959zM16.625 18.02c.449.438 1.094.657 1.934.657.603 0 1.121-.152 1.558-.455.437-.302.706-.625.801-.966H22.5c-.356 1.104-.905 1.894-1.649 2.37-.741.474-1.638.712-2.69.712-.73 0-1.389-.116-1.974-.349a4.37 4.37 0 0 1-1.508-1.001 4.5 4.5 0 0 1-.966-1.544 5.66 5.66 0 0 1-.34-1.996c0-.706.115-1.364.349-1.973a4.566 4.566 0 0 1 .993-1.566 4.49 4.49 0 0 1 1.518-1.024c.587-.244 1.239-.366 1.952-.366.796 0 1.494.154 2.094.461.601.308 1.097.724 1.489 1.247.393.523.677 1.12.851 1.795.175.673.239 1.385.194 2.132h-6.666c.039.925.277 1.608.728 2.046zm3.378-5.239c-.36-.395-.9-.593-1.622-.593-.457 0-.839.077-1.147.232-.307.155-.556.35-.747.581-.19.232-.325.476-.404.733a3.04 3.04 0 0 0-.127.697h4.875c-.092-.762-.468-1.255-.828-1.65zM14.5 7.5h5.25v1.25H14.5V7.5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer id="contact" className="relative w-full bg-[#000422] text-white overflow-hidden">
      {/* ── Cosmic parallax hero section (Desktop & Tablet only) ── */}
      <div className="hidden md:block">
        <CosmicParallaxBg
          head="D'Creativs"
          text="Creative, Bold, Impactful, Unforgettable"
          loop={true}
        />
      </div>

      {/* ── Glowing top border divider ─────────────────────────── */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-[#885FFF]/40 to-transparent" />

      {/* ── Footer content grid section ────────────────────────── */}
      <div className="relative z-20 bg-gradient-to-b from-[#000422] via-[#030626] to-[#000216] pt-12 sm:pt-16 pb-10 px-4 min-[390px]:px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

            {/* Brand Column */}
            <div className="lg:col-span-1">
              <a href="/" className="inline-block group mb-3">
                <span className="font-heading text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#C4B5FD] to-[#885FFF] bg-clip-text text-transparent group-hover:from-[#4100F5] group-hover:to-[#885FFF] transition-all duration-300">
                  D'Creativs
                </span>
              </a>
              <p className="font-body text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
                A creative tech agency turning brands, products, and ideas into things people stop for.
              </p>

              {/* Social icons */}
              <div className="flex gap-3">
                {socials.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400
                               hover:bg-[#4100F5] hover:border-[#4100F5] hover:text-white hover:shadow-[0_0_15px_rgba(65,0,245,0.6)]
                               transition-all duration-300 ease-out hover:-translate-y-0.5"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h3 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-[#885FFF] mb-5">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-body text-sm text-slate-400 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-[#885FFF] mb-5">
                Capabilities
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="font-body text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & CTA Column */}
            <div>
              <h3 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-[#885FFF] mb-5">
                Get In Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="w-4 h-4 mt-0.5 shrink-0 text-[#885FFF]">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <a href="mailto:hello@dcreativs.studio"
                     className="hover:text-white transition-colors duration-200">
                    hello@dcreativs.studio
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                       className="w-4 h-4 mt-0.5 shrink-0 text-[#885FFF]">
                    <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                  </svg>
                  <span>Abia State &amp; Remote, Worldwide</span>
                </li>
                <li className="pt-2">
                  <a
                    href="mailto:hello@dcreativs.studio"
                    id="footer-cta"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold
                               bg-gradient-to-r from-[#4100F5] to-[#885FFF] text-white
                               hover:from-[#5212FF] hover:to-[#a07fff]
                               transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_25px_rgba(65,0,245,0.6)]"
                  >
                    Start a Project
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                         className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Bottom Divider & Copyright Bar ───────────────────── */}
          <div className="mt-14 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {currentYear} D'Creativs Studio. All rights reserved.</p>
            <div className="flex items-center gap-4 font-body">
              <a href="#privacy" className="hover:text-slate-300 transition-colors duration-200">
                Privacy Policy
              </a>
              <span className="text-slate-700">•</span>
              <a href="#terms" className="hover:text-slate-300 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
