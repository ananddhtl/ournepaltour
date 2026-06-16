import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useApp, CATEGORY_STYLES, type EventCategory, type TripEvent } from "@/context/AppContext";
import { uploadPhoto } from "@/lib/supabase";
import { PrayerFlags } from "@/components/PrayerFlags";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Trash2, Heart, Check, CalendarRange, List } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Plan — Our Nepal Story" },
      { name: "description", content: "Our two-month timeline across Nepal — events, hikes, dinners, rest days." },
    ],
  }),
  component: PlanPage,
});

const CATEGORIES: EventCategory[] = ["Adventure", "Romantic", "Food", "Cultural", "Rest", "Travel", "Milestone"];
const TRIP_START = new Date("2026-06-28");
const TRIP_END = new Date(TRIP_START);
TRIP_END.setDate(TRIP_END.getDate() + 62);

function confetti(x: number, y: number) {
  const root = document.createElement("div");
  root.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;`;
  document.body.appendChild(root);
  const colors = ["#C0614A", "#3B7A8F", "#D4A84B", "#8FA882"];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement("div");
    const angle = (Math.PI * 2 * i) / 20;
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

function heartBurst(target: HTMLElement) {
  const rect = target.getBoundingClientRect();
  const h = document.createElement("div");
  h.textContent = "❤️";
  h.style.cssText = `position:fixed;left:${rect.left + rect.width / 2 - 12}px;top:${rect.top + rect.height / 2 - 12}px;font-size:28px;pointer-events:none;z-index:9999;`;
  h.className = "heart-pop";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 900);
}

function EventForm({ onSave, initial, onClose }: { onSave: (e: Omit<TripEvent, "id" | "status">) => void; initial?: Partial<TripEvent>; onClose: () => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [date, setDate] = useState(initial?.date ?? "2026-06-28");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [category, setCategory] = useState<EventCategory>(initial?.category ?? "Adventure");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(initial?.photo);
  const [uploading, setUploading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!title || !date) return;
        setUploading(true);
        try {
          let photo = initial?.photo;
          if (photoFile) photo = await uploadPhoto(photoFile, "events");
          onSave({ title, date, location, category, notes, photo });
          const btn = (e.target as HTMLFormElement).getBoundingClientRect();
          confetti(btn.left + btn.width / 2, btn.top + 40);
          onClose();
        } catch {
          toast.error("Failed to upload photo. Check your storage bucket.");
        } finally {
          setUploading(false);
        }
      }}
      className="space-y-4"
    >
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sunset on the lake" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as EventCategory)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{CATEGORY_STYLES[c].emoji} {c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Location</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Pokhara" />
      </div>
      <div>
        <Label>Notes</Label>
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="What to bring, why it matters…" />
      </div>
      <div>
        <Label>Photo (optional)</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            if (photoPreview && !initial?.photo) URL.revokeObjectURL(photoPreview);
            setPhotoFile(f);
            setPhotoPreview(URL.createObjectURL(f));
          }}
        />
        {photoPreview && <img src={photoPreview} className="mt-2 h-24 rounded-lg object-cover" alt="" />}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onClose} disabled={uploading}>Cancel</Button>
        <Button type="submit" disabled={uploading}>{uploading ? "Uploading…" : "Save event"}</Button>
      </div>
    </form>
  );
}

function PlanPage() {
  const { events, addEvent, deleteEvent, updateEvent } = useApp();
  const [view, setView] = useState<"timeline" | "calendar">("timeline");
  const [open, setOpen] = useState(false);

  const sorted = useMemo(
    () => [...events].sort((a, b) => a.date.localeCompare(b.date)),
    [events]
  );

  const grouped = useMemo(() => {
    const m = new Map<string, TripEvent[]>();
    for (const e of sorted) {
      const k = e.date.slice(0, 7);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(e);
    }
    return [...m.entries()];
  }, [sorted]);

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 pt-8 md:pt-14">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-script text-2xl text-primary">our journey</p>
          <h1 className="font-display text-4xl md:text-5xl">The Plan</h1>
          <p className="text-sm text-muted-foreground mt-1">Two months. June 28 → August 28, 2026.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-border bg-card overflow-hidden text-sm">
            <button onClick={() => setView("timeline")} className={`px-3 py-2 flex items-center gap-1.5 ${view === "timeline" ? "bg-primary text-primary-foreground" : ""}`}><List className="h-4 w-4" />Timeline</button>
            <button onClick={() => setView("calendar")} className={`px-3 py-2 flex items-center gap-1.5 ${view === "calendar" ? "bg-primary text-primary-foreground" : ""}`}><CalendarRange className="h-4 w-4" />Calendar</button>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-1" /> New event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display text-2xl">Add an event</DialogTitle></DialogHeader>
              <EventForm onClose={() => setOpen(false)} onSave={(e) => { addEvent(e); toast.success("Added to the plan ✨"); }} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <PrayerFlags className="mb-8" />

      {view === "timeline" ? (
        <div className="relative">
          <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />
          <div className="space-y-10">
            {grouped.map(([month, evs]) => (
              <section key={month}>
                <h2 className="font-display text-2xl ml-10 md:ml-14 mb-4">
                  {new Date(month + "-01").toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </h2>
                <ul className="space-y-4">
                  {evs.map((e) => {
                    const c = CATEGORY_STYLES[e.category];
                    return (
                      <li key={e.id} className="relative pl-10 md:pl-14">
                        <span className={`absolute left-[10px] md:left-[14px] top-4 h-4 w-4 rounded-full ring-4 ring-background ${c.bg} ${c.text}`} />
                        <article className="paper-card p-5">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-[11px] px-2 py-0.5 rounded-full ${c.bg} ${c.text}`}>{c.emoji} {e.category}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(e.date).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
                                </span>
                                {e.status === "done" && <span className="text-xs text-sage flex items-center gap-1"><Check className="h-3 w-3" /> done</span>}
                              </div>
                              <h3 className="font-display text-xl mt-1.5">{e.title}</h3>
                              {e.location && <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3.5 w-3.5" />{e.location}</p>}
                              {e.notes && <p className="mt-2 text-sm font-script text-foreground/80">{e.notes}</p>}
                              {e.photo && <img src={e.photo} alt="" className="mt-3 max-h-48 rounded-lg object-cover" />}
                            </div>
                            <div className="flex flex-col gap-1 shrink-0">
                              <button
                                onClick={(ev) => {
                                  heartBurst(ev.currentTarget);
                                  updateEvent(e.id, { status: e.status === "done" ? "planned" : "done" });
                                }}
                                className="text-xs px-2.5 py-1 rounded-lg border border-border hover:bg-accent flex items-center gap-1"
                              >
                                <Heart className="h-3 w-3" /> {e.status === "done" ? "Undo" : "Mark done"}
                              </button>
                              <button onClick={() => deleteEvent(e.id)} className="text-xs px-2.5 py-1 rounded-lg text-destructive hover:bg-destructive/10 flex items-center gap-1">
                                <Trash2 className="h-3 w-3" /> Delete
                              </button>
                            </div>
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
            {grouped.length === 0 && (
              <p className="text-center text-muted-foreground font-script text-lg py-12">
                Nothing planned yet — that's what adventures are for.
              </p>
            )}
          </div>
        </div>
      ) : (
        <CalendarView events={sorted} />
      )}
    </div>
  );
}

