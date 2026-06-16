import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { L as Lt, j as jt } from "../_libs/input-otp.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { s as streamText, c as convertToModelMessages } from "../_libs/ai.mjs";
import { c as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import { f as House, e as CalendarDays, I as Image, S as Sparkles, M as MapPin, g as Minus } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
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
const appCss = "/assets/styles-CrsFP1dM.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
if (typeof globalThis.WebSocket === "undefined") {
  const { default: ws } = await import("../_libs/ws.mjs");
  globalThis.WebSocket = ws;
}
const supabaseUrl = "https://mrqpjoitzokbadnzwwka.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycXBqb2l0em9rYmFkbnp3d2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MzM3MDgsImV4cCI6MjA5NzEwOTcwOH0.tTUHPvFJ3qcoGss96tlsOVZZiA7xKaJr6dZJlEu4j2Y";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
async function uploadPhoto(file, folder) {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("photos").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return data.publicUrl;
}
function dbToEvent(row) {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location ?? "",
    category: row.category,
    notes: row.notes ?? void 0,
    photo: row.photo_url ?? void 0,
    status: row.status,
    lat: row.lat ?? void 0,
    lng: row.lng ?? void 0
  };
}
function dbToMemory(row) {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location ?? "",
    note: row.note ?? "",
    photos: row.photo_urls ?? [],
    lat: row.lat ?? void 0,
    lng: row.lng ?? void 0
  };
}
const AppCtx = reactExports.createContext(null);
function AppProvider({ children }) {
  const [events, setEvents] = reactExports.useState([]);
  const [memories, setMemories] = reactExports.useState([]);
  const [loveNote, setLoveNoteState] = reactExports.useState("Today I'm excited because…");
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function fetchAll() {
      try {
        const [eventsRes, memoriesRes, noteRes] = await Promise.all([
          supabase.from("events").select("*").order("date"),
          supabase.from("memories").select("*").order("created_at", { ascending: false }),
          supabase.from("love_note").select("content").eq("id", 1).single()
        ]);
        if (eventsRes.data) setEvents(eventsRes.data.map(dbToEvent));
        if (memoriesRes.data) setMemories(memoriesRes.data.map(dbToMemory));
        if (noteRes.data) setLoveNoteState(noteRes.data.content);
      } catch {
        toast.error("Could not connect to database.");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);
  reactExports.useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      supabase.from("love_note").update({ content: loveNote }).eq("id", 1);
    }, 1e3);
    return () => clearTimeout(t);
  }, [loveNote, loading]);
  const value = {
    events,
    memories,
    loveNote,
    loading,
    setLoveNote: setLoveNoteState,
    addEvent: (e) => {
      const tempId = crypto.randomUUID();
      const optimistic = { ...e, id: tempId, status: e.status ?? "planned" };
      setEvents((prev) => [...prev, optimistic].sort((a, b) => a.date.localeCompare(b.date)));
      supabase.from("events").insert({
        title: e.title,
        date: e.date,
        location: e.location || null,
        category: e.category,
        notes: e.notes || null,
        photo_url: e.photo || null,
        status: e.status ?? "planned",
        lat: e.lat ?? null,
        lng: e.lng ?? null
      }).select().single().then(({ data, error }) => {
        if (error) {
          toast.error("Failed to save event.");
          setEvents((prev) => prev.filter((ev) => ev.id !== tempId));
          return;
        }
        setEvents((prev) => prev.map((ev) => ev.id === tempId ? dbToEvent(data) : ev));
      });
    },
    updateEvent: (id, patch) => {
      setEvents((prev) => prev.map((ev) => ev.id === id ? { ...ev, ...patch } : ev));
      const dbPatch = {};
      if (patch.title !== void 0) dbPatch.title = patch.title;
      if (patch.date !== void 0) dbPatch.date = patch.date;
      if (patch.location !== void 0) dbPatch.location = patch.location;
      if (patch.category !== void 0) dbPatch.category = patch.category;
      if (patch.notes !== void 0) dbPatch.notes = patch.notes;
      if (patch.photo !== void 0) dbPatch.photo_url = patch.photo;
      if (patch.status !== void 0) dbPatch.status = patch.status;
      if (patch.lat !== void 0) dbPatch.lat = patch.lat;
      if (patch.lng !== void 0) dbPatch.lng = patch.lng;
      supabase.from("events").update(dbPatch).eq("id", id).then(({ error }) => {
        if (error) toast.error("Failed to update event.");
      });
    },
    deleteEvent: (id) => {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      supabase.from("events").delete().eq("id", id).then(({ error }) => {
        if (error) toast.error("Failed to delete event.");
      });
    },
    addMemory: (m) => {
      const tempId = crypto.randomUUID();
      const optimistic = { ...m, id: tempId };
      setMemories((prev) => [optimistic, ...prev]);
      supabase.from("memories").insert({
        title: m.title,
        date: m.date,
        location: m.location || null,
        note: m.note || null,
        photo_urls: m.photos,
        lat: m.lat ?? null,
        lng: m.lng ?? null
      }).select().single().then(({ data, error }) => {
        if (error) {
          toast.error("Failed to save memory.");
          setMemories((prev) => prev.filter((mem) => mem.id !== tempId));
          return;
        }
        setMemories((prev) => prev.map((mem) => mem.id === tempId ? dbToMemory(data) : mem));
      });
    },
    deleteMemory: (id) => {
      setMemories((prev) => prev.filter((m) => m.id !== id));
      supabase.from("memories").delete().eq("id", id).then(({ error }) => {
        if (error) toast.error("Failed to delete memory.");
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppCtx.Provider, { value, children });
}
function useApp() {
  const ctx = reactExports.useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
const CATEGORY_STYLES = {
  Adventure: { bg: "bg-[oklch(0.92_0.06_60)]", text: "text-[oklch(0.45_0.12_40)]", ring: "ring-[oklch(0.7_0.12_40)]", emoji: "⛰️" },
  Romantic: { bg: "bg-[oklch(0.93_0.06_15)]", text: "text-[oklch(0.45_0.15_15)]", ring: "ring-[oklch(0.7_0.15_15)]", emoji: "💖" },
  Food: { bg: "bg-[oklch(0.93_0.07_80)]", text: "text-[oklch(0.45_0.12_70)]", ring: "ring-[oklch(0.75_0.12_75)]", emoji: "🍜" },
  Cultural: { bg: "bg-[oklch(0.92_0.06_280)]", text: "text-[oklch(0.4_0.12_280)]", ring: "ring-[oklch(0.7_0.12_280)]", emoji: "🛕" },
  Rest: { bg: "bg-[oklch(0.93_0.04_130)]", text: "text-[oklch(0.4_0.08_140)]", ring: "ring-[oklch(0.7_0.08_140)]", emoji: "🌿" },
  Travel: { bg: "bg-[oklch(0.92_0.05_220)]", text: "text-[oklch(0.4_0.1_220)]", ring: "ring-[oklch(0.65_0.1_220)]", emoji: "🚌" },
  Milestone: { bg: "bg-[oklch(0.92_0.08_45)]", text: "text-[oklch(0.45_0.15_40)]", ring: "ring-[oklch(0.7_0.15_40)]", emoji: "✨" }
};
const FLAG_COLORS = [
  "oklch(0.65 0.18 25)",
  // red
  "oklch(0.85 0.16 95)",
  // yellow
  "oklch(0.7 0.15 145)",
  // green
  "oklch(0.98 0.005 80)",
  // white
  "oklch(0.6 0.13 240)"
  // blue
];
function PrayerFlags({ count = 18, className = "" }) {
  const flags = Array.from({ length: count }, (_, i) => FLAG_COLORS[i % FLAG_COLORS.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-end justify-center gap-1 ${className}`, "aria-hidden": true, children: flags.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flag-sway",
      style: {
        width: 14,
        height: 20,
        background: c,
        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
        animationDelay: `${i % 6 * 0.2}s`,
        boxShadow: "0 1px 1px oklch(0 0 0 / 0.1)",
        borderTop: "1px solid oklch(0.4 0.02 60 / 0.5)"
      }
    },
    i
  )) });
}
function MountainSilhouette({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 1200 180", className, preserveAspectRatio: "none", "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "m1", x1: "0", x2: "0", y1: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "oklch(0.55 0.07 220)", stopOpacity: "0.55" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "oklch(0.55 0.07 220)", stopOpacity: "0.2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "m2", x1: "0", x2: "0", y1: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "oklch(0.35 0.04 250)", stopOpacity: "0.7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "oklch(0.35 0.04 250)", stopOpacity: "0.3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,180 L0,110 L120,40 L210,95 L320,30 L430,100 L560,20 L680,90 L820,50 L940,110 L1080,55 L1200,100 L1200,180 Z", fill: "url(#m1)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,180 L0,140 L150,90 L280,135 L400,80 L520,130 L640,85 L780,125 L900,90 L1040,130 L1200,95 L1200,180 Z", fill: "url(#m2)" })
  ] });
}
const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/plan", label: "Plan", icon: CalendarDays },
  { to: "/memories", label: "Memories", icon: Image },
  { to: "/date-ideas", label: "Date Ideas", icon: Sparkles },
  { to: "/map", label: "Map", icon: MapPin }
];
function AppShell({ children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex flex-col w-60 shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-sm px-4 py-6 sticky top-0 h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "block px-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-3xl leading-none text-primary", children: "Our Nepal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl leading-tight text-foreground", children: "Story" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-script", children: "a love letter, in days" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col gap-1", children: NAV.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to,
            className: `group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${active ? "bg-primary text-primary-foreground shadow-paper" : "text-sidebar-foreground hover:bg-sidebar-accent"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: label })
            ]
          },
          to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-6 text-[11px] text-muted-foreground font-script text-center", children: "Made for us. July 28 onwards." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pb-24 md:pb-12", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative h-24 md:h-32 mt-auto pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MountainSilhouette, { className: "absolute inset-x-0 bottom-0 w-full h-full" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "md:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar/95 backdrop-blur border-t border-border px-2 py-1.5 flex justify-around", children: NAV.map(({ to, label, icon: Icon }) => {
      const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to,
          className: `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${active ? "text-primary" : "text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", children: label })
          ]
        },
        to
      );
    }) })
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const InputOTP = reactExports.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Lt,
  {
    ref,
    containerClassName: cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    ),
    className: cn("disabled:cursor-not-allowed", className),
    ...props
  }
));
InputOTP.displayName = "InputOTP";
const InputOTPGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center", className), ...props }));
InputOTPGroup.displayName = "InputOTPGroup";
const InputOTPSlot = reactExports.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = reactExports.useContext(jt);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
const InputOTPSeparator = reactExports.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, role: "separator", ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, {}) }));
InputOTPSeparator.displayName = "InputOTPSeparator";
const PIN = "2121";
const STORAGE_KEY = "ons.unlocked";
function PinGate({ children }) {
  const [unlocked, setUnlocked] = reactExports.useState(null);
  const [value, setValue] = reactExports.useState("");
  const [error, setError] = reactExports.useState(false);
  const [shake, setShake] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);
  if (unlocked === null) return null;
  if (unlocked) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  const handleChange = (val) => {
    setValue(val);
    setError(false);
    if (val.length === 4) {
      if (val === PIN) {
        localStorage.setItem(STORAGE_KEY, "true");
        setUnlocked(true);
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => {
          setValue("");
          setShake(false);
        }, 600);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.97_0.03_80)] px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "paper-card w-full max-w-sm p-8 md:p-12 text-center",
        style: { transform: "rotate(-0.4deg)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerFlags, { className: "mb-6 -mt-2", count: 10 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-2xl text-primary", children: "our private corner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl mt-1 mb-2", children: "Us Together.. K and A" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-script text-base mb-8", children: "Enter the pin to step inside" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex justify-center transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputOTP,
                {
                  maxLength: 4,
                  value,
                  onChange: handleChange,
                  autoFocus: true,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPGroup, { children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    InputOTPSlot,
                    {
                      index: i,
                      className: "h-14 w-14 text-2xl font-display border-border first:rounded-l-xl last:rounded-r-xl"
                    },
                    i
                  )) })
                }
              )
            }
          ),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 font-script text-base text-destructive animate-in fade-in", children: "Wrong pin — try again" }),
          !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-muted-foreground", children: "Auto-submits when complete" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes shake {
          0%, 100% { transform: rotate(-0.4deg) translateX(0); }
          20%       { transform: rotate(-0.4deg) translateX(-8px); }
          40%       { transform: rotate(-0.4deg) translateX(8px); }
          60%       { transform: rotate(-0.4deg) translateX(-5px); }
          80%       { transform: rotate(-0.4deg) translateX(5px); }
        }
      ` })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl text-primary", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-2xl", children: "This path isn't on our map" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground font-script", children: "Maybe the trail moved. Let's head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90", children: "Go home" }) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl", children: "A pebble in the trail" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something stumbled. Try again, or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
        router2.invalidate();
        reset();
      }, className: "rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90", children: "Try again" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent", children: "Go home" })
    ] })
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Us Together.. K and A" },
      { name: "description", content: "A private shared space for K and A — two months across Nepal." },
      { name: "theme-color", content: "#C0614A" },
      { property: "og:title", content: "Us Together.. K and A" },
      { property: "og:description", content: "K and A — a love letter, in days." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&family=Dancing+Script:wght@500;600;700&display=swap"
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
        integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
        crossOrigin: ""
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinGate, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AppProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] }) }) });
}
const $$splitComponentImporter$4 = () => import("./plan-3I3Ac8gK.mjs");
const Route$5 = createFileRoute("/plan")({
  head: () => ({
    meta: [{
      title: "Plan — Us Together.. K and A"
    }, {
      name: "description",
      content: "Our two-month timeline across Nepal — events, hikes, dinners, rest days."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const TRIP_START = /* @__PURE__ */ new Date("2026-06-28");
const TRIP_END = new Date(TRIP_START);
TRIP_END.setDate(TRIP_END.getDate() + 62);
const $$splitComponentImporter$3 = () => import("./memories-CHjSwOMo.mjs");
const Route$4 = createFileRoute("/memories")({
  head: () => ({
    meta: [{
      title: "Memories — Us Together.. K and A"
    }, {
      name: "description",
      content: "Our private gallery of moments together in Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./map-Bf8Zl3fd.mjs");
const Route$3 = createFileRoute("/map")({
  head: () => ({
    meta: [{
      title: "Map — Us Together.. K and A"
    }, {
      name: "description",
      content: "Every pin a moment, every line a memory."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./date-ideas-WapdgRmD.mjs");
const Route$2 = createFileRoute("/date-ideas")({
  head: () => ({
    meta: [{
      title: "Date Ideas — Us Together.. K and A"
    }, {
      name: "description",
      content: "Tell us the vibe, and we'll find the perfect moment in Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-oaQoIK4k.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Home — Us Together.. K and A"
    }, {
      name: "description",
      content: "Countdown, love note, and what's next for K and A."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
function createLovableAiGateway() {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");
  return createOpenAICompatible({
    name: "lovable-ai-gateway",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": apiKey }
  });
}
const SYSTEM_PROMPT = `You are a romantic Nepal travel expert helping a couple plan magical date experiences. Suggest specific, heartfelt, Nepal-specific date ideas based on what they describe. Be warm, personal, and specific to Nepal's landscapes, culture, food, and seasons. They arrive June 28 and stay for 2 months. The locations include Kathmandu, Pokhara, Chitwan, and trekking regions.

For each request, suggest 2 to 3 distinct date ideas. For each idea, use this exact markdown structure:

### {Idea title with a fitting emoji}
**What to do:** A specific, sensory description (1–2 short paragraphs).
**Best time of day:** When this is most magical and why.
**What to bring:** A short bullet list.
**Why it's special:** One warm sentence about why this moment will matter to them.

Keep the tone like a thoughtful friend, not a tour brochure. Mention real places, dishes, and small cultural details. Account for monsoon season (late July–August) in your suggestions.`;
const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json();
        const gateway = createLovableAiGateway();
        const result = streamText({
          model: gateway.chatModel("google/gemini-3-flash-preview"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages)
        });
        return result.toUIMessageStreamResponse();
      }
    }
  }
});
const PlanRoute = Route$5.update({
  id: "/plan",
  path: "/plan",
  getParentRoute: () => Route$6
});
const MemoriesRoute = Route$4.update({
  id: "/memories",
  path: "/memories",
  getParentRoute: () => Route$6
});
const MapRoute = Route$3.update({
  id: "/map",
  path: "/map",
  getParentRoute: () => Route$6
});
const DateIdeasRoute = Route$2.update({
  id: "/date-ideas",
  path: "/date-ideas",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const ApiChatRoute = Route.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  DateIdeasRoute,
  MapRoute,
  MemoriesRoute,
  PlanRoute,
  ApiChatRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  CATEGORY_STYLES as C,
  PrayerFlags as P,
  uploadPhoto as a,
  cn as c,
  router as r,
  useApp as u
};
