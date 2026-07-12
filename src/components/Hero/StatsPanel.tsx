import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, Terminal, Code2 } from "lucide-react";

interface StatItemProps {
    label: string;
    value: number;
    suffix: string;
    icon: React.ReactNode;
}

function StatCard({ label, value, suffix, icon }: StatItemProps) {
    const numRef = useRef<HTMLSpanElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Count up animation using GSAP
        if (!numRef.current) return;
        const obj = { num: 0 };
        gsap.to(obj, {
            num: value,
            duration: 1.5,
            delay: 0.35,
            ease: "power3.out",
            onUpdate: () => {
                if (numRef.current) {
                    numRef.current.innerText = Math.floor(obj.num).toLocaleString();
                }
            }
        });

        // Floating micro-animation for cards
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            y: "random(-4, 4)",
            x: "random(-2, 2)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, [value]);

    return (
        <div
            ref={cardRef}
            className="premium-glass p-5 rounded-2xl border border-border/40 flex items-center gap-4 transition-all duration-300 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5 hover:translate-y-[-2px] select-none"
        >
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                {icon}
            </div>
            <div>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-gradient-primary">
                    <span ref={numRef}>0</span>
                    <span>{suffix}</span>
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 font-semibold">
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
        // Enter animation for the stats panel
        gsap.fromTo(
            panelRef.current.children,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out", delay: 0.8 }
        );
    }, []);

    return (
        <div
            ref={panelRef}
            className="grid gap-4 sm:grid-cols-3 w-full"
        >
            <StatCard
                label="LeetCode Rating"
                value={1630}
                suffix="+"
                icon={<Code2 size={18} />}
            />
            <StatCard
                label="CodeChef Star"
                value={1409}
                suffix=" (2★)"
                icon={<Award size={18} />}
            />
            <StatCard
                label="Solved Problems"
                value={300}
                suffix="+"
                icon={<Terminal size={18} />}
            />
        </div>
    );
}
