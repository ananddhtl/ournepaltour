import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useApp, P as PrayerFlags, C as CATEGORY_STYLES } from "./router-Duow2dwg.mjs";
import "../_libs/sonner.mjs";
import "../_libs/input-otp.mjs";
import { P as Plus, S as Sparkles, C as CalendarDays, M as MapPin, I as Image } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/ai.mjs";
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
import "../_libs/ai-sdk__openai-compatible.mjs";
const ARRIVAL = /* @__PURE__ */ new Date("2026-06-28T00:00:00");
function useCountdown(target) {
  const [now, setNow] = reactExports.useState(() => /* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 864e5);
  const h = Math.floor(diff / 36e5 % 24);
  const m = Math.floor(diff / 6e4 % 60);
  const s = Math.floor(diff / 1e3 % 60);
  return {
    d,
    h,
    m,
    s,
    arrived: diff === 0
  };
}
function HomePage() {
  const {
    events,
    memories,
    loveNote,
    setLoveNote
  } = useApp();
  const cd = useCountdown(ARRIVAL);
  const upcoming = [...events].filter((e) => new Date(e.date) >= new Date((/* @__PURE__ */ new Date()).toDateString())).sort((a, b) => a.date.localeCompare(b.date))[0];
  const featured = memories.length > 0 ? memories[Math.floor(Math.random() * memories.length)] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5 md:px-10 pt-8 md:pt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerFlags, { className: "mb-6 -mt-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-2xl text-primary", children: "welcome to" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl mt-1", children: "Us Together.. K and A" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground max-w-xl mx-auto", children: "A private place for K and A — two months of mountains, lakes, prayer flags, and small moments we'll want to remember forever." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card p-6 md:p-10 text-center mb-8 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-xl text-secondary mb-1", children: cd.arrived ? "You're here ✨" : "until you arrive…" }),
      !cd.arrived ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-4 md:gap-8 mt-4 font-display", children: [{
        v: cd.d,
        l: "days"
      }, {
        v: cd.h,
        l: "hours"
      }, {
        v: cd.m,
        l: "minutes"
      }, {
        v: cd.s,
        l: "seconds"
      }].map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl md:text-6xl text-primary tabular-nums", children: String(u.v).padStart(2, "0") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs md:text-sm uppercase tracking-widest text-muted-foreground mt-1", children: u.l })
      ] }, u.l)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display mt-3", children: "The story begins today." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm text-muted-foreground", children: "June 28, 2026 · Tribhuvan International, Kathmandu" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "md:col-span-2 paper-card p-6 tape", style: {
        background: "oklch(0.96 0.05 80)",
        transform: "rotate(-0.6deg)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-script text-xl text-foreground/80", children: "a little note for us today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: loveNote, onChange: (e) => setLoveNote(e.target.value), rows: 3, className: "mt-2 w-full bg-transparent resize-none font-script text-2xl md:text-3xl leading-snug text-espresso focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card p-5 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg", children: "Quick add" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/plan", className: "flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-3 py-2.5 text-sm hover:opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New event"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/memories", className: "flex items-center gap-2 rounded-xl bg-secondary text-secondary-foreground px-3 py-2.5 text-sm hover:opacity-90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New memory"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/date-ideas", className: "flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
          " Ask for a date idea"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest", children: "Next up" })
        ] }),
        upcoming ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `inline-block text-[11px] px-2 py-0.5 rounded-full ${CATEGORY_STYLES[upcoming.category].bg} ${CATEGORY_STYLES[upcoming.category].text}`, children: [
            CATEGORY_STYLES[upcoming.category].emoji,
            " ",
            upcoming.category
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mt-2", children: upcoming.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            upcoming.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 mt-1", children: new Date(upcoming.date).toLocaleDateString(void 0, {
            weekday: "long",
            month: "long",
            day: "numeric"
          }) }),
          upcoming.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm font-script text-foreground/80", children: upcoming.notes }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/plan", className: "mt-4 inline-block text-sm text-primary hover:underline", children: "See the full plan →" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground font-script", children: "Nothing planned yet — that's what adventures are for." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest", children: "Memory of the day" })
        ] }),
        featured ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          featured.photos[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: featured.photos[0], alt: featured.title, className: "w-full h-44 object-cover rounded-xl mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: featured.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            featured.date,
            " · ",
            featured.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-script text-foreground/80 line-clamp-3", children: featured.note })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground font-script", children: "Your memories are waiting to be made. Start June 28. 🏔️" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerFlags, { className: "mt-12", count: 22 })
  ] });
}
export {
  HomePage as component
};
