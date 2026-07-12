import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Mic, MicOff, Volume2, VolumeX, History, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import dpAsset from "@/assets/dp.jpg";

interface Message {
    id: string;
    sender: "user" | "bot";
    text: string;
    timestamp: Date;
}

const SUGGESTIONS = [
    "What is your CGPA & education?",
    "Tell me about your projects.",
    "Which programming languages do you use?",
    "How can I contact or hire you?"
];

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"chat" | "history">("chat");
    const [showTooltip, setShowTooltip] = useState(true);

    // Fade out welcoming tooltip greeting after 6 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    // Also close tooltip instantly on interaction click
    useEffect(() => {
        if (isOpen) {
            setShowTooltip(false);
        }
    }, [isOpen]);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            sender: "bot",
            text: "Hi there! I am Sathwik's virtual developer assistant. Ask me anything about his skills, education, or projects!",
            timestamp: new Date()
        }
    ]);
    const [inputVal, setInputVal] = useState("");

    // Voice Capabilities API
    const [isListening, setIsListening] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const recognitionRef = useRef<any>(null);

    // History Capabilities
    const [history, setHistory] = useState<string[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("assistant_chat_history");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Speech Recognition API
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const rec = new SpeechRecognition();
                rec.continuous = false;
                rec.interimResults = false;
                rec.lang = "en-US";

                rec.onstart = () => setIsListening(true);
                rec.onend = () => setIsListening(false);
                rec.onerror = () => setIsListening(false);
                rec.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    setInputVal(text);
                    toast.success("Voice text captured!");
                };
                recognitionRef.current = rec;
            }
        }
    }, []);

    // Auto-scroll to lowest message in chat view
    useEffect(() => {
        if (activeTab === "chat") {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, activeTab]);

    // Voice recognition listener trigger
    const handleToggleListening = () => {
        if (!recognitionRef.current) {
            toast.error("Speech recognition is not supported in this browser.");
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    // Speaks out responses using browser's speechSynthesis
    const handleSpeak = (text: string) => {
        if (!ttsEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
    };

    // Reply generator logic
    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        // User message object
        const userMsg: Message = {
            id: `usr-${Date.now()}`,
            sender: "user",
            text,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputVal("");

        // Add query to local storage history
        const updatedHistory = [text, ...history.filter((h) => h !== text)].slice(0, 15);
        setHistory(updatedHistory);
        localStorage.setItem("assistant_chat_history", JSON.stringify(updatedHistory));

        // Simulate bot response with loader delay
        setTimeout(() => {
            let botResponseText = "";
            const cleanedText = text.toLowerCase();

            if (cleanedText.includes("proj") || cleanedText.includes("build")) {
                botResponseText = "Sathwik has built several high-impact projects including 'LuxeStyle E-Commerce' (a fashion marketplace with JWT auth), 'AgriChain' (a decentralized farm supply tracker), and 'GenSathi' (a civic duplicate complaint classifier).";
            } else if (cleanedText.includes("cgpa") || cleanedText.includes("edu") || cleanedText.includes("college") || cleanedText.includes("study")) {
                botResponseText = "Sathwik is a Computer Science and Engineering undergraduate student at VNRVJIET, Hyderabad. He holds an outstanding CGPA of 9.63!";
            } else if (cleanedText.includes("lang") || cleanedText.includes("skill") || cleanedText.includes("tech") || cleanedText.includes("dev")) {
                botResponseText = "Sathwik specializes in C++, Python, Java, JavaScript, and SQL. His frontend stack matches React, Next.js, and Tailwind CSS. He is also highly skilled in Competitive Programming.";
            } else if (cleanedText.includes("contact") || cleanedText.includes("hire") || cleanedText.includes("email") || cleanedText.includes("mail")) {
                botResponseText = "You can contact Sathwik directly via email at sathwik12006@gmail.com, or check out his LinkedIn profile linked in the header & footer. You can also submit the Contact Form on this page to email him!";
            } else {
                botResponseText = "That's interesting! Sathwik is highly focused on Machine Learning models, Web dev architectures and Competitive Programming. Ask me about his projects, CGPA or skills for more details!";
            }

            const botMsg: Message = {
                id: `bot-${Date.now()}`,
                sender: "bot",
                text: botResponseText,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, botMsg]);
            handleSpeak(botResponseText);
        }, 600);
    };

    const handleClearHistory = () => {
        setHistory([]);
        localStorage.removeItem("assistant_chat_history");
        toast.success("Chat history cleared!");
    };

    return (
        <>
            {/* Timed message popover above chatbot trigger */}
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl select-none"
                    >
                        {/* Custom bottom speech arrow */}
                        <div className="absolute bottom-[-5px] right-[22px] w-2.5 h-2.5 bg-white dark:bg-slate-900 border-r border-b border-slate-200 dark:border-slate-800 rotate-45" />
                        Hi! How can I assist you?
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Messenger Picture Trigger Button (Man with glasses) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full overflow-hidden border-2 border-indigo-500 dark:border-primary shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer bg-slate-900"
                aria-label="Toggle chat assistant"
            >
                {isOpen ? (
                    <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-white z-10">
                        <X size={20} />
                    </div>
                ) : null}
                <img
                    src={dpAsset}
                    alt="Sathwik Portfolio Guide"
                    className="w-full h-full object-cover"
                />
            </button>

            {/* Slide-Up Glassmorphic Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="fixed bottom-24 right-6 z-50 w-full max-w-[360px] sm:max-w-[400px] h-[500px] rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden font-sans text-slate-800 dark:text-slate-200"
                    >
                        {/* Header branding */}
                        <div className="px-5 py-4 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between bg-white/40 dark:bg-slate-900/40">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">Sathwik Portfolio Guide</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Navigation Tabs (Chat | History) & Audio Controls */}
                        <div className="px-4 py-2 border-b border-slate-200/40 dark:border-slate-800/40 flex items-center justify-between bg-slate-50/40 dark:bg-slate-900/25">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("chat")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-900 ${activeTab === "chat" ? "bg-slate-200/80 dark:bg-slate-800/80 text-foreground" : "text-muted-foreground"}`}
                                >
                                    <MessageCircle size={13} />
                                    Chat
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("history")}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hover:bg-slate-100 dark:hover:bg-slate-900 ${activeTab === "history" ? "bg-slate-200/80 dark:bg-slate-800/80 text-foreground" : "text-muted-foreground"}`}
                                >
                                    <History size={13} />
                                    History
                                </button>
                            </div>

                            {/* Speech Synthesis (TTS) Toggle */}
                            {activeTab === "chat" && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTtsEnabled(!ttsEnabled);
                                        if (!ttsEnabled) {
                                            toast.info("Text-to-voice speech feedback enabled!");
                                        } else {
                                            window.speechSynthesis?.cancel();
                                            toast.info("Speaker voice deactivated.");
                                        }
                                    }}
                                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${ttsEnabled ? "bg-indigo-100 dark:bg-indigo-950/65 text-indigo-600 dark:text-indigo-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
                                    title={ttsEnabled ? "Disable Read Aloud" : "Enable Read Aloud"}
                                >
                                    {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                </button>
                            )}
                        </div>

                        {/* TAB: Chat View */}
                        {activeTab === "chat" && (
                            <>
                                {/* Bubble list body */}
                                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                                        >
                                            <div className={`rounded-full overflow-hidden border flex items-center justify-center ${msg.sender === "user" ? "w-8 h-8 p-1.5 bg-primary/10 border-primary/20 text-primary animate-pop-in" : "w-8 h-8 p-0 bg-card border-border animate-pop-in"}`}>
                                                {msg.sender === "user" ? (
                                                    <User size={14} />
                                                ) : (
                                                    <img
                                                        src={dpAsset}
                                                        alt="Sathwik Portfolio Guide"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-gradient-to-r from-indigo-650 to-blue-650 text-white" : "bg-card border border-border text-slate-800 dark:text-slate-200"}`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Suggestions wrapper */}
                                {messages.length === 1 && (
                                    <div className="px-5 py-2 border-t border-slate-200/40 dark:border-slate-800/40 flex flex-wrap gap-2 bg-slate-50/50 dark:bg-slate-900/10">
                                        {SUGGESTIONS.map((sug) => (
                                            <button
                                                key={sug}
                                                onClick={() => handleSendMessage(sug)}
                                                className="text-[11px] text-left px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-350 dark:hover:border-slate-700 transition-colors cursor-pointer"
                                            >
                                                {sug}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Input Controls */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage(inputVal);
                                    }}
                                    className="p-4 border-t border-slate-200/60 dark:border-slate-800/60 flex gap-2 items-center bg-white/40 dark:bg-slate-900/40"
                                >
                                    {/* Speech to Text Microphone */}
                                    <button
                                        type="button"
                                        onClick={handleToggleListening}
                                        className={`p-2 rounded-full cursor-pointer transition-colors ${isListening ? "bg-red-500/20 text-red-500 animate-pulse border border-red-500/30" : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500"}`}
                                        title={isListening ? "Listening... click to stop" : "Speak text"}
                                    >
                                        {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                                    </button>

                                    <input
                                        type="text"
                                        value={inputVal}
                                        onChange={(e) => setInputVal(e.target.value)}
                                        placeholder={isListening ? "Speak now..." : "Ask Sathwik Portfolio Guide..."}
                                        className="flex-1 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary w-full text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                                    />
                                    <button
                                        type="submit"
                                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-500/10"
                                    >
                                        <Send size={14} />
                                    </button>
                                </form>
                            </>
                        )}

                        {/* TAB: History Logs View */}
                        {activeTab === "history" && (
                            <div className="flex-1 flex flex-col p-5 bg-card overflow-hidden">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xs font-mono font-bold tracking-wider text-muted-foreground uppercase">Query Logs</h4>
                                    {history.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleClearHistory}
                                            className="text-[10px] text-red-500 hover:underline cursor-pointer"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                                    {history.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground text-xs font-mono">
                                            No query logs registered yet. Type or speak queries in the Chat tab!
                                        </div>
                                    ) : (
                                        history.map((hist, idx) => (
                                            <button
                                                key={`${hist}-${idx}`}
                                                onClick={() => {
                                                    setActiveTab("chat");
                                                    handleSendMessage(hist);
                                                }}
                                                className="w-full text-left p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-border rounded-xl hover:border-primary transition-all truncate block cursor-pointer"
                                            >
                                                {hist}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
