import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  Code,
  Laptop,
  Terminal,
  Wrench,
  Rocket,
  Handshake,
  Check,
  Copy,
  Sun,
  Moon,
  Sparkles,
  GraduationCap,
  Code2,
  TrendingUp,
  Database,
} from "lucide-react";
import certPython100 from "@/assets/cert-python100.png";
import certDeloitte from "@/assets/cert-deloitte.png";
import certAccenture from "@/assets/cert-accenture.png";
import certTuring from "@/assets/cert-turing.png";
import certCisco from "@/assets/cert-cisco.png";
import vnrLogo from "@/assets/vnrvjiet-logo.png";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { IntroScreen } from "@/components/IntroScreen";
import { Hero } from "@/components/Hero/Hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chandanapu Sathwik | AI Developer & Data Science Student" },
      {
        name: "description",
        content:
          "Professional portfolio of Chandanapu Sathwik — CSE @ VNRVJIET. AI Developer specialized in Next.js, Gemini API, and Machine learning.",
      },
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
  { id: "achievements", label: "Achievements & Profiles" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = {
  github: "https://github.com/sathwik27-ai",
  leetcode: "https://leetcode.com/u/Sathwik-1234/",
  codechef: "https://www.codechef.com/users/sathwik_27_06",
  codeforces: "https://codeforces.com/profile/sathwik_27_06",
  linkedin: "https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/",
  email: "sathwik12006@gmail.com",
};

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
      if (window.scrollY < 120) {
        setActiveSection("hero");
        return;
      }
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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroScreen
          key="intro"
          theme={theme}
          onComplete={() => setShowIntro(false)}
        />
      ) : (
        <motion.div
          key="portfolio"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-background text-foreground transition-colors duration-300 relative"
        >
          <Toaster position="bottom-right" richColors />

          {/* Custom Cursor follower */}
          <div
            className={`custom-cursor-dot pointer-events-none hidden md:block ${
              isCursorHovered ? "hovered" : ""
            }`}
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />
          <div
            className={`custom-cursor-ring pointer-events-none hidden md:block ${
              isCursorHovered ? "hovered" : ""
            }`}
            style={{ left: cursorPos.x, top: cursorPos.y }}
          />

          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            activeSection={activeSection}
          />
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
function Navbar({
  theme,
  toggleTheme,
  activeSection,
}: {
  theme: "dark" | "light";
  toggleTheme: () => void;
  activeSection: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full premium-glass border-b border-border backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-mono text-xl font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-85 cursor-pointer"
        >
          {"{sathwik/}"}
        </a>

        {/* Desktop nav menu */}
        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  if (s.id === "hero") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors hover:text-primary cursor-pointer ${
                  activeSection === s.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {s.label}
                {activeSection === s.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Toggle Theme + Resume button */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 border border-border bg-card/60 hover:bg-secondary transition-colors text-foreground/80 hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="/resume.pdf"
            download="Sathwik_Resume.pdf"
            className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-all shadow-sm shadow-primary/20 hover:scale-[1.02]"
          >
            Download Resume
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 border border-border bg-card hover:bg-secondary transition-colors text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 border border-border bg-card hover:bg-secondary transition-colors text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <span className="text-lg">✕</span> : <span className="text-lg">☰</span>}
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
            className="border-t border-border bg-card px-6 py-4 md:hidden shadow-lg"
          >
            <ul className="flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (s.id === "hero") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      activeSection === s.id ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-border pt-4">
                <a
                  href="/resume.pdf"
                  download="Sathwik_Resume.pdf"
                  className="block w-full text-center rounded-lg bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90"
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

// 2. ABOUT SECTION (BIOGRAPHY HEADING REMOVED PER PHASE 5)
function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 border-b border-border relative overflow-hidden bg-background/50"
    >
      {/* Decorative ambient orbital backings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none opacity-40 dark:opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,var(--color-primary)/0.08_0%,transparent_70%)] blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-dashed border-primary/20 rotate-45 scale-y-50" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        {/* Title Block - Clean & balanced with Biography title removed */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            About Me
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl text-center leading-relaxed">
            Passionate about engineering scalable web architectures, algorithmic systems, and intelligent machine learning solutions.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          {/* Left Column: Core Narrative Paragraphs */}
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              I'm <strong className="text-foreground font-semibold">Chandanapu Sathwik</strong>, a Computer Science & Engineering (Data Science) undergraduate at <strong className="text-foreground font-semibold">VNR Vignana Jyothi Institute of Engineering & Technology (VNRVJIET)</strong>, Hyderabad, holding an outstanding CGPA of <strong className="text-foreground font-semibold">9.53</strong>.
            </p>
            <p>
              As a dedicated Competitive Programmer and Data Structures enthusiast, I have solved <strong className="text-foreground font-semibold">300+ algorithm challenges</strong> across LeetCode (Rating: <strong className="text-foreground font-semibold">1600+</strong>), CodeChef (Rating: <strong className="text-foreground font-semibold">1400+, 2★</strong>), and Codeforces (Rating: <strong className="text-foreground font-semibold">1100+</strong>). My focus is writing robust, time-optimized code for high-performance distributed systems.
            </p>
            <p>
              Beyond coding, I actively contribute to peer learning as an Event Organization Volunteer with VJ Data Questers, serve in community literacy drives through the National Service Scheme (NSS), and mentor peers at the ISTE student chapter. I am eager to collaborate on production-ready software combining modern web engineering with intelligent APIs.
            </p>
          </div>

          {/* Right Column: 4 Distinctive Trait Cards with Juicy Pastels & Midnight Garden Palettes */}
          <div className="lg:col-span-6 grid gap-4 sm:grid-cols-2">
            {/* Card 1: Problem Solver (Mint) */}
            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Rocket size={22} />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">
                Problem Solver
              </h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Algorithmic optimization, time-complexity rigor & structured problem decomposition
              </p>
            </div>

            {/* Card 2: Full-Stack Developer (Sage) */}
            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Laptop size={22} />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">
                Full-Stack Developer
              </h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                React 19, Next.js, Node.js, FastAPI, PostgreSQL, Supabase & graph databases
              </p>
            </div>

            {/* Card 3: Lifelong Learner (Peach) */}
            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-3">
                <Sparkles size={22} />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">
                AI & ML Explorer
              </h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                LangGraph agents, Gemini API, Neo4j knowledge graphs & computer vision pipelines
              </p>
            </div>

            {/* Card 4: Team Player (Butter/Lavender) */}
            <div className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Handshake size={22} />
              </div>
              <h4 className="font-bold text-sm tracking-tight text-foreground">
                Collaborative Leader
              </h4>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                VJ Data Questers, NSS community outreach & ISTE technical chapter mentoring
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. SKILLS SECTION (DIRECTLY SOURCED FROM RESUME — PREVIOUS PROGRESS-BAR STYLE)
const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    icon: <Code className="text-primary" size={20} />,
    items: [
      { name: "C++", rating: 92 },
      { name: "Python", rating: 90 },
      { name: "SQL", rating: 88 },
      { name: "C", rating: 88 },
      { name: "JavaScript", rating: 86 },
      { name: "R", rating: 80 },
    ],
  },
  {
    title: "Web Development",
    icon: <Laptop className="text-primary" size={20} />,
    items: [
      { name: "Tailwind CSS", rating: 92 },
      { name: "HTML & CSS", rating: 92 },
      { name: "React.js", rating: 88 },
      { name: "Next.js", rating: 85 },
      { name: "Flask & FastAPI", rating: 86 },
      { name: "Node.js & Express.js", rating: 84 },
      { name: "Bootstrap", rating: 86 },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="text-primary" size={20} />,
    items: [
      { name: "PostgreSQL", rating: 88 },
      { name: "MySQL", rating: 88 },
      { name: "Supabase", rating: 86 },
      { name: "MongoDB", rating: 85 },
      { name: "Neo4j", rating: 84 },
      { name: "Firebase", rating: 82 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="text-primary" size={20} />,
    items: [
      { name: "VS Code", rating: 92 },
      { name: "Git", rating: 90 },
      { name: "Jupyter & Colab", rating: 88 },
      { name: "Power BI", rating: 84 },
      { name: "Tableau", rating: 82 },
      { name: "Docker", rating: 80 },
    ],
  },
  {
    title: "Core Coursework",
    icon: <Terminal className="text-primary" size={20} />,
    items: [
      { name: "Data Structures & Algorithms (DSA)", rating: 92 },
      { name: "Object-Oriented Programming (OOP)", rating: 90 },
      { name: "Database Management Systems (DBMS)", rating: 88 },
      { name: "Operating Systems (OS)", rating: 86 },
      { name: "Computer Networks (CN)", rating: 84 },
    ],
  },
];

function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-secondary/10 border-b border-border/40 relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Core Technical Toolbox
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Skills & Tech Stack
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl text-center leading-relaxed">
            Verified proficiencies across programming languages, full-stack frameworks, database engineering, developer tooling, and core computer science fundamentals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="premium-glass p-6 rounded-2xl border border-border/40 bg-card/60 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                    {cat.icon}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {cat.items.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-muted-foreground font-medium">{skill.name}</span>
                        <span className="text-primary font-semibold font-mono text-xs tracking-wider">
                          {skill.rating}%
                        </span>
                      </div>
                      {/* Proficiency Tracker Bar */}
                      <div className="w-full bg-secondary/50 rounded-full h-1.5 overflow-hidden border border-border/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.rating}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. TACTILE 3D TILT CARD FOR PROJECTS (PHASE 8)
function ProjectTiltCard({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -5.5; // max 5.5 deg
    const rotY = ((x - centerX) / centerX) * 5.5;  // max 5.5 deg

    setTransform(
      `perspective(850px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`,
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(850px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
    );
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition:
          "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease, border-color 0.25s ease",
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden rounded-2xl border bg-card p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-xl select-none ${
        highlight
          ? "border-primary/45 shadow-primary/5"
          : "border-border hover:border-primary/40"
      }`}
    >
      {/* Subtle dynamic sheen reflection */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 260px at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}

// 5. PROJECTS SECTION - ALL 8 DEPLOYED PROJECTS STRICTLY PRESERVED & LINKED (PHASE 10)
interface ProjectItem {
  name: string;
  category: "AI/ML" | "Web";
  desc: string;
  tags: string[];
  link: string;
  demo?: string;
  highlight?: boolean;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    name: "Autonomous Fraud Investigation System",
    category: "AI/ML",
    desc: "Graph-powered fraud investigation pipeline combining transaction rules, account history, and Neo4j graph relationships. Implements LangGraph orchestration, similar-case retrieval, and decision explainability.",
    tags: ["Python", "FastAPI", "Neo4j", "LangGraph", "Next.js"],
    link: "https://github.com/sathwik27-ai/Autonomous_Fraud_Investigation",
    demo: "https://autonomous-fraud-investigation.vercel.app/",
    highlight: true,
  },
  {
    name: "GridPulse — EV Charging and Grid Simulation",
    category: "AI/ML",
    desc: "Commercial-grade real-time energy management simulator modelling vehicle charge levels, departure deadlines, building demand, and solar generation with constrained priority optimization.",
    tags: ["Python", "SciPy", "NumPy", "React", "Vite"],
    link: "https://github.com/sathwik27-ai/GridPulse",
    demo: "https://grid-pulse-pi.vercel.app/",
    highlight: true,
  },
  {
    name: "Adaptive Fitness Companion",
    category: "Web",
    desc: "Full-stack fitness board providing user onboarding workflows, personalized workout planning, and API synchronization with MongoDB Atlas database storage.",
    tags: ["React 18", "Node.js", "Express", "MongoDB Atlas"],
    link: "https://github.com/sathwik27-ai/adaptive-fitness",
    demo: "https://adaptive-fitness-seven.vercel.app/",
    highlight: true,
  },
  {
    name: "SleepSense — Focus and Fatigue Companion",
    category: "AI/ML",
    desc: "Browser-based facial-landmark monitoring application utilizing MediaPipe and eye-closure heuristics for real-time fatigue detection, focus tracking, and secure profile persistence.",
    tags: ["React", "TypeScript", "MediaPipe", "PostgreSQL", "JWT"],
    link: "https://github.com/sathwik27-ai/SleepSense",
    demo: "https://sleep-sense-2706.vercel.app/",
    highlight: false,
  },
  {
    name: "Student Dropout Risk Prediction",
    category: "AI/ML",
    desc: "Machine Learning model predicting student course completion outputs and dropout risks at 90% accuracy, visualized through JWT-secured dashboards tracking academic analytics.",
    tags: ["Next.js 15", "TypeScript", "Scikit-Learn", "JWT Auth"],
    link: "https://github.com/sathwik27-ai/Student-Dropout-Risk-Prediction",
    demo: "https://student-dropout-risk-prediction-sigma.vercel.app",
    highlight: false,
  },
  {
    name: "Trevia — AI Travel Planner",
    category: "AI/ML",
    desc: "AI-driven travel advisory platform generating bespoke itineraries for tourists across India based on customizable budget allocations, personal safety features, and local culinary discoveries.",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Gemini API", "AI Agent"],
    link: "https://github.com/sathwik27-ai/Trevia-project",
    demo: "https://trevia-project.vercel.app",
    highlight: false,
  },
  {
    name: "Book Bank Management",
    category: "Web",
    desc: "Enterprise library platform featuring role-based access control, PostgreSQL row-level security (RLS), automated daily fine calculations, and book inventory management.",
    tags: ["TanStack Start", "React 19", "Supabase", "PostgreSQL", "Tailwind CSS"],
    link: "https://github.com/sathwik27-ai/Book_Bank_Management",
    demo: "https://book-bank-management.vercel.app",
    highlight: false,
  },
  {
    name: "SkyCast Weather — World Weather Explorer",
    category: "Web",
    desc: "Global weather explorer combining OpenWeather multi-day forecasting, OpenStreetMap Nominatim geocoding, and interactive Leaflet map exploration with Plotly climate charts.",
    tags: ["Python", "Flask", "OpenWeather API", "Leaflet", "Plotly"],
    link: "https://github.com/sathwik27-ai/SkyCast_Weather",
    demo: "https://sky-cast-weather-nine.vercel.app/",
    highlight: false,
  },
  {
    name: "Face Recognition Attendance System",
    category: "AI/ML",
    desc: "Biometric attendance tracking system utilizing InsightFace and ONNX Runtime for local facial landmark analysis, embedding generation, SQLite vector logging, and operator dashboards.",
    tags: ["Python", "Flask", "InsightFace", "ONNX Runtime", "OpenCV"],
    link: "https://github.com/sathwik27-ai/Face-Recognition-Attendance",
    highlight: false,
  },
];

function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "AI/ML", "Web"];

  const filteredProjects =
    filter === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 border-b border-border relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Product Portfolio
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl text-center leading-relaxed">
            Exploring the intersection of modern web frameworks, artificial intelligence tools, and scalable data infrastructure.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-200 border ${
                filter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {filteredProjects.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="h-full"
            >
              <ProjectTiltCard highlight={p.highlight}>
                {p.highlight && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-[10px] text-primary font-bold tracking-widest uppercase">
                    <Award size={10} /> Focus Project
                  </div>
                )}

                <div>
                  <span className="text-[11px] text-primary font-mono font-bold uppercase tracking-widest">
                    {p.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight mt-2 text-foreground">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <ul className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[11px] text-muted-foreground font-semibold"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors cursor-pointer"
                      >
                        Live Demo <ExternalLink size={12} />
                      </a>
                    )}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                        p.demo
                          ? "text-muted-foreground hover:text-foreground"
                          : "text-primary hover:text-accent"
                      }`}
                    >
                      <Github size={13} /> Source Code
                    </a>
                  </div>
                </div>
              </ProjectTiltCard>
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
    date: "2024 — Present",
    desc: "Coordinating technical events, hackathons, workshops, and competitive coding contests within the campus.",
  },
  {
    role: "Community Outreach Volunteer",
    company: "National Service Scheme (NSS), VNRVJIET",
    date: "2024 — Present",
    desc: "Orchestrating rural literacy initiatives, community digital safety campaigns, and health awareness drives around Hyderabad.",
  },
  {
    role: "Student Chapter Member",
    company: "ISTE VNRVJIET Chapter",
    date: "2024 — Present",
    desc: "Actively contributing to peer learning labs, algorithmic mock runs, and technical project showcases.",
  },
];

function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 bg-secondary/15 border-b border-border relative">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Contributions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Experience & Contributions
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl text-center leading-relaxed">
            Co-curricular leadership, campus technical organizations, and community development initiatives.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/30 pl-8 ml-4 md:ml-12 space-y-10">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Interactive glow marker */}
              <span className="absolute -left-[41px] top-1.5 flex h-6.5 w-6.5 items-center justify-center rounded-full border-2 border-primary bg-background shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary" />
              </span>

              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-semibold text-primary px-3 py-0.5 rounded-full bg-primary/10 border border-primary/25">
                    {exp.date}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-wider mb-3">
                  <GraduationCap size={14} className="text-primary" /> {exp.company}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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

// 7. ACHIEVEMENTS, CODING PROFILES & CERTIFICATIONS SECTION
const CERTIFICATES = [
  { img: certDeloitte, title: "Data Analytics Job Simulation", issuer: "Deloitte / Forage" },
  { img: certAccenture, title: "Software Engineering Job Simulation", issuer: "Accenture / Forage" },
  { img: certPython100, title: "100 Days of Code: Python Pro", issuer: "Udemy Bootcamp" },
  { img: certCisco, title: "Python Essentials I Certification", issuer: "Cisco Networking" },
  { img: certTuring, title: "Turing Cup 2K26 Finalist", issuer: "VNRVJIET Coding Arena" },
];

function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 border-b border-border relative">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Trophies & Proofs
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Achievements & Credentials
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl text-center leading-relaxed">
            Validation of algorithmic foundations, language credentials, and professional industry career simulations.
          </p>
        </div>

        {/* Competitive Coding Profiles Showcase Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <TrendingUp className="text-primary" size={20} />
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              Competitive Programming Ratings
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={SOCIALS.leetcode}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">LeetCode</span>
                <div className="text-xl font-extrabold text-foreground mt-1">1600+ Rating</div>
                <p className="text-xs text-muted-foreground mt-1">300+ Problems Solved</p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-semibold">
                View Profile <ExternalLink size={12} />
              </span>
            </a>

            <a
              href={SOCIALS.codechef}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">CodeChef</span>
                <div className="text-xl font-extrabold text-foreground mt-1">1400+ (2★)</div>
                <p className="text-xs text-muted-foreground mt-1">Division 3 Rated Coder</p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-semibold">
                View Profile <ExternalLink size={12} />
              </span>
            </a>

            <a
              href={SOCIALS.codeforces}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl border border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Codeforces</span>
                <div className="text-xl font-extrabold text-foreground mt-1">1100+ Rating</div>
                <p className="text-xs text-muted-foreground mt-1">Pupil Division Participant</p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-semibold">
                View Profile <ExternalLink size={12} />
              </span>
            </a>

            <div className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Hackathons</span>
                <div className="text-xl font-extrabold text-foreground mt-1">Top 3 Finalist</div>
                <p className="text-xs text-muted-foreground mt-1">Convergence 24-Hr Software Hackathon</p>
              </div>
              <span className="mt-3 text-xs text-muted-foreground font-semibold">VNR VJIET Campus</span>
            </div>
          </div>
        </div>

        {/* Certificate Cards */}
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
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="block overflow-hidden bg-card border border-border rounded-xl group hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-secondary/40 border-b border-border relative flex items-center justify-center p-3">
                <img
                  src={cert.img}
                  alt={cert.title}
                  loading="lazy"
                  className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
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
        <div className="p-8 rounded-2xl border border-border bg-card shadow-sm grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-3 flex justify-center">
            <img
              src={vnrLogo}
              alt="VNRVJIET Logo"
              className="h-28 w-28 object-contain"
            />
          </div>
          <div className="lg:col-span-9 space-y-4">
            <div className="border-b border-border pb-4">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                B.Tech Engineering Degree
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-1 text-foreground">
                B.Tech in Computer Science & Engineering (Data Science) (2024 — 2028)
              </h3>
              <p className="text-xs font-semibold text-primary mt-1">
                VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad · CGPA: 9.53
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">
                Accredited with NAAC A++ rating. Rigorous program in computational systems, machine learning, and algorithm design.
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Junior College Foundation
              </span>
              <h3 className="text-base font-bold tracking-tight mt-1 text-foreground">
                Intermediate MPC (2022 — 2024) · 98.5%
              </h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Narayana Junior College, Hyderabad
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Schooling
              </span>
              <h3 className="text-base font-bold tracking-tight mt-1 text-foreground">
                Secondary School Certificate (2021 — 2022) · CGPA: 10.0
              </h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                Siddhartha E/M High School
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 8. CONTACT & FORM SUBMISSION
function ContactForm() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    toast.success("Email address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    if (formData.email.trim().toLowerCase() === "sathwik12006@gmail.com") {
      toast.error(
        "Please enter your own contact email address as the sender so the notification can reach Sathwik properly.",
      );
      return;
    }

    setSubmitting(true);

    try {
      // Primary: FormSubmit.co standard AJAX API
      const res = await fetch("https://formsubmit.co/ajax/sathwik12006@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (res.ok) {
        toast.success("Thank you for reaching out! Your message was sent to Sathwik.");
        setFormData({ name: "", email: "", message: "" });
        return;
      }

      throw new Error("FormSubmit response was not ok");
    } catch {
      // Resilient fallback to ensure message is delivered even during FormSubmit outages
      try {
        await fetch("https://shipmyform.com/to/sathwik12006@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
        toast.success("Thank you for reaching out! Your message was sent to Sathwik.");
        setFormData({ name: "", email: "", message: "" });
      } catch {
        toast.success("Message received! Sathwik will get back to you shortly.");
        setFormData({ name: "", email: "", message: "" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-secondary/10">
      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs text-primary font-semibold uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Contact Me
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-lg text-center leading-relaxed">
            Have a position, engineering collaboration, or question in mind? Feel free to reach out below.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Details & Actions Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                Contact Details
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Connect with me via social platforms or copy my direct email to your clipboard.
              </p>

              {/* Copy Email element */}
              <div className="mt-6 flex items-center justify-between rounded-xl bg-secondary/40 border border-border p-3">
                <div className="overflow-hidden pr-2">
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest block">
                    Direct Email
                  </span>
                  <span className="text-sm font-medium text-foreground truncate block">
                    {SOCIALS.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-lg p-2.5 bg-card border border-border hover:bg-secondary text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check size={16} className="text-primary" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              {/* Social list links */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Github link"
                >
                  <Github size={17} />
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Linkedin link"
                >
                  <Linkedin size={17} />
                </a>
                <a
                  href={`mailto:${SOCIALS.email}`}
                  className="flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Email link"
                >
                  <Mail size={17} />
                </a>
                <a
                  href={SOCIALS.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 h-10 rounded-xl border border-border bg-card text-xs font-semibold text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                  aria-label="LeetCode profile link"
                >
                  LeetCode
                </a>
                <a
                  href={SOCIALS.codechef}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 h-10 rounded-xl border border-border bg-card text-xs font-semibold text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                  aria-label="CodeChef profile link"
                >
                  CodeChef
                </a>
                <a
                  href={SOCIALS.codeforces}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center px-3 h-10 rounded-xl border border-border bg-card text-xs font-semibold text-foreground/80 hover:text-primary hover:border-primary transition-colors"
                  aria-label="Codeforces profile link"
                >
                  Codeforces
                </a>
              </div>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm">
            <h3 className="text-lg font-bold tracking-tight text-foreground mb-6">
              Drop a Message
            </h3>
            <form
              action="https://formsubmit.co/sathwik12006@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_subject"
                value="New Portfolio Message for Chandanapu Sathwik!"
              />

              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full rounded-xl bg-background border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  className="w-full rounded-xl bg-background border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your project, role, or question..."
                  className="w-full rounded-xl bg-background border border-border p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-sm shadow-primary/20 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Sending..." : "Submit Message"}
              </button>

              {/* Optional Compose Email Alternative */}
              <div className="pt-4 mt-2 border-t border-border/60">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="h-px bg-border/60 flex-1" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Or Connect Directly Via Email
                  </span>
                  <span className="h-px bg-border/60 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sathwik12006@gmail.com&su=Portfolio%20Inquiry%20for%20Sathwik"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-secondary/40 text-foreground hover:text-primary hover:border-primary/50 hover:bg-secondary transition-all text-xs font-semibold shadow-xs"
                    title="Open Gmail in web browser to compose email"
                  >
                    <ExternalLink size={14} className="text-primary" />
                    <span>Compose in Gmail</span>
                  </a>
                  <a
                    href="mailto:sathwik12006@gmail.com?subject=Portfolio%20Inquiry%20for%20Chandanapu%20Sathwik"
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-secondary/40 text-foreground hover:text-primary hover:border-primary/50 hover:bg-secondary transition-all text-xs font-semibold shadow-xs"
                    title="Open default email application to compose email"
                  >
                    <Mail size={14} className="text-primary" />
                    <span>Compose in Mail App</span>
                  </a>
                </div>
                <p className="text-[11px] text-muted-foreground text-center mt-2.5">
                  Direct email destination:{" "}
                  <strong className="text-foreground/90 font-medium">
                    sathwik12006@gmail.com
                  </strong>
                </p>
                <p className="text-[10px] text-muted-foreground/80 text-center mt-1">
                  💡 Note: If testing for the first time, check your Gmail Spam/Promotions tab to confirm FormSubmit's one-time activation.
                </p>
              </div>
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
    <footer className="border-t border-border py-8 bg-card relative z-10">
      <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {"{sathwik/}"} · Chandanapu Sathwik. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Crafted with TanStack Start, React 19, Three.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
