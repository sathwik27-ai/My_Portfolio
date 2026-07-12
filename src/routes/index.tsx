import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  Code,
  BarChart,
  GraduationCap,
  User,
  ChevronRight,
  Copy,
  Check,
  Sun,
  Moon,
  Laptop,
  Terminal,
  Database,
  Wrench,
  BookOpen,
  Rocket,
  Handshake
} from "lucide-react";
import dpAsset from "@/assets/dp.jpg";
import certPython100 from "@/assets/cert-python100.png";
import certDeloitte from "@/assets/cert-deloitte.png";
import certAccenture from "@/assets/cert-accenture.png";
import certTuring from "@/assets/cert-turing.png";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { IntroScreen } from "@/components/IntroScreen";
import certCisco from "@/assets/cert-cisco.png";
import vnrLogo from "@/assets/vnrvjiet-logo.png";
import { Hero } from "@/components/Hero/Hero";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chandanapu Sathwik | AI Developer & Data Science Student" },
      { name: "description", content: "Professional portfolio of Chandanapu Sathwik — CSE @ VNRVJIET. AI Developer specialized in Next.js, Gemini API, and Machine learning." },
    ],
  }),
  component: PortfolioLayout,
});

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience & Contributions" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = {
  github: "https://github.com/sathwik27-ai",
  leetcode: "https://leetcode.com/u/Sathwik-1234/",
  codechef: "https://www.codechef.com/users/sathwik_27_06",
  linkedin: "https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/",
  email: "sathwik12006@gmail.com",
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalDuration = 1200; // ms
    const incrementTime = Math.max(Math.floor(totalDuration / end), 12);

    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

