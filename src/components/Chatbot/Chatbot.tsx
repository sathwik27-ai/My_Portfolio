import { useEffect } from "react";

const JOTFORM_SCRIPT_SRC = "https://cdn.jotfor.ms/agent/embedjs/01a168f8819870008111e03631151fbc7b8c/embed.js";

/**
 * JotformChatbot dynamically ensures the Jotform AI Agent script is mounted
 * and initializes the AI chatbot widget.
 */
export function Chatbot() {
  useEffect(() => {
    // Check if script is already present
    if (!document.querySelector(`script[src="${JOTFORM_SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = JOTFORM_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}

export const JotformChatbot = Chatbot;
export default Chatbot;
