import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useChat } from "../_libs/ai-sdk__react.mjs";
import { D as DefaultChatTransport } from "../_libs/ai.mjs";
import { T as Textarea, B as Button } from "./textarea-BT5YAWXd.mjs";
import { P as PrayerFlags } from "./router-BQi69zSD.mjs";
import "../_libs/sonner.mjs";
import "../_libs/input-otp.mjs";
import { S as Sparkles, d as Send } from "../_libs/lucide-react.mjs";
import "../_libs/throttleit.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/eventsource-parser.mjs";
import "../_libs/zod.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
const PROMPTS = ["Something romantic near Pokhara", "A spontaneous adventure day", "Cozy rainy day indoors", "Sunset, food, and slow", "An honest, local cultural moment"];
function renderMarkdown(text) {
  const lines = text.split("\n");
  const out = [];
  lines.forEach((line, i) => {
    if (line.startsWith("### ")) {
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-primary mt-5 mb-1", children: line.replace(/^###\s*/, "") }, i));
    } else if (line.trim() === "") {
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }, i));
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] leading-relaxed text-foreground/90", children: parts.map((p, j) => p.startsWith("**") && p.endsWith("**") ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-secondary", children: p.slice(2, -2) }, j) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p }, j)) }, i));
    }
  });
  return out;
}
function DateIdeasPage() {
  const [input, setInput] = reactExports.useState("");
  const {
    messages,
    sendMessage,
    status,
    error
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat"
    })
  });
  const busy = status === "submitted" || status === "streaming";
  const send = (text) => {
    if (!text.trim() || busy) return;
    sendMessage({
      text
    });
    setInput("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-5 md:px-10 pt-8 md:pt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-2xl text-primary", children: "just for us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl mt-1", children: "Plan a Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground font-script text-lg", children: "Tell us the vibe, and we'll find the perfect moment." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerFlags, { className: "mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "paper-card p-5 md:p-7 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      send(input);
    }, className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: input, onChange: (e) => setInput(e.target.value), placeholder: "e.g. something romantic near Pokhara, low energy, after the rain…", rows: 3, className: "text-base", onKeyDown: (e) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          send(input);
        }
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: PROMPTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => send(p), disabled: busy, className: "text-xs px-3 py-1.5 rounded-full bg-accent hover:bg-accent/70 text-accent-foreground transition disabled:opacity-50", children: p }, p)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy || !input.trim(), children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-1.5 animate-pulse" }),
        "Finding ideas…"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4 mr-1.5" }),
        "Ask"
      ] }) }) })
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "paper-card p-4 mb-6 border-destructive/40 text-sm text-destructive", children: "Something went wrong reaching the AI. Please try again in a moment." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      messages.length === 0 && !busy && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground font-script text-lg", children: "Your first idea is one prompt away." }),
      messages.map((m) => {
        const text = m.parts.filter((p) => p.type === "text").map((p) => p.text).join("");
        if (m.role === "user") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[80%] rounded-2xl rounded-br-sm bg-secondary text-secondary-foreground px-4 py-2.5 text-sm", children: text }) }, m.id);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "paper-card p-5 md:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Date ideas" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: renderMarkdown(text) })
        ] }, m.id);
      })
    ] })
  ] });
}
export {
  DateIdeasPage as component
};
