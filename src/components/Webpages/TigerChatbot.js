import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TigerIcon from "../../assests/Tiger.png";

export default function TigerChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Poeage Tiger. Ask me anything about Poeage Technology." }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const currentInput = input;
    setInput("");

    try {
      const history = [...messages, userMsg]
        .slice(-20)
        .map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          userMessage: currentInput,
        }),
      });

      const data = await resp.json().catch(() => ({}));
      const replyText =
        data && data.ok && typeof data.reply === "string"
          ? data.reply
          : "Sorry — I couldn't reach the AI server. Please try again in a moment.";

      setMessages((prev) => [...prev, { from: "bot", text: replyText }]);
    } catch (_e) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry — something went wrong while contacting the AI server. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-black shadow-xl flex items-center justify-center border"
      >
        <img src={TigerIcon} alt="Chat" className="w-12 h-12 rounded-md" />
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[95%] sm:w-[360px] h-[500px] bg-white/80 backdrop-blur-xl border rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 flex items-center gap-3">
              <img
                src={TigerIcon}
                alt="Poeage Tiger assistant"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div className="flex-1">
                <p className="font-semibold">Poeage Tiger</p>
                <p className="text-xs opacity-80">Online • AI Assistant</p>
              </div>

              <button onClick={() => setOpen(false)} className="text-white text-lg">
                ✕
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                      msg.from === "user"
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-white shadow border rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* TYPING INDICATOR */}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="bg-white border px-3 py-2 rounded-xl shadow text-sm">
                    <span className="animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* QUICK ACTIONS */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto">
              {["Services", "AI Solutions", "Hire Developers", "Internship", "Contact"].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs px-3 py-1 rounded-full border bg-gray-100 hover:bg-indigo-100"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-3 border-t flex gap-2 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                onClick={sendMessage}
                className="bg-indigo-600 text-white px-4 rounded-xl hover:bg-indigo-700"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}