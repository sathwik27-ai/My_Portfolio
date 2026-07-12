import React, { useEffect } from "react";
import { motion } from "framer-motion";

export function IntroScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white select-none"
        >
            {/* Background glowing ambient grids */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Popping name Container */}
            <div className="text-center relative">
                <motion.div
                    initial={{ scale: 0.3, opacity: 0, filter: "blur(10px)" }}
                    animate={{
                        scale: [0.3, 1.25, 0.95, 1],
                        opacity: 1,
                        filter: "blur(0px)"
                    }}
                    transition={{
                        duration: 1.2,
                        times: [0, 0.45, 0.75, 1],
                        ease: "easeInOut"
                    }}
                    className="relative font-bold text-6xl md:text-8xl tracking-tight select-none uppercase pointer-events-none"
                >
                    {/* Speckled background glow behind name */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/25 to-purple-500/25 blur-3xl rounded-full scale-125 opacity-70 animate-pulse pointer-events-none" />

                    <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent drop-shadow-lg font-extrabold uppercase">
                        Sathwik
                    </span>
                </motion.div>

                {/* Small subtitle delay fade details */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-6 text-sm font-mono tracking-widest text-slate-400 uppercase"
                >
                    Developer Portfolio
                </motion.p>
            </div>
        </motion.div>
    );
}
