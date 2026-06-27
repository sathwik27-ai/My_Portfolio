import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroAnime from "@/assets/hero-anime.gif";
import dpAsset from "@/assets/dp.jpg";
import certPython100 from "@/assets/cert-python100.png";
import certDeloitte from "@/assets/cert-deloitte.png";
import certAccenture from "@/assets/cert-accenture.png";
import certTuring from "@/assets/cert-turing.png";
import certCisco from "@/assets/cert-cisco.png";
import vnrLogo from "@/assets/vnrvjiet-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chandanapu Sathwik — Anime Dev Portfolio" },
      { name: "description", content: "Mixed-shonen anime themed portfolio of Chandanapu Sathwik — CSE @ VNRVJIET, LeetCode 1630, CodeChef 2★ 1409." },
      { property: "og:title", content: "Chandanapu Sathwik — Anime Dev Portfolio" },
      { property: "og:description", content: "Mixed-shonen anime themed portfolio of Chandanapu Sathwik." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "origin", label: "Origin" },
  { id: "powers", label: "Powers" },
  { id: "bounties", label: "Bounties" },
  { id: "arcs", label: "Training Arcs" },
  { id: "academy", label: "Academy" },
  { id: "trophies", label: "Trophies" },
  { id: "scroll", label: "Scroll" },
  { id: "contact", label: "Den Den Mushi" },
];

const SOCIALS = {
  github: "https://github.com/sathwik27-ai",
  leetcode: "https://leetcode.com/u/Sathwik-1234/",
  codechef: "https://www.codechef.com/users/sathwik_27_06",
  linkedin: "https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/",
  email: "mailto:sathwik12006@gmail.com",
};

function Portfolio() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav open={open} setOpen={setOpen} />
      <Hero />
      <Origin />
      <Powers />
      <Bounties />
      <Arcs />
      <Academy />
      <Trophies />
      <ScrollSection />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <nav className="sticky top-0 z-50 border-b-[3px] border-ink bg-parchment/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#origin" className="font-display text-2xl tracking-wider text-ink">
          ⚓ SATHWIK<span className="text-sunset">.</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="rounded px-3 py-2 font-display text-base tracking-wide text-ink transition-colors hover:bg-sunset hover:text-parchment"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden manga-panel-static px-3 py-2 font-display"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <ul className="flex flex-col gap-1 border-t-[3px] border-ink bg-parchment px-4 py-3 lg:hidden">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block rounded px-3 py-2 font-display text-lg text-ink hover:bg-sunset hover:text-parchment"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-ink">
      <img
        src={heroAnime}
        alt="Anime sunset ocean with pirate ship"
        width={1920}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
      <div className="absolute inset-0 halftone opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:py-44 lg:py-56">
        <div className="inline-block bounty-stamp px-4 py-1 text-sm">★ WANTED ★</div>
        <h1 className="mt-4 brush-title text-5xl leading-none text-parchment sm:text-7xl lg:text-8xl">
          Chandanapu Sathwik
        </h1>
        <p className="mt-4 max-w-2xl font-display text-2xl tracking-wide text-bounty sm:text-3xl">
          The Rookie Pirate of Code 🏴‍☠️
        </p>
        <p className="mt-4 max-w-xl text-base text-parchment/90 sm:text-lg">
          CSE undergrad @ VNRVJIET. Sailing the Grand Line of algorithms, full-stack builds, and data
          analytics. Bounty rising. 🍖
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#bounties" className="manga-panel-static bg-sunset px-5 py-3 font-display text-lg tracking-wide text-ink hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
            ▶ View Bounties
          </a>
          <a href="#contact" className="manga-panel-static bg-parchment px-5 py-3 font-display text-lg tracking-wide text-ink hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
            📡 Den Den Mushi
          </a>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-parchment/80 anim-float">▼ SCROLL ▼</div>
    </section>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="inline-block manga-panel-static bg-sunset px-3 py-1 font-display text-sm tracking-widest text-ink">
        ◆ {kicker} ◆
      </div>
      <h2 className="mt-3 brush-title text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
    </div>
  );
}

