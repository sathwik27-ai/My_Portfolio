import { useState, useEffect, useRef } from "react";
import { chatWithLLM } from "./chatService";
import { toast } from "sonner";

export interface Message {
    id: string;
    sender: "user" | "assistant";
    content: string;
    timestamp: string;
}

const DEFAULT_MESSAGES: Message[] = [
    {
        id: "1",
        sender: "assistant",
        content: "Hi there! I am Sathwik's virtual developer assistant. Ask me anything about his skills, education, or projects!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
];

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [activeTab, setActiveTab] = useState<"chat" | "history">("chat");
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Speech recognition hook
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition =
                (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const rec = new SpeechRecognition();
                rec.continuous = false;
                rec.interimResults = false;
                rec.lang = "en-US";

                rec.onstart = () => {
                    setIsListening(true);
                };

                rec.onend = () => {
                    setIsListening(false);
                };

                rec.onerror = (event: any) => {
                    console.error("Speech Recognition Error:", event.error);
                    setIsListening(false);
                    toast.error("Audio recording failed, please try again.");
                };

                rec.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    if (transcript.trim()) {
                        setInputValue(transcript);
                    }
                };

                recognitionRef.current = rec;
            }
        }
    }, []);

    // Hydrate from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("sathwik_chat_history");
            if (saved) {
                try {
                    setMessages(JSON.parse(saved));
                } catch {
                    setMessages(DEFAULT_MESSAGES);
                }
            } else {
                setMessages(DEFAULT_MESSAGES);
            }
        }
    }, []);

    // Sync to localStorage
    const saveMessages = (msgs: Message[]) => {
        setMessages(msgs);
        if (typeof window !== "undefined") {
            localStorage.setItem("sathwik_chat_history", JSON.stringify(msgs));
        }
    };

    // Autoscroll
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Speech TTS
    const speakText = (text: string) => {
        if (!ttsEnabled || typeof window === "undefined") return;
        window.speechSynthesis?.cancel();
        const cleanText = text.replace(/[*#]/g, ""); // Strip markdown headings
        const utterance = new SpeechSynthesisUtterance(cleanText);
        window.speechSynthesis?.speak(utterance);
    };

    // Toggle voice recognition
    const toggleListening = () => {
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

    // Submit trigger
    const handleSendMessage = async (textToSend?: string) => {
        const text = (textToSend || inputValue).trim();
        if (!text) return;

        if (!textToSend) {
            setInputValue("");
        }

        const newUserMsg: Message = {
            id: crypto.randomUUID(),
            sender: "user",
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedMsgs = [...messages, newUserMsg];
        saveMessages(updatedMsgs);
        setIsTyping(true);

        try {
            // Map Message schema to ChatMessage schema for OpenAI service mapping
            const historyContext = updatedMsgs.map(m => ({
                role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
                content: m.content
            }));

            const botTextReply = await chatWithLLM({ data: historyContext });

            const newBotMsg: Message = {
                id: crypto.randomUUID(),
                sender: "assistant",
                content: botTextReply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            saveMessages([...updatedMsgs, newBotMsg]);
            speakText(botTextReply);
        } catch (e) {
            console.error(e);
            toast.error("Failed to generate response. Try again.");
        } finally {
            setIsTyping(false);
        }
    };

    // Clear history logs
    const clearChatLogs = () => {
        saveMessages(DEFAULT_MESSAGES);
        window.speechSynthesis?.cancel();
        toast.info("Conversation logs cleared.");
    };

    return {
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
    };
}
