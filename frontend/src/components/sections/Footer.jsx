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
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { label: 'Brand Identity', href: '/services/brand-design' },
    { label: 'UI/UX Design', href: '/services/web-app-development' },
    { label: 'Web Development', href: '/services/web-app-development' },
    { label: 'Motion & Animation', href: '/services/motion-video' },
    { label: 'Social Media Strategy', href: '/services/social-marketing' },
    { label: 'Creative Direction', href: '/services/brand-design' },
  ];

  const socials = [
    {
      label: 'Instagram',
      href: 'https://instagram.com/dcreativs.studio',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.01"
            fill="currentColor"
            strokeWidth="3"
          />
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://x.com/dcreativs_',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/dcreativs',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com/dcreativs.studio',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#000422] text-white overflow-hidden"
    >
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
                A creative tech agency turning brands, products, and ideas into
                things people stop for.
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
                {services.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="font-body text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200">
                      {label}
                    </a>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mt-0.5 shrink-0 text-[#885FFF]"
                  >
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <a
                    href="mailto:dcreativs.studio@gmail.com"
                    className="hover:text-white transition-colors duration-200"
                  >
                    dcreativs.studio@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mt-0.5 shrink-0 text-[#885FFF]"
                  >
                    <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
                  </svg>
                  <span>Abia State &amp; Remote, Worldwide</span>
                </li>
                <li className="pt-2">
                  <a
                    href="/contact"
                    id="footer-cta"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold
                               bg-gradient-to-r from-[#4100F5] to-[#885FFF] text-white
                               hover:from-[#5212FF] hover:to-[#a07fff]
                               transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_25px_rgba(65,0,245,0.6)]"
                  >
                    Start a Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
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
              <a
                href="#privacy"
                className="hover:text-slate-300 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span className="text-slate-700">•</span>
              <a
                href="#terms"
                className="hover:text-slate-300 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
