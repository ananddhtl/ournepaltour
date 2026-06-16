import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useApp, P as PrayerFlags } from "./router-Duow2dwg.mjs";
import "../_libs/sonner.mjs";
import "../_libs/input-otp.mjs";
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
import "../_libs/lucide-react.mjs";
function MapPage() {
  const {
    events,
    memories
  } = useApp();
  const [mod, setMod] = reactExports.useState(null);
  const [L, setL] = reactExports.useState(null);
  reactExports.useEffect(() => {
    Promise.all([import("../_libs/react-leaflet.mjs"), import("../_libs/leaflet.mjs").then(function(n) {
      return n.l;
    })]).then(([rl, leaf]) => {
      delete leaf.Icon.Default.prototype._getIconUrl;
      leaf.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
      });
      setMod(rl);
      setL(leaf);
    });
  }, []);
  const pins = [...events.filter((e) => e.lat && e.lng).map((e) => ({
    kind: "event",
    id: e.id,
    lat: e.lat,
    lng: e.lng,
    title: e.title,
    sub: e.location,
    date: e.date
  })), ...memories.filter((m) => m.lat && m.lng).map((m) => ({
    kind: "memory",
    id: m.id,
    lat: m.lat,
    lng: m.lng,
    title: m.title,
    sub: m.location,
    date: m.date
  }))];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5 md:px-10 pt-8 md:pt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-2xl text-primary", children: "where we go" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "Trip Map" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-script", children: "Every pin a moment, every line a memory." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerFlags, { className: "mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "paper-card p-2 overflow-hidden", children: mod && L ? /* @__PURE__ */ jsxRuntimeExports.jsxs(mod.MapContainer, { center: [28.2, 84], zoom: 7, style: {
      height: "70vh",
      width: "100%",
      borderRadius: "0.75rem"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(mod.TileLayer, { attribution: "© OpenStreetMap", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
      pins.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(mod.Marker, { position: [p.lat, p.lng], children: /* @__PURE__ */ jsxRuntimeExports.jsx(mod.Popup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: p.kind }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: p.title }),
        p.sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: p.sub }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.date })
      ] }) }) }, `${p.kind}-${p.id}`))
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[70vh] flex items-center justify-center text-muted-foreground font-script text-xl", children: "unfolding the map…" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground text-center font-script", children: "Add lat/lng to events or memories to see them appear here. (Seed events are already placed.)" })
  ] });
}
export {
  MapPage as component
};