function PortfolioLayout() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });
  const [activeSection, setActiveSection] = useState("hero");

  // Custom Cursor Followers
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorHovered, setIsCursorHovered] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.classList.contains("cursor-pointer"))
      ) {
        setIsCursorHovered(true);
      } else {
        setIsCursorHovered(false);
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background text-foreground transition-colors duration-300"
        >
          <Toaster position="bottom-right" richColors />

          {/* Custom Cursor follower */}
          <div
            className={`custom-cursor-dot pointer-events-none hidden md:block ${isCursorHovered ? "hovered" : ""}`}
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />
          <div
            className={`custom-cursor-ring pointer-events-none hidden md:block ${isCursorHovered ? "hovered" : ""}`}
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />

          <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
          <main className="relative z-10">
            <Hero />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceTimeline />
            <AchievementsSection />
            <ContactForm />
          </main>
          <Footer />
          <Chatbot />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 1. NAVBAR COMPONENT
function Navbar({ theme, toggleTheme, activeSection }: { theme: "dark" | "light"; toggleTheme: () => void; activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full premium-glass border-b border-border/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-mono text-xl font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-80">
          {"{sathwik/}"}
        </a>

        {/* Desktop nav menu */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${activeSection === s.id ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {s.label}
                {activeSection === s.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Toggle Theme + Resume button */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="/resume.pdf"
            download="Sathwik_Resume.pdf"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:scale-[1.02]"
          >
            Download Resume
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 hover:bg-secondary transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/40 bg-card px-6 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setIsOpen(false)}
                    className={`block py-1 text-base font-medium transition-colors ${activeSection === s.id ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-border/40 pt-4 flex gap-2">
                <a
                  href="/resume.pdf"
                  download="Sathwik_Resume.pdf"
                  className="w-full text-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/95"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}



// 3. ABOUT SECTION
function AboutSection() {
  return (
    <section id="about" className="py-20 border-b border-border/40 relative overflow-hidden bg-background/50">
      {/* Decorative Orbits & Primitives backings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none opacity-45 dark:opacity-60">
        {/* Soft radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,var(--color-primary)/0.06_0%,transparent_70%)] blur-2xl" />

        {/* Orbits */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-dashed border-primary/20 rotate-45 scale-y-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dotted border-accent/20 -rotate-30 scale-x-50" />

        {/* Abstract Floating visual nodes */}
        {/* Primary-colored Pyramid shape */}
        <div className="absolute top-[25%] left-[45%] w-12 h-12 bg-primary/15 rounded-lg rotate-12 blur-[1px] animate-[pulse_6s_infinite_alternate]" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        {/* Accent-colored Dodecahedron-like shape */}
        <div className="absolute top-[45%] left-[48%] w-16 h-16 bg-accent/15 rounded-xl -rotate-45 blur-[0.5px] animate-[spin_30s_linear_infinite]" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }} />
        {/* Torus ring glow */}
        <div className="absolute top-[38%] left-[42%] w-8 h-8 rounded-full border-4 border-primary/20 rotate-30 blur-[0.5px] animate-pulse" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        {/* Title Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Biography
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">About Me</h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl text-center leading-relaxed">
            Passionate about building meaningful digital experiences
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Biography Paragraphs */}
          <div className="lg:col-span-6 space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              I'm <strong className="text-foreground font-semibold">Chandanapu Sathwik</strong>, a Computer Science & Engineering undergraduate at <strong className="text-foreground font-semibold">VNR Vignana Jyothi Institute of Engineering & Technology (VNRVJIET)</strong>, Hyderabad, holding an outstanding CGPA of <strong className="text-foreground font-semibold">9.63</strong>. I specialize in building scalable web architectures and engineering data solutions.
            </p>
            <p>
              As a dedicated Competitive Programmer and Data Structures enthusiast, I have solved hundreds of algorithm challenges on platforms like LeetCode (Max Rating: <strong className="text-foreground font-semibold">1630</strong>) and CodeChef (Rating: <strong className="text-foreground font-semibold">1409, 2★</strong>). I focus on writing robust, time-optimized code for high-performance applications.
            </p>
            <p>
              When I'm not coding, you'll find me organizing technical events with VJ Data Questers, investigating machine learning pipelines, or learning modern frameworks. I'm always eager to collaborate on projects that combine software engineering with intelligent APIs.
            </p>
          </div>

          {/* Right Column: 2x2 Glassmorphic Traits Grid */}
          <div className="lg:col-span-6 grid gap-6 sm:grid-cols-2">
            {/* Card 1: Problem Solver */}
            <div className="premium-glass p-6 rounded-2xl border border-border/40 flex flex-col items-center text-center shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Rocket size={22} className="animate-pulse" />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">Problem Solver</h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Analytical thinking & creative solutions
              </p>
            </div>

            {/* Card 2: Developer */}
            <div className="premium-glass p-6 rounded-2xl border border-border/40 flex flex-col items-center text-center shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Laptop size={22} />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">Developer</h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Full-stack development enthusiast
              </p>
            </div>

            {/* Card 3: Learner */}
            <div className="premium-glass p-6 rounded-2xl border border-border/40 flex flex-col items-center text-center shadow-lg hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                <Handshake size={22} />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">Learner</h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Constantly exploring new tech
              </p>
            </div>

            {/* Card 4: Team Player */}
            <div className="premium-glass p-6 rounded-2xl border border-border/40 flex flex-col items-center text-center shadow-lg hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
                <Handshake size={22} />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">Team Player</h4>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Collaboration & communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. SKILLS SECTION
const SKILL_CATEGORIES = [
  {
    title: "Core Mastery",
    icon: <Terminal className="text-primary" size={20} />,
    items: [
      { name: "C++", rating: 90 },
      { name: "Data Structures", rating: 88 },
      { name: "Algorithms", rating: 88 },
      { name: "Competitive Programming", rating: 82 },
      { name: "OOP", rating: 85 },
    ]
  },
  {
    title: "Programming Languages",
    icon: <Code className="text-primary" size={20} />,
    items: [
      { name: "Python", rating: 85 },
      { name: "Java", rating: 75 },
      { name: "JavaScript", rating: 80 },
      { name: "C", rating: 80 },
      { name: "SQL", rating: 82 },
    ]
  },
  {
    title: "Frontend Frameworks",
    icon: <Laptop className="text-primary" size={20} />,
    items: [
      { name: "React", rating: 85 },
      { name: "Next.js", rating: 80 },
      { name: "HTML5 & CSS3", rating: 90 },
      { name: "Tailwind CSS", rating: 92 },
      { name: "Bootstrap", rating: 80 },
    ]
  },
  {
    title: "Platforms & Tools",
    icon: <Wrench className="text-primary" size={20} />,
    items: [
      { name: "Git & GitHub", rating: 85 },
      { name: "VS Code", rating: 90 },
      { name: "Prisma & MongoDB", rating: 80 },
      { name: "Gemini API", rating: 85 },
      { name: "Data Analytics", rating: 78 },
    ]
  }
];

function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-secondary/10 border-b border-border/40 relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Core Toolbox
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Skills & Tech Stack</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-center leading-relaxed">
            A comprehensive list of engineering domains, programming frameworks and development environments I use.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="premium-glass p-6 rounded-2xl border border-border/40"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  {cat.icon}
                </span>
                <h3 className="text-lg font-bold tracking-tight">{cat.title}</h3>
              </div>

              <div className="space-y-5">
                {cat.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                      <span className="text-muted-foreground">{skill.name}</span>
                      <span className="text-primary/95 font-semibold text-xs tracking-wider">{skill.rating}%</span>
                    </div>
                    {/* Proficiency Tracker Bar */}
                    <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden border border-border/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.rating}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. PROJECTS SECTION
const PROJECTS_DATA = [
  {
    name: "Trevia — AI Travel Planner",
    category: "AI/ML",
    desc: "AI-driven travel advisory platform generating bespoke itineraries for tourists across India based on customizable budget allocations, personal safety features, and local culinary discoveries.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Gemini API", "AI Agent"],
    link: "https://github.com/sathwik27-ai/Trevia-project",
    highlight: true,
  },
  {
    name: "AI-Driven Financial Literacy Engine",
    category: "AI/ML",
    desc: "Personal Finance Mentoring web app powered by Gemini API, achieving rapid response telemetry (<2s latency) over detailed queries. Engineered features to deliver user budgeting insight loops.",
    tags: ["Next.js 14", "Gemini API", "Prisma", "Tailwind CSS"],
    link: "https://github.com/sathwik27-ai/Interactive_financial_literacy",
    highlight: true,
  },
  {
    name: "Predictive Student Success Dashboard",
    category: "AI/ML",
    desc: "Machine Learning model predicting student course completion outputs and dropout risks at 90% accuracy. Details JWT-secured dashboard tracking analytics and optimizing entry cycles by 40%.",
    tags: ["Next.js 15", "TypeScript", "Scikit-Learn", "JWT Auth"],
    link: "https://github.com/sathwik27-ai/Student-Dropout-Risk-Prediction",
    highlight: true,
  },
  {
    name: "Adaptive Fitness Companion",
    category: "Web",
    desc: "Full-stack client health board serving weekly active subscribers. Features scheduling engines handling background reminders and workouts syncing with MongoDB databases.",
    tags: ["React 18", "Node.js", "Express", "MongoDB Atlas"],
    link: "https://github.com/sathwik27-ai/adaptive-fitness",
    highlight: false,
  },
];

function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "AI/ML", "Web"];

  const filteredProjects = filter === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 border-b border-border/40 relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Product Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Featured Projects</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-center leading-relaxed">
            Exploring the intersection of web frameworks and artificial intelligence tools.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-200 border ${filter === cat
                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10"
                : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary/80 hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Highlighted Top 3 Projects */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {filteredProjects.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`glowing-card p-6 flex flex-col justify-between h-full relative ${p.highlight ? "border-primary/40 shadow-sm shadow-primary/5" : ""
                }`}
            >
              {p.highlight && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-accent/20 bg-accent/10 text-[10px] text-accent font-semibold tracking-widest uppercase">
                  <Award size={10} /> Focus Project
                </div>
              )}

              <div>
                <span className="text-[11px] text-primary/80 font-bold uppercase tracking-widest">{p.category}</span>
                <h3 className="text-xl font-bold tracking-tight mt-2 text-foreground group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <ul className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded border border-border/80 bg-secondary/30 px-2 py-0.5 text-xs text-muted-foreground font-semibold">
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors"
                >
                  Source Code <ExternalLink size={12} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// 6. EXPERIENCE / TIMELINE
const EXPERIENCES = [
  {
    role: "Event Organization Volunteer",
    company: "VJ Data Questers Club, VNRVJIET",
    date: "Present",
    desc: "Coordinating technical events, workshops, and competitive coding contests within the campus."
  },
  {
    role: "Community Outreach Volunteer",
    company: "National Service Scheme (NSS), VNRVJIET",
    date: "Present",
    desc: "Orchestrating rural literacy initiatives, community safety campaigns, and health camps around Hyderabad."
  },
  {
    role: "Student Chapter Member",
    company: "ISTE VNRVJIET Chapter",
    date: "Present",
    desc: "Actively contributing to peer learning labs, technical problem-solving mock runs, and technical project panels."
  }
];

function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 bg-secondary/15 border-b border-border/40 relative">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Contributions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Experience & Contributions</h2>
          <p className="mt-4 text-muted-foreground max-w-xl text-center leading-relaxed">
            Co-curricular events, student groups, and software projects keeping me engaged outside class.
          </p>
        </div>

        <div className="relative border-l-2 border-border/60 pl-8 ml-4 md:ml-12 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Interactive glow marker */}
              <span className="absolute -left-[41px] top-1.5 flex h-6.5 w-6.5 items-center justify-center rounded-full border-2 border-primary bg-background shadow-md">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              </span>

              <div className="premium-glass p-6 rounded-2xl border border-border/40">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{exp.role}</h3>
                  <span className="text-xs font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    {exp.date}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider mb-3">
                  <GraduationCap size={13} className="text-accent" /> {exp.company}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. ACHIEVEMENTS & CERTIFICATIONS SECTION
const CERTIFICATES = [
  { img: certDeloitte, title: "Data Analytics Job Simulation", issuer: "Deloitte / Forage" },
  { img: certAccenture, title: "Software Engineering Job Simulation", issuer: "Accenture / Forage" },
  { img: certPython100, title: "100 Days of Code: Python Pro", issuer: "Udemy Bootcamp" },
  { img: certCisco, title: "Python Essentials I Certification", issuer: "Cisco Networking" },
  { img: certTuring, title: "Turing Cup 2K26 Finalist", issuer: "VNRVJIET Coding Arena" },
];

function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 border-b border-border/40 relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Trophies & Proofs
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Achievements & Certifications</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-center leading-relaxed">
            Validation of my algorithmic foundations, language certifications, and professional development simulations.
          </p>
        </div>

        {/* Highlight Stats counter */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-14">
          {CERTIFICATES.map((cert, idx) => (
            <motion.a
              key={cert.title}
              href={cert.img}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glowing-card block overflow-hidden bg-card border border-border group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted border-b border-border relative flex items-center justify-center p-3">
                <img
                  src={cert.img}
                  alt={cert.title}
                  loading="lazy"
                  className="h-full w-full object-contain group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground line-clamp-2 tracking-tight group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1.5">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Education Highlight Card */}
        <div className="premium-glass p-8 rounded-2xl border border-border/40 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-3 flex justify-center">
            <img src={vnrLogo} alt="VNRVJIET Logo" className="h-28 w-28 object-contain" />
          </div>
          <div className="lg:col-span-9 space-y-4">
            <div className="border-b border-border/40 pb-4">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">B.Tech Engineering Arena</span>
              <h3 className="text-xl font-bold tracking-tight mt-1 text-foreground">
                B.Tech in Computer Science & Engineering (2024 — 2028)
              </h3>
              <p className="text-xs font-semibold text-muted-foreground mt-1 text-primary/80">
                VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad · CGPA: 9.63
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">
                Accredited with NAAC A++ rating. Rigorous program in systems and computational logic.
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest font-semibold">High School Foundation</span>
              <h3 className="text-base font-bold tracking-tight mt-1 text-foreground">
                Intermediate MPC (2022 — 2024)
              </h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Narayana Junior College, Hyderabad
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 8. CONTACT & COPY CLIPBOARD FORM
function ContactForm() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    toast.success("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("https://formsubmit.co/ajax/sathwik12006@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _captcha: "false"
        })
      });

      if (!response.ok) {
        throw new Error("FormSubmit AJAX submission failed");
      }

      const result = await response.json();
      if (result.success === "true" || result.success === true) {
        toast.success("Message sent successfully! I will get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };





  return (
    <section id="contact" className="py-20 relative bg-secondary/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Contact Me</h2>
          <p className="mt-4 text-muted-foreground max-w-lg text-center leading-relaxed">
            Have a position, project, or quest in mind? Feel free to reach out to me below.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Text and Actions left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="premium-glass p-6 rounded-2xl border border-border/40">
              <h3 className="text-lg font-bold tracking-tight text-foreground">Contact Details</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Connect with me instantly via social platforms or copy my direct email to your clipboard.
              </p>

              {/* Copy Email element */}
              <div className="mt-6 flex items-center justify-between rounded-xl bg-card border border-border p-3">
                <div className="overflow-hidden pr-2">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest block">Direct Email</span>
                  <span className="text-sm font-medium text-foreground truncate block">{SOCIALS.email}</span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-lg p-2.5 bg-secondary border border-border hover:bg-secondary-foreground/10 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Copy email"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Social list links */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  aria-label="Github link"
                >
                  <Github size={18} />
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  aria-label="Linkedin link"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`mailto:${SOCIALS.email}`}
                  className="flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  aria-label="Email link"
                >
                  <Mail size={18} />
                </a>
                <a
                  href={SOCIALS.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 h-11 rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  aria-label="LeetCode profile link"
                >
                  LeetCode
                </a>
                <a
                  href={SOCIALS.codechef}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 h-11 rounded-lg border border-border bg-card text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                  aria-label="CodeChef profile link"
                >
                  CodeChef
                </a>
              </div>
            </div>
          </div>

          {/* Form right */}
          <div className="lg:col-span-7 premium-glass p-8 rounded-2xl border border-border/40">
            <h3 className="text-lg font-bold tracking-tight mb-6">Drop a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* FormSubmit configurations */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  className="w-full rounded-xl bg-card border border-border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full rounded-xl bg-card border border-border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Describe your project, position, or question..."
                  className="w-full rounded-xl bg-card border border-border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-all shadow-md shadow-primary/20 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Submit Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// 9. FOOTER COMPONENT
function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 bg-card relative z-10">
      <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {"{sathwik/}"}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Designed and engineered with React, Vite & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
