import React from "react";
import {
    MessageSquare,
    X,
    Send,
    User,
    Mic,
    MicOff,
    Volume2,
    VolumeX,
    History,
    Trash2
} from "lucide-react";
import dpAsset from "@/assets/dp.jpg";
import { useChat } from "./useChat";
import { toast } from "sonner";

interface ChatUIProps {
    onClose: () => void;
    chatController: ReturnType<typeof useChat>;
}

const CHIPS = [
    "What is your CGPA & education?",
    "Tell me about your projects.",
    "Which programming languages do you use?",
    "How can I contact or hire you?"
];

export function ChatUI({ onClose, chatController }: ChatUIProps) {
    const {
        messages,
        inputValue,
        setInputValue,
        isTyping,
        activeTab,
        setActiveTab,
        ttsEnabled,
        setTtsEnabled,
        isListening,
        toggleListening,
        handleSendMessage,
        clearChatLogs,
        messagesEndRef
    } = chatController;

    const handleSuggestClick = (chip: string) => {
        handleSendMessage(chip);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[520px] w-[350px] sm:w-[400px] rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-2xl overflow-hidden animate-pop-in duration-300">
            {/* Header Panel */}
            <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/40 dark:border-slate-850/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/5">
                        <img src={dpAsset} alt="Sathwik" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                            Sathwik Portfolio Guide
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </h3>

                    </div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-200 p-1.5 rounded-lg transition-colors cursor-pointer"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Tabs Panel */}
            <div className="px-4 py-2 border-b border-slate-200/40 dark:border-slate-850/40 flex items-center justify-between bg-slate-50/20 dark:bg-slate-900/10">
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab("chat")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeTab === "chat"
                            ? "bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100"
                            : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                            }`}
                    >
                        <MessageSquare size={13} />
                        Chat
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("history")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeTab === "history"
                            ? "bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100"
                            : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                            }`}
                    >
                        <History size={13} />
                        History
                    </button>
                </div>

                {/* TTS synthesiser controls */}
                {activeTab === "chat" && (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setTtsEnabled(!ttsEnabled);
                                if (!ttsEnabled) {
                                    toast.success("Text-to-voice feedback enabled!");
                                } else {
                                    window.speechSynthesis?.cancel();
                                    toast.info("Speaker audio deactivated.");
                                }
                            }}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${ttsEnabled
                                ? "bg-indigo-150/50 dark:bg-indigo-950/65 text-indigo-650 dark:text-indigo-400"
                                : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                                }`}
                            title={ttsEnabled ? "Disable Read Aloud" : "Enable Read Aloud"}
                        >
                            {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        </button>
                        <button
                            type="button"
                            onClick={clearChatLogs}
                            className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Clear Conversation"
                        >
                            <Trash2 size={15} />
                        </button>
                    </div>
                )}
            </div>

            {/* Body Area */}
            {activeTab === "chat" ? (
                <div className="flex-1 flex flex-col min-h-0 bg-white/30 dark:bg-transparent">
                    {/* Messages Scroll Layer */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div
                                    className={`rounded-full overflow-hidden flex items-center justify-center ${msg.sender === "user"
                                        ? "w-8 h-8 bg-primary/10 text-primary border border-primary/20"
                                        : "w-8 h-8 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40"
                                        }`}
                                >
                                    {msg.sender === "user" ? (
                                        <User size={14} />
                                    ) : (
                                        <img src={dpAsset} alt="Sathwik" className="w-full h-full object-cover" />
                                    )}
                                </div>

                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.sender === "user"
                                        ? "bg-primary text-primary-foreground font-semibold rounded-tr-none shadow-md shadow-primary/10"
                                        : "bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30 text-slate-800 dark:text-slate-200 rounded-tl-none"
                                        }`}
                                >
                                    <p className="whitespace-pre-line">{msg.content}</p>
                                    <span className="block text-[9px] text-right mt-1.5 opacity-65 font-mono">
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/40 flex items-center justify-center">
                                    <img src={dpAsset} alt="Sathwik" className="w-full h-full object-cover" />
                                </div>
                                <div className="rounded-2xl rounded-tl-none bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/30 px-4 py-4 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions Chips (only if last message is from bot and not typing) */}
                    {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === "assistant" && (
                        <div className="px-5 py-2 border-t border-slate-200/20 dark:border-slate-800/20 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto bg-slate-50/10 dark:bg-slate-900/5">
                            {CHIPS.map((chip, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleSuggestClick(chip)}
                                    className="px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-850/60 bg-white/90 dark:bg-slate-900/90 text-[10px] text-slate-600 dark:text-slate-450 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:text-primary dark:hover:text-primary transition-all cursor-pointer"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Controls */}
                    <div className="p-4 border-t border-slate-200/40 dark:border-slate-850/40 bg-slate-50/50 dark:bg-slate-900/30 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`p-2.5 rounded-xl transition-all cursor-pointer ${isListening
                                ? "bg-red-500 text-white animate-pulse"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-500 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-400"
                                }`}
                            title={isListening ? "Listening..." : "Voice input"}
                        >
                            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                        </button>

                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask Sathwik Portfolio Guide..."
                            className="flex-1 px-3 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-800 dark:text-slate-100"
                            disabled={isTyping}
                        />

                        <button
                            type="button"
                            onClick={() => handleSendMessage()}
                            disabled={isTyping || !inputValue.trim()}
                            className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/95 disabled:opacity-50 transition-all cursor-pointer"
                        >
                            <Send size={15} />
                        </button>
                    </div>
                </div>
            ) : (
                /* TAB: History View */
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3.5 bg-white/30 dark:bg-transparent">
                    {messages.length <= 1 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-650 p-6">
                            <History size={36} className="mb-2 opacity-50" />
                            <p className="text-xs font-semibold">No recent activity</p>
                            <p className="text-[10px] mt-1">Queries you ask Sathwik Portfolio Guide will stay cached here locally.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-slate-200/30 dark:border-slate-850/30">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest">
                                    Recent Interactions
                                </span>
                                <button
                                    type="button"
                                    onClick={clearChatLogs}
                                    className="text-[10px] text-red-500 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    Clear all
                                </button>
                            </div>

                            {messages
                                .filter((_, idx) => idx > 0) // Skip welcome message
                                .map((msg) => (
                                    <div
                                        key={msg.id}
                                        className="p-3 rounded-xl border border-slate-200/40 dark:border-slate-850/40 bg-white/60 dark:bg-slate-900/25 flex flex-col gap-1.5"
                                    >
                                        <div className="flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500">
                                            <span className="font-semibold uppercase tracking-wider block">
                                                {msg.sender === "user" ? "You Asked" : "Bot Responded"}
                                            </span>
                                            <span className="font-mono">{msg.timestamp}</span>
                                        </div>
                                        <p className="text-xs text-slate-700 dark:text-slate-350 line-clamp-3">
                                            {msg.content}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
