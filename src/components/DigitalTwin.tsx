"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, RotateCcw } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What's your QA experience?",
  "Why did you move from pharmacy to QA?",
  "What tools do you use daily?",
  "Are you open to new roles?",
];

export default function DigitalTwin() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    setError(null);
    const history = [...messages, { role: "user" as const, content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;
          const payload = trimmedLine.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;

          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch {
            // partial/malformed chunk, skip
          }
        }
      }

      if (!assistantText) {
        throw new Error("No response received — try again.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setMessages((m) => m.slice(0, -1));
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <section id="twin" className="relative py-24 sm:py-32 border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="04"
          label="Digital Twin"
          title="Ask my AI digital twin"
          description="Trained on my real career data. Ask about my QA experience, the pharmacist-to-QA pivot, my toolkit, or whether I'm open to new roles."
        />

        <Reveal delay={0.15} className="mt-12">
          <div className="rounded-2xl border border-border-strong bg-surface/50 overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-ink font-display text-sm font-bold">
                  LD
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">Lina&apos;s Digital Twin</div>
                  <div className="mono-label text-[10px] text-ink-faint flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    AI &middot; trained on real career data
                  </div>
                </div>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    setMessages([]);
                    setError(null);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-ink-faint transition-colors hover:text-ink"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              )}
            </div>

            <div ref={scrollRef} className="h-[420px] overflow-y-auto px-5 py-6 space-y-4">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <Sparkles className="h-6 w-6 text-accent" />
                  <p className="max-w-sm text-sm text-ink-muted">
                    Hi, I&apos;m an AI trained on Lina&apos;s real career data. Ask me anything
                    about her work, or pick a question below.
                  </p>
                  <div className="flex max-w-md flex-wrap justify-center gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        disabled={loading}
                        className="rounded-full border border-border-strong px-3.5 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-accent text-accent-ink"
                        : "border border-border bg-surface-2 text-ink"
                    }`}
                  >
                    {m.content || (loading && i === messages.length - 1 ? <TypingDots /> : "")}
                  </div>
                </div>
              ))}

              {error && <p className="text-center text-xs text-accent-pink">{error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-border px-4 py-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my experience, skills, or career switch…"
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-faint"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
