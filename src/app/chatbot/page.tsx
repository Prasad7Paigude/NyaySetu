"use client";
import React, { useState, useRef, useEffect } from "react";
import DashNavbar from "@/components/navbar/DashNavbar";
import { IconSend, IconUser, IconRobot } from "@tabler/icons-react";
import { MagicCard } from "@/components/ui/magic-card"

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your legal AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call your Python API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: messages.slice(-5), // Send last 5 messages for context
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
        <DashNavbar />
        <MagicCard>
      <div className="min-h-screen bg-black pt-20 pb-4 px-4">
        <div className="max-w-5xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
          {/* Header */}
          <div className="bg-[#171717] rounded-t-2xl p-6 border-b border-gray-800">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Legal AI Assistant
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Ask me anything about Indian law, IPC sections, or legal procedures
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 bg-[#171717] overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
                    <IconRobot size={20} className="text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  <p className="text-sm md:text-base whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {message.sender === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <IconUser size={20} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center">
                  <IconRobot size={20} className="text-white" />
                </div>
                <div className="bg-gray-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-[#171717] rounded-b-2xl p-4 border-t border-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about IPC sections, legal procedures, or any legal question..."
                disabled={loading}
                rows={1}
                className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 
                         resize-none disabled:opacity-50 disabled:cursor-not-allowed
                         placeholder-gray-500 text-sm md:text-base"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                title="Send message"
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-700 
                         disabled:cursor-not-allowed text-white rounded-xl px-6 py-3
                         transition-colors flex items-center justify-center
                         flex-shrink-0"
              >
                <IconSend size={20} />
                <span className="sr-only">Send message</span>
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
      </MagicCard>
    </>
  );
};

export default ChatbotPage;