function Origin() {
  return (
    <section id="origin" className="relative border-b-[3px] border-ink bg-parchment py-20">
      <div className="absolute inset-0 halftone opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader kicker="CHAPTER 01" title="Origin Story" />
        <div className="grid items-start gap-8 lg:grid-cols-[300px_1fr]">
          <div className="manga-panel-static p-3 bg-card">
            <img src={dpAsset} alt="Chandanapu Sathwik" className="aspect-square w-full rounded object-cover border-2 border-ink" />
            <div className="mt-3 text-center font-display text-xl tracking-wide">CHANDANAPU SATHWIK</div>
            <div className="text-center text-sm text-muted-foreground">Hyderabad, India</div>
          </div>
          <div className="manga-panel-static p-6 sm:p-8 bg-card">
            <p className="text-lg leading-relaxed">
              Yo! I'm <strong>Sathwik</strong>, a <strong>Full-Stack Engineer</strong> and CSE undergrad
              at <strong>VNR VJIET</strong> (CGPA <strong>9.63</strong>). I build scalable apps with{" "}
              <strong>React, Next.js, and Node.js</strong>, and ship AI-integrated tools using the Gemini API.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              I'm a die-hard <strong>DSA enthusiast</strong> and <strong>competitive programmer</strong> —{" "}
              <strong>300+ problems</strong> conquered across <strong>LeetCode</strong> and{" "}
              <strong>CodeChef</strong>. C++ is my Wado Ichimonji. ⚔
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="LeetCode" value="1630" />
              <Stat label="CodeChef" value="1409 ⭐⭐" />
              <Stat label="DSA Solved" value="214+" />
              <Stat label="SmartInterviews" value="<6000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="manga-panel-static bg-bounty/30 p-3 text-center">
      <div className="font-display text-2xl tracking-wide text-ink">{value}</div>
      <div className="text-xs uppercase tracking-widest text-ink/70">{label}</div>
    </div>
  );
}

const SKILLS = [
  { group: "Haki (Core Mastery)", items: ["C++", "DSA", "Competitive Programming", "Problem Solving", "OOP"] },
  { group: "Gomu Gomu (Languages)", items: ["C++", "Python", "Java", "JavaScript", "C", "SQL"] },
  { group: "Mera Mera (Frontend)", items: ["React", "HTML5", "CSS3", "Tailwind", "Bootstrap"] },
  { group: "Ope Ope (Tools & CP Arenas)", items: ["LeetCode", "CodeChef", "Codeforces", "Git", "GitHub", "VS Code"] },
];

