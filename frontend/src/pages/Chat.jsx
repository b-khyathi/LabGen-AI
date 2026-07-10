import { useState } from "react";
import { askAI } from "../services/api";

import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chatHistory"));

    if (saved) {
      setMessages(saved);
    } else {
      setMessages([
        {
          sender: "ai",
          text: "Hello! I'm LabGen AI. Ask me anything about programming, networking, DBMS, operating systems, experiments or viva questions.",
        },
      ]);
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;

    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [initialized, messages]);

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage = message;

    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    const historyForAI = [...messages, userMessage];

    // Show the user's message immediately
    setMessages(historyForAI);

    // Clear the input
    setMessage("");

    try {
      setLoading(true);

      const currentManual = localStorage.getItem("currentManual") || "";

      const data = await askAI(
        currentMessage,
        currentManual,
        historyForAI.slice(-8),
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.response,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleNewChat = () => {
    if (!window.confirm("Start a new chat?")) return;

    const welcome = {
      sender: "ai",
      text: "Hello! I'm LabGen AI. Ask me anything about programming, networking, DBMS, operating systems, experiments or viva questions.",
    };

    setMessages([welcome]);

    localStorage.removeItem("chatHistory");
    localStorage.removeItem("chatDraft");
    setMessage("");
  };

  useEffect(() => {
    const draft = localStorage.getItem("chatDraft");

    if (draft) {
      setMessage(draft);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatDraft", message);
  }, [message]);

  return (
    <div className="h-[calc(100vh-100px)]">
      <Card className="h-full bg-slate-900 border-slate-800 rounded-3xl flex flex-col">
        {/* Header */}

        <div className="border-b border-slate-800 p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">AI Assistant</h1>

            <p className="text-slate-400 mt-1">
              Ask questions about your experiments, theory, coding and
              troubleshooting.
            </p>
          </div>

          <Button onClick={handleNewChat} variant="outline">
            New Chat
          </Button>
        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-xl whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-violet-600 text-white"
                    : "bg-slate-800 text-white"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 rounded-2xl px-5 py-4 text-slate-300 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}

        <div className="border-t border-slate-800 p-5 flex gap-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask AI anything..."
            className="text-white"
          />

          <Button onClick={handleSend}>Send</Button>
        </div>
      </Card>
    </div>
  );
}
