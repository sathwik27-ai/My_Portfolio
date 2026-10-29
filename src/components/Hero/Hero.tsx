import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Hero3D } from "./Hero3D";
import { FloatingBackground3D } from "@/components/ui/FloatingBackground3D";
import dpAsset from "@/assets/dp.jpg";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "I build scalable full-stack applications & AI systems";

  // Typewriter effect (StrictMode-safe)
  useEffect(() => {
    let isMounted = true;
    let currentText = "";
    let index = 0;

    setTypedText("");

    const timer = setInterval(() => {
      if (!isMounted) return;
      if (index < fullText.length) {
        currentText += fullText.charAt(index);
        setTypedText(currentText);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 70);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [fullText]);

  // Handle cursor radial tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    // 1. Split Text Animation
    const heading = headingRef.current;
    if (heading) {
      const text = heading.innerText;
      heading.innerHTML = text
        .split("")
        .map((char) => {
          if (char === " ") return `<span class="inline-block">&nbsp;</span>`;
          return `<span class="letter inline-block translate-y-[32px] opacity-0">${char}</span>`;
        })
        .join("");

      gsap.to(".letter", {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.025,
        ease: "power2.out",
        delay: 0.1,
      });
    }

    // 2. Cinematic entry fade in for elements
    const timeline = gsap.timeline();

    timeline.fromTo(
      canvasWrapperRef.current,
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
      0.1,
    );

    timeline.fromTo(
      subtextRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      0.5,
    );

    if (buttonWrapperRef.current) {
      timeline.fromTo(
        buttonWrapperRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        0.65,
      );
    }

    if (badgesRef.current) {
      timeline.fromTo(
        badgesRef.current.children,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" },
        0.8,
      );
    }

    if (socialsRef.current) {
      timeline.fromTo(
        socialsRef.current.children,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" },
        0.95,
      );
    }

    // 3. ScrollTrigger animations
    const container = containerRef.current;
    const canvasWrapper = canvasWrapperRef.current;

    const scrollTriggerHero = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: true,
    });

    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      scale: 0.985,
      opacity: 0.65,
      ease: "none",
    });

    if (canvasWrapper) {
      gsap.to(canvasWrapper, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 40,
        ease: "none",
      });
    }

    return () => {
      scrollTriggerHero.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-73px)] w-full py-12 md:py-20 flex items-center overflow-hidden border-b border-border select-none group/hero bg-background text-foreground font-sans"
      style={
        {
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Floating 3D geometric crystals scoped strictly to Home page */}
      <FloatingBackground3D />

      {/* Subtle organic ambient backlight tracking mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 dark:block hidden"
        style={{
          background:
            "radial-gradient(circle 500px at var(--mouse-x) var(--mouse-y), rgba(167, 200, 173, 0.08) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700 pointer-events-none -z-10 dark:hidden block"
        style={{
          background:
            "radial-gradient(circle 500px at var(--mouse-x) var(--mouse-y), rgba(141, 183, 161, 0.12) 0%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 noise-grain opacity-[0.015] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-primary/5 blur-[100px] anim-float pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[100px] anim-pulse-soft pointer-events-none -z-10" />

      <div className="container mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-12 items-center relative z-10 w-full">
        {/* Left Column: Headline, Bio & Action Buttons */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left items-center lg:items-start text-center lg:text-left">
          {/* Badges */}
          <div
            ref={badgesRef}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              Full-Stack Developer
            </span>
          </div>

          {/* Main Name Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground"
          >
            Hi, I'm Sathwik
          </h1>

          {/* Subheading */}
          <h2 className="mt-4 text-base sm:text-xl font-bold tracking-widest text-foreground/80 uppercase">
            AI Developer & Competitive Programmer
          </h2>

          {/* Subtext description with Typewriter */}
          <p
            ref={subtextRef}
            className="mt-5 text-base sm:text-lg text-muted-foreground font-mono min-h-[30px]"
          >
            {typedText}
            <span className="animate-pulse font-bold text-primary ml-0.5">|</span>
          </p>

          {/* Action Buttons */}
          <div
            ref={buttonWrapperRef}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3.5"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:opacity-90 active:scale-95 px-6 py-3 text-sm font-bold text-primary-foreground transition-all shadow-md shadow-primary/20 cursor-pointer"
            >
              Explore Projects <ArrowRight size={16} />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-all cursor-pointer"
            >
              View Resume
            </a>
          </div>

          {/* Social Profiles */}
          <div
            ref={socialsRef}
            className="mt-7 flex items-center justify-center lg:justify-start gap-3"
          >
            <a
              href="https://github.com/sathwik27-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-all cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-all cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:sathwik12006@gmail.com"
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary transition-all cursor-pointer"
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Profile Image + Distinctive 3D Sculptural System */}
        <div
          ref={canvasWrapperRef}
          className="lg:col-span-5 flex items-center justify-center relative w-full h-[380px] lg:h-[520px]"
        >
          {/* Distinctive 3D kinetic sculptural object */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <Hero3D />
          </div>

          {/* Circular Profile Avatar in harmony with the 3D form */}
          <div className="relative z-20 flex items-center justify-center">
            {/* Subtle orbital rings matching the palette */}
            <div className="absolute w-[270px] h-[270px] rounded-full border border-dashed border-primary/30 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute w-[310px] h-[310px] rounded-full border border-dotted border-accent/30 animate-[spin_80s_linear_infinite_reverse] pointer-events-none" />

            {/* Profile Avatar Card */}
            <div className="relative w-56 h-56 md:w-68 md:h-68 rounded-full overflow-hidden border-4 border-card shadow-2xl bg-card/60 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={dpAsset}
                alt="Chandanapu Sathwik"
                className="w-full h-full object-cover filter saturate-105 contrast-[1.02] brightness-95"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