function Powers() {
  return (
    <section id="powers" className="relative border-b-[3px] border-ink bg-background py-20">
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader kicker="CHAPTER 02" title="Devil Fruit Powers" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s) => (
            <div key={s.group} className="manga-panel p-5">
              <div className="font-display text-lg tracking-wide text-sunset">{s.group}</div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="rounded border-2 border-ink bg-parchment px-2 py-1 text-sm font-semibold text-ink">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const BOUNTIES = [
  {
    name: "AI-Driven Financial Literacy Engine",
    bounty: "₿ 200,000,000",
    tags: ["Next.js 14", "Gemini API", "Prisma"],
    desc: "AI Finance Mentor using Gemini API delivering insights with <2s latency across 50+ queries. Analyzed 12+ platforms to identify 3 key differentiators guiding 5+ core features.",
    link: "https://github.com/sathwik27-ai/Interactive_financial_literacy",
  },
  {
    name: "Predictive Student Success Dashboard",
    bounty: "₿ 180,000,000",
    tags: ["Next.js 15", "TypeScript", "ML"],
    desc: "ML model predicting student dropout risk with 90% accuracy across 100+ profiles. Visualizes 10+ academic metrics through JWT-secured dashboards, optimizing data entry by 40%.",
    link: "https://github.com/sathwik27-ai/Student-Dropout-Risk-Prediction",
  },
  {
    name: "Adaptive Fitness Companion",
    bounty: "₿ 150,000,000",
    tags: ["React 18", "Node.js", "MongoDB Atlas"],
    desc: "Full-stack health platform using adaptive algorithms to serve 250+ weekly users. Architected a scheduling system handling 500+ monthly reminders to boost user consistency.",
    link: "https://github.com/sathwik27-ai/adaptive-fitness",
  },
];

function Bounties() {
  return (
    <section id="bounties" className="relative border-b-[3px] border-ink bg-bounty/20 py-20">
      <div className="absolute inset-0 halftone opacity-[0.08]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader kicker="CHAPTER 03" title="Bounties / Projects" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {BOUNTIES.map((b) => (
            <article key={b.name} className="manga-panel relative overflow-hidden p-6">
              <div className="absolute -top-3 -right-3 bounty-stamp bg-parchment px-3 py-1 text-xs">
                WANTED
              </div>
              <h3 className="font-display text-3xl tracking-wide text-ink">{b.name}</h3>
              <div className="mt-1 font-display text-xl text-crimson">{b.bounty}</div>
              <p className="mt-3 text-base">{b.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {b.tags.map((t) => (
                  <li key={t} className="rounded border-2 border-ink bg-sunset/40 px-2 py-0.5 text-xs font-bold">
                    #{t}
                  </li>
                ))}
              </ul>
              <a
                href={b.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block manga-panel-static bg-ink px-4 py-2 font-display text-sm tracking-wide text-parchment"
              >
                ⚔ View on GitHub →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const ARCS = [
  {
    title: "NSS Volunteer — Outreach Domain",
    org: "National Service Scheme, VNRVJIET",
    date: "Present",
    desc: "Leading community outreach drives, awareness campaigns, and social-impact initiatives across Hyderabad.",
  },
  {
    title: "Event Organization Volunteer",
    org: "VJ Data Questers Club, VNRVJIET",
    date: "Present",
    desc: "Organizing data-science meetups, hackathons, and workshops — handling logistics, hosting, and crew coordination.",
  },
  {
    title: "Student Chapter Member",
    org: "ISTE (Indian Society for Technical Education) — VNRVJIET Chapter",
    date: "Present",
    desc: "Active member contributing to technical events, peer learning sessions, and chapter activities.",
  },
];

function Arcs() {
  return (
    <section id="arcs" className="relative border-b-[3px] border-ink bg-background py-20">
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader kicker="CHAPTER 04" title="Training Arcs" />
        <ol className="relative space-y-6 border-l-4 border-dashed border-ink pl-6">
          {ARCS.map((a, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[34px] grid h-6 w-6 place-items-center rounded-full border-[3px] border-ink bg-sunset font-display text-xs">
                {i + 1}
              </span>
              <div className="manga-panel p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl tracking-wide">{a.title}</h3>
                  <span className="font-display text-sunset">{a.date}</span>
                </div>
                <div className="text-sm text-muted-foreground">{a.org}</div>
                <p className="mt-2">{a.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Academy() {
  return (
    <section id="academy" className="relative border-b-[3px] border-ink bg-parchment py-20">
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader kicker="CHAPTER 05" title="Academy" />
        <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
          <div className="manga-panel-static grid place-items-center bg-card p-4">
            <img src={vnrLogo} alt="VNRVJIET" className="h-32 w-32 object-contain" loading="lazy" />
          </div>
          <div className="space-y-4">
            <div className="manga-panel p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl tracking-wide">B.Tech, Computer Science & Engineering</h3>
                <span className="font-display text-sunset">2024 — 2028</span>
              </div>
              <div className="text-muted-foreground">VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad</div>
              <p className="mt-2">NAAC A++ accredited</p>
            </div>
            <div className="manga-panel p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl tracking-wide">Intermediate (MPC)</h3>
                <span className="font-display text-sunset">2022 — 2024</span>
              </div>
              <div className="text-muted-foreground">Narayana Junior College</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TROPHIES = [
  { img: certPython100, title: "100 Days of Code: Python Pro Bootcamp", issuer: "Udemy" },
  { img: certDeloitte, title: "Data Analytics Job Simulation", issuer: "Deloitte / Forage" },
  { img: certAccenture, title: "Software Engineering Job Simulation", issuer: "Accenture / Forage" },
  { img: certCisco, title: "Python Essentials 1", issuer: "Cisco Networking Academy" },
  { img: certTuring, title: "Turing Cup 2K26 — National Coding Contest", issuer: "VNRVJIET" },
  
];

function Trophies() {
  return (
    <section id="trophies" className="relative border-b-[3px] border-ink bg-background py-20">
      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeader kicker="CHAPTER 06" title="Trophies & Proofs" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TROPHIES.map((t) => (
            <a
              key={t.title}
              href={t.img}
              target="_blank"
              rel="noreferrer"
              className="manga-panel block overflow-hidden bg-card"
            >
              <div className="aspect-[4/3] w-full overflow-hidden border-b-[3px] border-ink bg-parchment">
                <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <div className="p-4">
                <div className="font-display text-lg tracking-wide">{t.title}</div>
                <div className="text-sm text-muted-foreground">{t.issuer}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollSection() {
  return (
    <section id="scroll" className="relative border-b-[3px] border-ink bg-bounty/20 py-20">
      <div className="absolute inset-0 halftone opacity-[0.08]" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionHeader kicker="CHAPTER 07" title="The Scroll (Resume)" />
        <div className="manga-panel-static bg-card p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl tracking-wide">Quick Profile</h3>
              <ul className="mt-3 space-y-2 text-base">
                <li>🎓 B.Tech CSE — VNRVJIET (2024–28)</li>
                <li>⚔ LeetCode: <strong>1630</strong> · 214+ solved</li>
                <li>🍱 CodeChef: <strong>1409</strong> · <strong>2★</strong></li>
                <li>🥷 SmartInterviews rank: <strong>&lt; 6000</strong></li>
                <li>📍 Hyderabad, India</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl tracking-wide">Toolbelt</h3>
              <p className="mt-3">Python · Java · JavaScript · React · Node · SQL · MongoDB · Pandas · Git</p>
              <h3 className="mt-4 font-display text-2xl tracking-wide">Currently Training</h3>
              <p className="mt-2">Machine Learning · GenAI · System Design</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download="Chandanapu_Sathwik_Resume.pdf"
              className="manga-panel-static bg-sunset px-5 py-3 font-display tracking-wide text-ink"
            >
              ⬇ Download Resume
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="manga-panel-static bg-parchment px-5 py-3 font-display tracking-wide text-ink"
            >
              👁 Preview Scroll
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { label: "GitHub", href: SOCIALS.github, icon: "💻" },
    { label: "LeetCode", href: SOCIALS.leetcode, icon: "⚔" },
    { label: "CodeChef", href: SOCIALS.codechef, icon: "🍱" },
    { label: "LinkedIn", href: SOCIALS.linkedin, icon: "🔗" },
    { label: "Email", href: SOCIALS.email, icon: "📧" },
  ];
  return (
    <section id="contact" className="relative border-b-[3px] border-ink bg-ink py-20 text-parchment">
      <div className="absolute inset-0 halftone opacity-10" />
      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <div className="inline-block manga-panel-static bg-sunset px-3 py-1 font-display text-sm tracking-widest text-ink">
          ◆ FINAL CHAPTER ◆
        </div>
        <h2 className="mt-3 font-brush text-5xl text-parchment sm:text-6xl" style={{ textShadow: "3px 3px 0 oklch(0.72 0.21 45)" }}>
          Den Den Mushi 📞
        </h2>
        <p className="mt-4 text-lg text-parchment/80">
          Got a quest, internship, or just want to talk One Piece theories? Ring me up.
        </p>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="manga-panel-static bg-parchment px-4 py-4 font-display text-lg tracking-wide text-ink"
            >
              <div className="text-2xl">{l.icon}</div>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink py-6 text-center text-sm text-parchment/70">
      ⚓ Crafted with chai, manga, and React · © {new Date().getFullYear()} Chandanapu Sathwik
    </footer>
  );
}
