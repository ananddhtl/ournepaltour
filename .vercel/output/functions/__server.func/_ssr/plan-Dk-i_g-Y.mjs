import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useApp, P as PrayerFlags, C as CATEGORY_STYLES, a as uploadPhoto, c as cn } from "./router-Duow2dwg.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, L as Label, I as Input } from "./label-66whRoUn.mjs";
import { B as Button, T as Textarea } from "./textarea-Bhm2zGr6.mjs";
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/input-otp.mjs";
import { L as List, b as CalendarRange, P as Plus, c as Check, M as MapPin, d as Heart, T as Trash2, e as ChevronDown, f as ChevronUp } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
const CATEGORIES = ["Adventure", "Romantic", "Food", "Cultural", "Rest", "Travel", "Milestone"];
const TRIP_START = /* @__PURE__ */ new Date("2026-06-28");
const TRIP_END = new Date(TRIP_START);
TRIP_END.setDate(TRIP_END.getDate() + 62);
function confetti(x, y) {
  const root = document.createElement("div");
  root.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;`;
  document.body.appendChild(root);
  const colors = ["#C0614A", "#3B7A8F", "#D4A84B", "#8FA882"];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    const angle = Math.PI * 2 * i / 20;
    const dist = 60 + Math.random() * 60;
    p.style.cssText = `position:absolute;width:8px;height:8px;background:${colors[i % colors.length]};border-radius:2px;transition:transform 0.9s cubic-bezier(.2,.8,.2,1),opacity 1s ease-out;`;
    root.appendChild(p);
    requestAnimationFrame(() => {
      p.style.transform = `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist + 30}px) rotate(${Math.random() * 360}deg)`;
      p.style.opacity = "0";
    });
  }
  setTimeout(() => root.remove(), 1100);
}
function heartBurst(target) {
  const rect = target.getBoundingClientRect();
  const h = document.createElement("div");
  h.textContent = "❤️";
  h.style.cssText = `position:fixed;left:${rect.left + rect.width / 2 - 12}px;top:${rect.top + rect.height / 2 - 12}px;font-size:28px;pointer-events:none;z-index:9999;`;
  h.className = "heart-pop";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 900);
}
function EventForm({
  onSave,
  initial,
  onClose
}) {
  const [title, setTitle] = reactExports.useState(initial?.title ?? "");
  const [date, setDate] = reactExports.useState(initial?.date ?? "2026-06-28");
  const [location, setLocation] = reactExports.useState(initial?.location ?? "");
  const [category, setCategory] = reactExports.useState(initial?.category ?? "Adventure");
  const [notes, setNotes] = reactExports.useState(initial?.notes ?? "");
  const [photoFile, setPhotoFile] = reactExports.useState(null);
  const [photoPreview, setPhotoPreview] = reactExports.useState(initial?.photo);
  const [uploading, setUploading] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: async (e) => {
    e.preventDefault();
    if (!title || !date) return;
    setUploading(true);
    try {
      let photo = initial?.photo;
      if (photoFile) photo = await uploadPhoto(photoFile, "events");
      onSave({
        title,
        date,
        location,
        category,
        notes,
        photo
      });
      const btn = e.target.getBoundingClientRect();
      confetti(btn.left + btn.width / 2, btn.top + 40);
      onClose();
    } catch {
      toast.error("Failed to upload photo. Check your storage bucket.");
    } finally {
      setUploading(false);
    }
  }, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Sunset on the lake", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: (v) => setCategory(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
            CATEGORY_STYLES[c].emoji,
            " ",
            c
          ] }, c)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: location, onChange: (e) => setLocation(e.target.value), placeholder: "Pokhara" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: notes, onChange: (e) => setNotes(e.target.value), rows: 3, placeholder: "What to bring, why it matters…" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Photo (optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/*", onChange: (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (photoPreview && !initial?.photo) URL.revokeObjectURL(photoPreview);
        setPhotoFile(f);
        setPhotoPreview(URL.createObjectURL(f));
      } }),
      photoPreview && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photoPreview, className: "mt-2 h-24 rounded-lg object-cover", alt: "" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", onClick: onClose, disabled: uploading, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: uploading, children: uploading ? "Uploading…" : "Save event" })
    ] })
  ] });
}
function PlanPage() {
  const {
    events,
    addEvent,
    deleteEvent,
    updateEvent
  } = useApp();
  const [view, setView] = reactExports.useState("timeline");
  const [open, setOpen] = reactExports.useState(false);
  const sorted = reactExports.useMemo(() => [...events].sort((a, b) => a.date.localeCompare(b.date)), [events]);
  const grouped = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    for (const e of sorted) {
      const k = e.date.slice(0, 7);
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(e);
    }
    return [...m.entries()];
  }, [sorted]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5 md:px-10 pt-8 md:pt-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-script text-2xl text-primary", children: "our journey" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "The Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Two months. June 28 → August 28, 2026." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-xl border border-border bg-card overflow-hidden text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setView("timeline"), className: `px-3 py-2 flex items-center gap-1.5 ${view === "timeline" ? "bg-primary text-primary-foreground" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }),
            "Timeline"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setView("calendar"), className: `px-3 py-2 flex items-center gap-1.5 ${view === "calendar" ? "bg-primary text-primary-foreground" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRange, { className: "h-4 w-4" }),
            "Calendar"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
            " New event"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-2xl", children: "Add an event" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EventForm, { onClose: () => setOpen(false), onSave: (e) => {
              addEvent(e);
              toast.success("Added to the plan ✨");
            } })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PrayerFlags, { className: "mb-8" }),
    view === "timeline" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[18px] md:left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
        grouped.map(([month, evs]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl ml-10 md:ml-14 mb-4", children: (/* @__PURE__ */ new Date(month + "-01")).toLocaleDateString(void 0, {
            month: "long",
            year: "numeric"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: evs.map((e) => {
            const c = CATEGORY_STYLES[e.category];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative pl-10 md:pl-14", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-[10px] md:left-[14px] top-4 h-4 w-4 rounded-full ring-4 ring-background ${c.bg} ${c.text}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "paper-card p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[11px] px-2 py-0.5 rounded-full ${c.bg} ${c.text}`, children: [
                      c.emoji,
                      " ",
                      e.category
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(e.date).toLocaleDateString(void 0, {
                      weekday: "short",
                      month: "short",
                      day: "numeric"
                    }) }),
                    e.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-sage flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
                      " done"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl mt-1.5", children: e.title }),
                  e.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-1 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
                    e.location
                  ] }),
                  e.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-script text-foreground/80", children: e.notes }),
                  e.photo && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: e.photo, alt: "", className: "mt-3 max-h-48 rounded-lg object-cover" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: (ev) => {
                    heartBurst(ev.currentTarget);
                    updateEvent(e.id, {
                      status: e.status === "done" ? "planned" : "done"
                    });
                  }, className: "text-xs px-2.5 py-1 rounded-lg border border-border hover:bg-accent flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3 w-3" }),
                    " ",
                    e.status === "done" ? "Undo" : "Mark done"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => deleteEvent(e.id), className: "text-xs px-2.5 py-1 rounded-lg text-destructive hover:bg-destructive/10 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
                    " Delete"
                  ] })
                ] })
              ] }) })
            ] }, e.id);
          }) })
        ] }, month)),
        grouped.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground font-script text-lg py-12", children: "Nothing planned yet — that's what adventures are for." })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarView, { events: sorted })
  ] });
}
function CalendarView({
  events
}) {
  const months = [];
  for (let d = new Date(TRIP_START); d <= TRIP_END; d.setMonth(d.getMonth() + 1)) {
    months.push({
      key: d.toISOString().slice(0, 7),
      date: new Date(d)
    });
  }
  const byDate = /* @__PURE__ */ new Map();
  for (const e of events) {
    if (!byDate.has(e.date)) byDate.set(e.date, []);
    byDate.get(e.date).push(e);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: months.map(({
    key,
    date
  }) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const first = new Date(year, month, 1);
    const days = new Date(year, month + 1, 0).getDate();
    const offset = first.getDay();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "paper-card p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-4", children: date.toLocaleDateString(void 0, {
        month: "long",
        year: "numeric"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-1", children: d }, d)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1", children: [
        Array.from({
          length: offset
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, "e" + i)),
        Array.from({
          length: days
        }).map((_, i) => {
          const day = i + 1;
          const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const evs = byDate.get(ds) ?? [];
          const inTrip = new Date(ds) >= TRIP_START && new Date(ds) <= TRIP_END;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-[64px] rounded-lg p-1.5 border text-xs ${inTrip ? "border-border bg-background/60" : "border-transparent opacity-40"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground/70", children: day }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 mt-0.5", children: [
              evs.slice(0, 2).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `truncate rounded px-1 py-0.5 ${CATEGORY_STYLES[e.category].bg} ${CATEGORY_STYLES[e.category].text}`, children: [
                CATEGORY_STYLES[e.category].emoji,
                " ",
                e.title
              ] }, e.id)),
              evs.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                "+",
                evs.length - 2,
                " more"
              ] })
            ] })
          ] }, day);
        })
      ] })
    ] }, key);
  }) });
}
export {
  PlanPage as component
};
