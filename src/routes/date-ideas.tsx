import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PrayerFlags } from "@/components/PrayerFlags";
import { Sparkles, Send } from "lucide-react";

export const Route = createFileRoute("/date-ideas")({
  head: () => ({
    meta: [
      { title: "Date Ideas — Us Together.. K and A" },
      { name: "description", content: "Tell us the vibe, and we'll find the perfect moment in Nepal." },
    ],
  }),
  component: DateIdeasPage,
});

const PROMPTS = [
  "Something romantic near Pokhara",
  "A spontaneous adventure day",
  "Cozy rainy day indoors",
  "Sunset, food, and slow",
  "An honest, local cultural moment",
];

function renderMarkdown(text: string) {
  // Lightweight markdown for ### headings and **bold**
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  lines.forEach((line, i) => {
    if (line.startsWith("### ")) {
      out.push(<h3 key={i} className="font-display text-2xl text-primary mt-5 mb-1">{line.replace(/^###\s*/, "")}</h3>);
    } else if (line.trim() === "") {
      out.push(<div key={i} className="h-2" />);
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      out.push(
        <p key={i} className="text-[15px] leading-relaxed text-foreground/90">
          {parts.map((p, j) =>
            p.startsWith("**") && p.endsWith("**") ? (
              <span key={j} className="font-semibold text-secondary">{p.slice(2, -2)}</span>
            ) : (
              <span key={j}>{p}</span>
            )
          )}
        </p>
      );
    }
  });
  return out;
}

function DateIdeasPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-10 pt-8 md:pt-14">
      <header className="text-center mb-6">
        <p className="font-script text-2xl text-primary">just for us</p>
        <h1 className="font-display text-4xl md:text-5xl mt-1">Plan a Date</h1>
        <p className="mt-3 text-muted-foreground font-script text-lg">
          Tell us the vibe, and we'll find the perfect moment.
        </p>
      </header>

      <PrayerFlags className="mb-8" />

      <div className="paper-card p-5 md:p-7 mb-6">
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex flex-col gap-3"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. something romantic near Pokhara, low energy, after the rain…"
            rows={3}
            className="text-base"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(input); }
            }}
          />
          <div className="flex flex-wrap gap-2">
            {PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                disabled={busy}
                className="text-xs px-3 py-1.5 rounded-full bg-accent hover:bg-accent/70 text-accent-foreground transition disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={busy || !input.trim()}>
              {busy ? <><Sparkles className="h-4 w-4 mr-1.5 animate-pulse" />Finding ideas…</> : <><Send className="h-4 w-4 mr-1.5" />Ask</>}
            </Button>
          </div>
        </form>
      </div>

      {error && (
        <div className="paper-card p-4 mb-6 border-destructive/40 text-sm text-destructive">
          Something went wrong reaching the AI. Please try again in a moment.
        </div>
      )}

      <div className="space-y-6">
        {messages.length === 0 && !busy && (
          <p className="text-center text-muted-foreground font-script text-lg">
            Your first idea is one prompt away.
          </p>
        )}
        {messages.map((m) => {
          const text = m.parts
            .filter((p) => p.type === "text")
            .map((p) => (p as { type: "text"; text: string }).text)
            .join("");
          if (m.role === "user") {
            return (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-secondary text-secondary-foreground px-4 py-2.5 text-sm">
                  {text}
                </div>
              </div>
            );
          }
          return (
            <article key={m.id} className="paper-card p-5 md:p-6">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Date ideas</span>
              </div>
              <div>{renderMarkdown(text)}</div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
