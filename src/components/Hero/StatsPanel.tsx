import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, Terminal, Code2 } from "lucide-react";

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  variant?: "mint" | "peach" | "butter";
}

function StatCard({ label, value, suffix, icon, variant = "mint" }: StatItemProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Count up animation using GSAP
    if (!numRef.current) return;
    const obj = { num: 0 };
    gsap.to(obj, {
      num: value,
      duration: 1.4,
      delay: 0.25,
      ease: "power3.out",
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.innerText = Math.floor(obj.num).toLocaleString();
        }
      },
    });

    // Check prefers-reduced-motion
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Subtle micro-float
    if (cardRef.current && !reducedMotion) {
      gsap.to(cardRef.current, {
        y: "random(-3, 3)",
        duration: "random(3.5, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [value]);

  const variantStyles = {
    mint: "border-primary/30 bg-card hover:border-primary/50",
    peach: "border-accent/30 bg-card hover:border-accent/50",
    butter: "border-border bg-card hover:border-primary/40",
  }[variant];

  return (
    <div
      ref={cardRef}
      className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 select-none ${variantStyles}`}
    >
      <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
          <span ref={numRef}>0</span>
          <span className="text-primary">{suffix}</span>
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">
          {label}
        </div>
      </div>
    </div>
  );
}

export function StatsPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(
      panelRef.current.children,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out", delay: 0.7 },
    );
  }, []);

  return (
    <div
      ref={panelRef}
      className="grid gap-3 sm:grid-cols-3 w-full"
    >
      <StatCard
        label="LeetCode Rating"
        value={1600}
        suffix="+"
        icon={<Code2 size={17} />}
        variant="mint"
      />
      <StatCard
        label="CodeChef Star"
        value={1400}
        suffix="+ (2★)"
        icon={<Award size={17} />}
        variant="peach"
      />
      <StatCard
        label="Problems Solved"
        value={300}
        suffix="+"
        icon={<Terminal size={17} />}
        variant="butter"
      />
    </div>
  );
}
