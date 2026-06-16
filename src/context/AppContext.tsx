import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export type EventCategory = "Adventure" | "Romantic" | "Food" | "Cultural" | "Rest" | "Travel" | "Milestone";
export type EventStatus = "planned" | "today" | "done";

export interface TripEvent {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  location: string;
  category: EventCategory;
  notes?: string;
  photo?: string; // Storage URL
  status: EventStatus;
  lat?: number;
  lng?: number;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  location: string;
  note: string;
  photos: string[]; // Storage URLs
  lat?: number;
  lng?: number;
}

interface AppState {
  events: TripEvent[];
  memories: Memory[];
  loveNote: string;
  loading: boolean;
  setLoveNote: (v: string) => void;
  addEvent: (e: Omit<TripEvent, "id" | "status"> & { status?: EventStatus }) => void;
  updateEvent: (id: string, patch: Partial<TripEvent>) => void;
  deleteEvent: (id: string) => void;
  addMemory: (m: Omit<Memory, "id">) => void;
  deleteMemory: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToEvent(row: Record<string, any>): TripEvent {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location ?? "",
    category: row.category as EventCategory,
    notes: row.notes ?? undefined,
    photo: row.photo_url ?? undefined,
    status: row.status as EventStatus,
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToMemory(row: Record<string, any>): Memory {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    location: row.location ?? "",
    note: row.note ?? "",
    photos: row.photo_urls ?? [],
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
  };
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<TripEvent[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loveNote, setLoveNoteState] = useState<string>("Today I'm excited because…");
  const [loading, setLoading] = useState(true);

  // Load all data on mount
  useEffect(() => {
    async function fetchAll() {
      try {
        const [eventsRes, memoriesRes, noteRes] = await Promise.all([
          supabase.from("events").select("*").order("date"),
          supabase.from("memories").select("*").order("created_at", { ascending: false }),
          supabase.from("love_note").select("content").eq("id", 1).single(),
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

  // Debounce love note writes — only hit Supabase 1s after the user stops typing
  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      supabase.from("love_note").update({ content: loveNote }).eq("id", 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [loveNote, loading]);

  const value: AppState = {
    events,
    memories,
    loveNote,
    loading,
    setLoveNote: setLoveNoteState,

    addEvent: (e) => {
      const tempId = crypto.randomUUID();
      const optimistic: TripEvent = { ...e, id: tempId, status: e.status ?? "planned" };
      setEvents((prev) => [...prev, optimistic].sort((a, b) => a.date.localeCompare(b.date)));

      supabase
        .from("events")
        .insert({
          title: e.title,
          date: e.date,
          location: e.location || null,
          category: e.category,
          notes: e.notes || null,
          photo_url: e.photo || null,
          status: e.status ?? "planned",
          lat: e.lat ?? null,
          lng: e.lng ?? null,
        })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            toast.error("Failed to save event.");
            setEvents((prev) => prev.filter((ev) => ev.id !== tempId));
            return;
          }
          setEvents((prev) => prev.map((ev) => (ev.id === tempId ? dbToEvent(data) : ev)));
        });
    },

    updateEvent: (id, patch) => {
      setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, ...patch } : ev)));

      const dbPatch: Record<string, unknown> = {};
      if (patch.title !== undefined) dbPatch.title = patch.title;
      if (patch.date !== undefined) dbPatch.date = patch.date;
      if (patch.location !== undefined) dbPatch.location = patch.location;
      if (patch.category !== undefined) dbPatch.category = patch.category;
      if (patch.notes !== undefined) dbPatch.notes = patch.notes;
      if (patch.photo !== undefined) dbPatch.photo_url = patch.photo;
      if (patch.status !== undefined) dbPatch.status = patch.status;
      if (patch.lat !== undefined) dbPatch.lat = patch.lat;
      if (patch.lng !== undefined) dbPatch.lng = patch.lng;

      supabase
        .from("events")
        .update(dbPatch)
        .eq("id", id)
        .then(({ error }) => {
          if (error) toast.error("Failed to update event.");
        });
    },

    deleteEvent: (id) => {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      supabase
        .from("events")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) toast.error("Failed to delete event.");
        });
    },

    addMemory: (m) => {
      const tempId = crypto.randomUUID();
      const optimistic: Memory = { ...m, id: tempId };
      setMemories((prev) => [optimistic, ...prev]);

      supabase
        .from("memories")
        .insert({
          title: m.title,
          date: m.date,
          location: m.location || null,
          note: m.note || null,
          photo_urls: m.photos,
          lat: m.lat ?? null,
          lng: m.lng ?? null,
        })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            toast.error("Failed to save memory.");
            setMemories((prev) => prev.filter((mem) => mem.id !== tempId));
            return;
          }
          setMemories((prev) => prev.map((mem) => (mem.id === tempId ? dbToMemory(data) : mem)));
        });
    },

    deleteMemory: (id) => {
      setMemories((prev) => prev.filter((m) => m.id !== id));
      supabase
        .from("memories")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) toast.error("Failed to delete memory.");
        });
    },
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export const CATEGORY_STYLES: Record<EventCategory, { bg: string; text: string; ring: string; emoji: string }> = {
  Adventure: { bg: "bg-[oklch(0.92_0.06_60)]", text: "text-[oklch(0.45_0.12_40)]", ring: "ring-[oklch(0.7_0.12_40)]", emoji: "⛰️" },
  Romantic: { bg: "bg-[oklch(0.93_0.06_15)]", text: "text-[oklch(0.45_0.15_15)]", ring: "ring-[oklch(0.7_0.15_15)]", emoji: "💖" },
  Food: { bg: "bg-[oklch(0.93_0.07_80)]", text: "text-[oklch(0.45_0.12_70)]", ring: "ring-[oklch(0.75_0.12_75)]", emoji: "🍜" },
  Cultural: { bg: "bg-[oklch(0.92_0.06_280)]", text: "text-[oklch(0.4_0.12_280)]", ring: "ring-[oklch(0.7_0.12_280)]", emoji: "🛕" },
  Rest: { bg: "bg-[oklch(0.93_0.04_130)]", text: "text-[oklch(0.4_0.08_140)]", ring: "ring-[oklch(0.7_0.08_140)]", emoji: "🌿" },
  Travel: { bg: "bg-[oklch(0.92_0.05_220)]", text: "text-[oklch(0.4_0.1_220)]", ring: "ring-[oklch(0.65_0.1_220)]", emoji: "🚌" },
  Milestone: { bg: "bg-[oklch(0.92_0.08_45)]", text: "text-[oklch(0.45_0.15_40)]", ring: "ring-[oklch(0.7_0.15_40)]", emoji: "✨" },
};
