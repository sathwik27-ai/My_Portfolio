import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Hero3D } from "./Hero3D";
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
    const fullText = "I build scalable full-stack applications";

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
        }, 80);

        return () => {
            isMounted = false;
            clearInterval(timer);
        };
    }, [fullText]);

    // Handle cursor radial glow tracking
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
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
                    return `<span class="letter inline-block translate-y-[40px] opacity-0">${char}</span>`;
                })
                .join("");

            // GSAP split letter entry animation
            gsap.to(".letter", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: "back.out(1.6)",
                delay: 0.15
            });
        }

        // 2. Cinematic entry fade in for rest elements
        const timeline = gsap.timeline();

        timeline.fromTo(
            canvasWrapperRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
            0.1
        );

        timeline.fromTo(
            subtextRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            0.65
        );

        if (buttonWrapperRef.current) {
            timeline.fromTo(
                buttonWrapperRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
                0.8
            );
        }

        if (badgesRef.current) {
            timeline.fromTo(
                badgesRef.current.children,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out" },
                1.0
            );
        }

        if (socialsRef.current) {
            timeline.fromTo(
                socialsRef.current.children,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
                1.2
            );
        }

        // 3. ScrollTrigger animations (parallax and shrink depth)
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
                scrub: true
            },
            scale: 0.98,
            opacity: 0.5,
            ease: "none"
        });

        if (canvasWrapper) {
            gsap.to(canvasWrapper, {
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                y: 50,
                ease: "none"
            });
        }

        return () => {
            scrollTriggerHero.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[calc(100vh-73px)] w-full py-12 md:py-20 flex items-center overflow-hidden border-b border-border/40 select-none group/hero bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans"
            style={{
                "--mouse-x": `${mousePos.x}px`,
                "--mouse-y": `${mousePos.y}px`
            } as React.CSSProperties}
        >
            {/* Background Depth System (Glowing Navy/Purple in Dark, Subtle Lavender in Light) */}
            <div
                className="absolute inset-0 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 dark:block hidden"
                style={{
                    background: "radial-gradient(circle 500px at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.12) 0%, transparent 100%)"
                }}
            />
            <div
                className="absolute inset-0 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 dark:hidden block"
                style={{
                    background: "radial-gradient(circle 500px at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.05) 0%, transparent 100%)"
                }}
            />

            <div className="absolute inset-0 noise-grain opacity-[0.015] pointer-events-none -z-10" />
            <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px] anim-float pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 dark:bg-accent/5 blur-[120px] animate-pulse-soft pointer-events-none -z-10" />

            <div className="container mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-12 items-center relative z-10 w-full">
                {/* Left Column: Texts and Data details */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left items-center lg:items-start text-center lg:text-left">
                    {/* Badge */}
                    <div
                        ref={badgesRef}
                        className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6"
                    >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[11px] text-primary font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                            FullStack Developer
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card/65 text-[11px] text-muted-foreground font-semibold">
                            Data Science Student
                        </span>
                    </div>

                    {/* Heading */}
                    <h1
                        ref={headingRef}
                        className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight"
                    >
                        Hi, I'm Sathwik
                    </h1>

                    {/* Subheading */}
                    <h2
                        className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-slate-700 dark:text-slate-300 uppercase tracking-widest"
                    >
                        FullStack Developer | Data Science Student
                    </h2>

                    {/* Subtext description with Typewriter */}
                    <p
                        ref={subtextRef}
                        className="mt-6 text-lg sm:text-xl text-muted-foreground font-mono min-h-[30px]"
                    >
                        {typedText}
                        <span className="animate-pulse font-bold text-primary ml-0.5">|</span>
                    </p>

                    {/* Button actions */}
                    <div
                        ref={buttonWrapperRef}
                        className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
                    >
                        <a
                            href="#projects"
                            className="relative overflow-hidden group/btn rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 px-6 py-3.5 text-sm font-bold text-white transition-all cursor-pointer"
                        >
                            <span className="flex items-center gap-1.5">
                                Explore Projects <ArrowRight size={16} />
                            </span>
                        </a>

                        <a
                            href="/resume.pdf"
                            download="Sathwik_Resume.pdf"
                            className="relative overflow-hidden group/btn rounded-full border-2 border-slate-300 dark:border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                            Download Resume
                        </a>
                    </div>

                    {/* Social Icons Rounded with Hover Glow */}
                    <div
                        ref={socialsRef}
                        className="mt-8 flex items-center justify-center lg:justify-start gap-4"
                    >
                        <a
                            href="https://github.com/sathwik27-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-primary hover:border-blue-600 dark:hover:border-primary hover:scale-110 hover:shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/chandanapu-sathwik-20b54234a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-primary hover:border-blue-600 dark:hover:border-primary hover:scale-110 hover:shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:sathwik12006@gmail.com"
                            className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-primary hover:border-blue-600 dark:hover:border-primary hover:scale-110 hover:shadow-md hover:shadow-indigo-500/20 transition-all cursor-pointer"
                        >
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                {/* Right Column: Profile Image + Floating Neural Object */}
                <div
                    ref={canvasWrapperRef}
                    className="lg:col-span-5 flex items-center justify-center relative w-full h-[350px] lg:h-[500px]"
                >
                    {/* Interactive 3D Neural web floating behind */}
                    <div className="absolute inset-0 z-10 opacity-70 dark:opacity-85 pointer-events-none">
                        <Hero3D />
                    </div>

                    {/* Circular Profile Image (Glass border, premium scale) + Animated Orbit & Glow Background */}
                    <div className="relative z-20 flex items-center justify-center">
                        {/* Orbit rings matching styling elements */}
                        <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-indigo-500/20 dark:border-primary/25 animate-[spin_50s_linear_infinite] pointer-events-none" />
                        <div className="absolute w-[320px] h-[320px] rounded-full border border-dotted border-purple-500/15 dark:border-accent/15 animate-[spin_70s_linear_infinite_reverse] pointer-events-none" />

                        {/* Glowing radial colored backing */}
                        <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-indigo-600/25 via-blue-500/10 to-purple-600/25 opacity-40 dark:opacity-50 blur-2xl animate-pulse pointer-events-none" />

                        {/* Profile Image container card */}
                        <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white/40 dark:border-slate-800/40 shadow-2xl bg-white/10 dark:bg-slate-900/10 backdrop-blur-[3px] group-hover/hero:scale-105 transition-transform duration-500">
                            <img
                                src={dpAsset}
                                alt="Sathwik"
                                className="w-full h-full object-cover filter saturate-105 contrast-[1.02] brightness-95"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
