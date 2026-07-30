"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, X, Send, User, Calendar, RefreshCw, MessageSquareText } from "lucide-react";
import { site } from "@/lib/site-config";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  "What health conditions are treated?",
  "How does homeopathy treat skin & hair issues?",
  "Is homeopathy safe for children & infants?",
  "How to book a consultation?",
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Hello! 👋 I'm **${site.shortName} AI Assistant**. How can I help you with your health concerns or appointment inquiries today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await res.json();
      const aiText = data.text || "Sorry, I couldn't process your request right now. Please try again.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Apologies, there was a connection error. Please try again or reach us directly via WhatsApp/Phone.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Health Assistant"
        className="fixed bottom-24 right-24 z-50 flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-3.5 text-white shadow-xl hover:bg-emerald-800 md:bottom-6 md:right-24"
      >
        <div className="relative">
          <Bot className="h-6 w-6 text-emerald-100" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
          </span>
        </div>
        <span className="hidden font-medium text-sm sm:inline">Ask AI Assistant</span>
      </motion.button>

      {/* Chat Modal / Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-end p-2 sm:p-4 md:p-6 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex h-[88vh] max-h-[650px] w-full max-w-[440px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-emerald-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-emerald-800 to-teal-700 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <Sparkles className="h-5 w-5 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base leading-tight">AI Health Assistant</h3>
                    <p className="text-xs text-emerald-200 flex items-center gap-1.5 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Powered by Gemini AI
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  aria-label="Close Assistant"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        msg.sender === "user"
                          ? "bg-slate-800 text-white"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`max-w-[82%] space-y-1`}>
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-emerald-700 text-white rounded-br-none"
                            : "bg-white text-slate-800 border border-slate-200/80 shadow-xs rounded-bl-none"
                        }`}
                      >
                        {msg.text.split("\n").map((paragraph, idx) => (
                          <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <span
                        className={`block text-[10px] text-slate-400 ${
                          msg.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-bl-none bg-white border border-slate-200/80 px-4 py-3 shadow-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/60 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={loading}
                    className="inline-flex items-center gap-1 text-xs bg-white text-emerald-900 border border-emerald-200 rounded-full px-3 py-1.5 hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-2xs font-medium disabled:opacity-50"
                  >
                    <MessageSquareText className="h-3 w-3 text-emerald-600" />
                    {q}
                  </button>
                ))}
              </div>

              {/* Footer Input Form */}
              <div className="p-3 bg-white border-t border-slate-200 space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about symptoms, remedies, timings..."
                    disabled={loading}
                    className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-40 transition-all shadow-xs"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {/* Appointment CTA link inside chat */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 px-1">
                  <span>Educational AI guidance</span>
                  <a
                    href="#contact-form"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                  >
                    <Calendar className="h-3 w-3" />
                    Book Doctor Visit
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