function CalendarView({ events }: { events: TripEvent[] }) {
  const months: { key: string; date: Date }[] = [];
  for (let d = new Date(TRIP_START); d <= TRIP_END; d.setMonth(d.getMonth() + 1)) {
    months.push({ key: d.toISOString().slice(0, 7), date: new Date(d) });
  }
  const byDate = new Map<string, TripEvent[]>();
  for (const e of events) {
    if (!byDate.has(e.date)) byDate.set(e.date, []);
    byDate.get(e.date)!.push(e);
  }

  return (
    <div className="space-y-8">
      {months.map(({ key, date }) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const first = new Date(year, month, 1);
        const days = new Date(year, month + 1, 0).getDate();
        const offset = first.getDay();
        return (
          <section key={key} className="paper-card p-5">
            <h3 className="font-display text-2xl mb-4">
              {date.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </h3>
            <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d} className="text-center py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: offset }).map((_, i) => <div key={"e" + i} />)}
              {Array.from({ length: days }).map((_, i) => {
                const day = i + 1;
                const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const evs = byDate.get(ds) ?? [];
                const inTrip = new Date(ds) >= TRIP_START && new Date(ds) <= TRIP_END;
                return (
                  <div key={day} className={`min-h-[64px] rounded-lg p-1.5 border text-xs ${inTrip ? "border-border bg-background/60" : "border-transparent opacity-40"}`}>
                    <div className="font-medium text-foreground/70">{day}</div>
                    <div className="space-y-0.5 mt-0.5">
                      {evs.slice(0, 2).map((e) => (
                        <div key={e.id} className={`truncate rounded px-1 py-0.5 ${CATEGORY_STYLES[e.category].bg} ${CATEGORY_STYLES[e.category].text}`}>
                          {CATEGORY_STYLES[e.category].emoji} {e.title}
                        </div>
                      ))}
                      {evs.length > 2 && <div className="text-[10px] text-muted-foreground">+{evs.length - 2} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
