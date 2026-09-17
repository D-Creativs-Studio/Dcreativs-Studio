import { motion } from "framer-motion";

const stats = [
  { value: "8", label: "Founding Members" },
  { value: "3+", label: "Years Building" },
  { value: "50+", label: "Projects Shipped" },
];

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function About() {
  return (
    <section
      id="about"
      className="relative bg-[#F8F8F6] overflow-hidden py-20 sm:py-36"
    >
      {/* Subtle ambient glow */}
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#4100F5]/08 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#885FFF]/06 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 min-[390px]:px-6 sm:px-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* ── Left Column: Text ── */}
          <div>
            {/* Eyebrow */}
            <motion.p
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              className="font-heading text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#4100F5] mb-3 sm:mb-4"
            >
              Who We Are
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              className="font-heading text-3xl min-[375px]:text-4xl sm:text-5xl font-extrabold text-[#030412] leading-[1.15] tracking-tight mb-6 sm:mb-8"
            >
              We build things{" "}
              <span className="bg-gradient-to-r from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">
                people actually stop for.
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
              className="font-body text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              D&apos;Creativs is a creative tech agency built by a team of
              designers, developers, and storytellers who got tired of watching
              good ideas get lost in bad execution. We started as eight people
              from the same cohort, each pulling a different skill to the table,
              and turned that into a studio that builds brands, products, and
              digital experiences people actually stop for.
            </motion.p>

            {/* Divider + CTA */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={3}
              className="mt-10 flex items-center gap-6"
            >
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#4100F5] to-[#885FFF] rounded-full" />
              <a
                href="#about"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                  bg-[#030412]/[0.05] hover:bg-[#4100F5]/10
                  text-[#030412] font-heading font-semibold text-sm
                  border border-[#030412]/15 hover:border-[#4100F5]/50
                  hover:-translate-y-0.5 active:scale-95
                  transition-all duration-300
                  shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                <span>Read More</span>
                <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">→</span>
              </a>
            </motion.div>
          </div>

          {/* ── Right Column: Stats card ── */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={1}
            className="relative"
          >
            {/* Card */}
            <div className="relative rounded-3xl border border-[#030412]/08 bg-[#F7F7FF] shadow-[0_8px_40px_rgba(65,0,245,0.08)] p-5 min-[390px]:p-6 sm:p-10 overflow-hidden">
              {/* Inner purple accent glow */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#4100F5]/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Stats grid */}
              <div className="relative z-10 grid grid-cols-3 divide-x divide-[#030412]/10 mb-8 sm:mb-10">
                {stats.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    variants={slideInRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={i + 2}
                    className="px-1.5 min-[390px]:px-3 sm:px-4 first:pl-0 last:pr-0 text-center"
                  >
                    <p className="font-heading text-2xl min-[390px]:text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-[#4100F5] to-[#885FFF] bg-clip-text text-transparent">
                      {value}
                    </p>
                    <p className="font-body text-[11px] min-[390px]:text-xs sm:text-sm text-slate-500 mt-1 leading-snug">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Pill tags */}
              <div className="relative z-10 flex flex-wrap gap-1.5 min-[390px]:gap-2">
                {[
                  "Brand Identity",
                  "Web Development",
                  "UI / UX Design",
                  "Motion & 3D",
                  "Content Strategy",
                  "Digital Products",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 min-[390px]:px-3 py-1 sm:py-1.5 rounded-full text-[11px] min-[390px]:text-xs font-heading font-medium
                      bg-white border border-[#030412]/10 text-slate-600
                      hover:bg-[#4100F5] hover:border-[#4100F5] hover:text-white
                      transition-all duration-200 cursor-default shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

