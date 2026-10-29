import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onComplete: () => void;
  theme?: "dark" | "light";
}

export function IntroScreen({ onComplete, theme: propTheme }: IntroScreenProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (propTheme) return propTheme === "dark";
    if (typeof document !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") !== "light"
      );
    }
    return true;
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (propTheme) {
      setIsDark(propTheme === "dark");
    }
  }, [propTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mq.matches);
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    // If user prefers reduced motion, complete quickly
    const timer = setTimeout(
      () => {
        onComplete();
      },
      reducedMotion ? 400 : 1900,
    );
    return () => clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={onComplete}
      className={`fixed inset-0 z-50 flex items-center justify-center select-none cursor-pointer transition-colors duration-300 ${
        isDark ? "bg-[#171C19] text-[#F1F0E8]" : "bg-[#FAF8F2] text-[#242923]"
      }`}
      aria-label="Intro screen - click to skip"
    >
      {/* Decorative ambient geometric accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,#A7C8AD_0%,transparent_65%)] opacity-[0.14] blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#A7C8AD]/20 rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-dashed border-[#8CCBC0]/25 -rotate-12" />
          </>
        ) : (
          <>
            {/* Multi-layered pastel blooms for vibrant, warm appearance */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,#FFD7C2_0%,transparent_60%)] opacity-65 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,#CDEBDD_0%,transparent_60%)] opacity-70 blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,#F5E6A8_0%,transparent_65%)] opacity-40 blur-xl" />
            
            {/* Elegant pastel orbital rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-[#8DB7A1]/40 rotate-45" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-dashed border-[#E98C75]/35 -rotate-15" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-dotted border-[#8DB7A1]/25 rotate-30" />
          </>
        )}
      </div>

      {/* Main Brand Focal Point */}
      <div className="text-center relative px-6 z-10">
        <motion.div
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { scale: 0.88, opacity: 0, y: 12 }
          }
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reducedMotion ? 0.25 : 0.95,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative select-none"
        >
          {/* Glowing halo directly behind the popping name */}
          <div
            className="absolute inset-0 -z-10 rounded-full blur-2xl pointer-events-none opacity-80"
            style={{
              background: isDark
                ? "radial-gradient(ellipse at center, rgba(167, 200, 173, 0.25) 0%, rgba(140, 203, 192, 0.15) 50%, transparent 80%)"
                : "radial-gradient(ellipse at center, rgba(233, 140, 117, 0.25) 0%, rgba(205, 235, 221, 0.4) 50%, transparent 80%)",
            }}
          />

          {/* Subtle signature badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest mb-4 border transition-all shadow-sm"
            style={{
              borderColor: isDark
                ? "rgba(167, 200, 173, 0.35)"
                : "rgba(141, 183, 161, 0.6)",
              backgroundColor: isDark
                ? "rgba(32, 40, 35, 0.8)"
                : "rgba(255, 255, 255, 0.85)",
              color: isDark ? "#A7C8AD" : "#244937",
              boxShadow: isDark
                ? "0 2px 10px rgba(0, 0, 0, 0.3)"
                : "0 2px 12px rgba(141, 183, 161, 0.18)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: isDark ? "#A7C8AD" : "#E98C75" }}
            />
            <span className="font-semibold">AI Developer & Engineer</span>
          </motion.div>

          {/* Attractive Pop Name */}
          <h1
            className="font-extrabold text-6xl sm:text-7xl md:text-8xl tracking-tight uppercase"
            style={{
              letterSpacing: "-0.035em",
              background: isDark
                ? "linear-gradient(135deg, #FFFFFF 15%, #E1EBE2 45%, #A7C8AD 75%, #8CCBC0 100%)"
                : "linear-gradient(135deg, #1C3B2B 0%, #2A563E 35%, #D46648 75%, #E98C75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: isDark
                ? "drop-shadow(0 4px 20px rgba(167, 200, 173, 0.2))"
                : "drop-shadow(0 3px 14px rgba(233, 140, 117, 0.22))",
            }}
          >
            Sathwik
          </h1>
        </motion.div>

        {/* Subtitle with refined typography & timing */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: reducedMotion ? 0.1 : 0.55, duration: 0.6 }}
          className="mt-4 text-xs sm:text-sm font-mono tracking-[0.28em] uppercase font-medium"
          style={{
            color: isDark ? "#BEC7BE" : "#556054",
          }}
        >
          Creative Developer Portfolio
        </motion.p>

        {/* Skip hint indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 text-[11px] font-mono tracking-wider opacity-50 hover:opacity-100 transition-opacity"
          style={{
            color: isDark ? "#A7C8AD" : "#38604C",
          }}
        >
          Click anywhere to skip →
        </motion.div>
      </div>
    </motion.div>
  );
}
