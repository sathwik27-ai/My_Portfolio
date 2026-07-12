import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dpAsset from "@/assets/dp.jpg";
import { useChat } from "./useChat";
import { ChatUI } from "./ChatUI";

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const chatController = useChat();

    // Show tooltip after 2s of initial visit, auto fade after 6s (total 8s from load)
    useEffect(() => {
        const showTimer = setTimeout(() => {
            if (!isOpen) {
                setShowTooltip(true);
            }
        }, 2000);

        const hideTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 8000);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        setShowTooltip(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 select-none">
            {/* Chat UI Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="origin-bottom-right"
                    >
                        <ChatUI onClose={() => setIsOpen(false)} chatController={chatController} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trigger Area with Greeting Balloon */}
            <div className="relative flex items-center justify-end">
                {/* Timed Speech Tooltip Balloon */}
                <AnimatePresence>
                    {showTooltip && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 15, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 10, scale: 0.9 }}
                            className="absolute right-16 pr-1 whitespace-nowrap pointer-events-none"
                        >
                            <div className="bg-primary text-primary-foreground text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg relative flex items-center">
                                {/* Speech tail */}
                                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-primary rotate-45" />
                                Hi! How can I assist you?
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Bubble Badge */}
                <motion.button
                    type="button"
                    onClick={handleToggle}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 dark:border-primary/60 bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center cursor-pointer relative group"
                >
                    {isOpen ? (
                        <X size={22} className="text-slate-800 dark:text-slate-100 relative z-10" />
                    ) : (
                        <div className="w-full h-full relative">
                            <img
                                src={dpAsset}
                                alt="Sathwik Bot Guide"
                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-20"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <MessageSquare size={20} className="text-primary" />
                            </div>
                        </div>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
export default Chatbot;
