import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useApp, P as PrayerFlags, a as uploadPhoto } from "./router-Duow2dwg.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, L as Label, I as Input } from "./label-66whRoUn.mjs";
import { B as Button, T as Textarea } from "./textarea-Bhm2zGr6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/input-otp.mjs";
import { P as Plus, M as MapPin, X, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/class-variance-authority.mjs";
function MemoryForm({
  onSave,
  onClose
}) {
  const [title, setTitle] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [location, setLocation] = reactExports.useState("");
  const [note, setNote] = reactExports.useState("");
  const [photoFiles, setPhotoFiles] = reactExports.useState([]);
  const [previews, setPreviews] = reactExports.useState([]);
  const [uploading, setUploading] = reactExports.useState(false);
  const handleFiles = (e) => {
    const files = Array.from(e.target.files ?? []);
    setPhotoFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };
  const removePhoto = (i) => {
    URL.revokeObjectURL(previews[i]);
    setPhotoFiles((arr) => arr.filter((_, j) => j !== i));
    setPreviews((arr) => arr.filter((_, j) => j !== i));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: async (e) => {
    e.preventDefault();
    if (!title) return;
    setUploading(true);
    try {
      const photos = await Promise.all(photoFiles.map((f) => uploadPhoto(f, "memories")));
      previews.forEach((url) => URL.revokeObjectURL(url));
      onSave({
        title,
        date,
        location,
        note,
        photos
      });
      onClose();
    } catch {
      toast.error("Failed to upload photos. Check your storage bucket.");
    } finally {
      setUploading(false);
    }
  }, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "That night on the lake", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: location, onChange: (e) => setLocation(e.target.value), placeholder: "Pokhara" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Story" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: note, onChange: (e) => setNote(e.target.value), rows: 4, placeholder: "What happened, how it felt, what we said…" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Photos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", multiple: true, onChange: handleFiles }),
      previews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: previews.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p, className: "h-20 w-20 object-cover rounded-lg", alt: "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removePhoto(i), className: "absolute -top-1.5 -right-1.5 bg-background border border-border rounded-full p-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }) })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: onClose, disabled: uploading, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: uploading, children: uploading ? "Uploading…" : "Save memory" })
    ] })
  ] });
}
function MemoryCard({
  m,
  onOpen,
  onDelete
}) {
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, onMouseMove: (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
  }, onMouseLeave: () => {
    if (ref.current) ref.current.style.transform = "";
  }, className: "photo-card overflow-hidden break-inside-avoid mb-4 cursor-pointer transition-transform", onClick: onOpen, children: [
    m.photos[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.photos[0], alt: m.title, className: "w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-gradient-to-br from-accent to-muted flex items-center justify-center font-script text-2xl text-muted-foreground", children: "no photo yet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl leading-tight", children: m.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
        m.date,
        m.location && ` · ${m.location}`
      ] }),
      m.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-script text-foreground/80 line-clamp-3", children: m.note }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: (e) => {
        e.stopPropagation();
        onDelete();
      }, className: "mt-3 text-xs text-destructive hover:underline inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
        " Remove"
      ] })
    ] })
  ] });
}
function MemoriesPage() {
  const {
    memories,
    addMemory,
    deleteMemory
  } = useApp();
  const [open, setOpen] = reactExports.useState(false);
  const [viewing, setViewing] = reactExports.useState(null);
  const [filter, setFilter] = reactExports.useState("all");
  const months = reactExports.useMemo(() => {
    const s = /* @__PURE__ */ new Set();
    memories.forEach((m) => s.add(m.date.slice(0, 7)));
    return [...s].sort();
  }, [memories]);
  const filtered = filter === "all" ? memories : memories.filter((m) => m.date.startsWith(filter));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-5 md:px-10 pt-8 md:pt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-2xl text-primary", children: "our gallery" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "Memory Vault" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-script", children: "Every place you go together becomes part of your story." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        months.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "rounded-xl border border-border bg-card px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All months" }),
          months.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, children: (/* @__PURE__ */ new Date(m + "-01")).toLocaleDateString(void 0, {
            month: "long",
            year: "numeric"
          }) }, m))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            "New memory"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "A new memory" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryForm, { onClose: () => setOpen(false), onSave: (m) => {
              addMemory(m);
              toast.success("Saved to the vault 💛");
            } })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerFlags, { className: "mb-8" }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "paper-card p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-3xl text-primary", children: "Your memories are waiting to be made." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Start June 28. 🏔️" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 sm:columns-2 lg:columns-3 gap-4", children: filtered.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemoryCard, { m, onOpen: () => setViewing(m), onDelete: () => deleteMemory(m.id) }, m.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!viewing, onOpenChange: (o) => !o && setViewing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl", children: viewing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-3xl", children: viewing.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 flex items-center gap-1.5", children: [
        viewing.date,
        viewing.location && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          viewing.location
        ] })
      ] }),
      viewing.photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-2", children: viewing.photos.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p, alt: "", className: "w-full h-48 object-cover rounded-lg" }, i)) }),
      viewing.note && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-script text-xl leading-snug text-foreground/90", children: viewing.note })
    ] }) }) })
  ] });
}
export {
  MemoriesPage as component
};
