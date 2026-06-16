import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef, type ChangeEvent } from "react";
import { useApp, type Memory } from "@/context/AppContext";
import { uploadPhoto } from "@/lib/supabase";
import { PrayerFlags } from "@/components/PrayerFlags";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Trash2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/memories")({
  head: () => ({
    meta: [
      { title: "Memories — Us Together.. K and A" },
      { name: "description", content: "Our private gallery of moments together in Nepal." },
    ],
  }),
  component: MemoriesPage,
});

function MemoryForm({ onSave, onClose }: { onSave: (m: Omit<Memory, "id">) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPhotoFiles((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setPhotoFiles((arr) => arr.filter((_, j) => j !== i));
    setPreviews((arr) => arr.filter((_, j) => j !== i));
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!title) return;
        setUploading(true);
        try {
          const photos = await Promise.all(photoFiles.map((f) => uploadPhoto(f, "memories")));
          previews.forEach((url) => URL.revokeObjectURL(url));
          onSave({ title, date, location, note, photos });
          onClose();
        } catch {
          toast.error("Failed to upload photos. Check your storage bucket.");
        } finally {
          setUploading(false);
        }
      }}
      className="space-y-4"
    >
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="That night on the lake" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <Label>Location</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Pokhara" />
        </div>
      </div>
      <div>
        <Label>Story</Label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} placeholder="What happened, how it felt, what we said…" />
      </div>
      <div>
        <Label>Photos</Label>
        <Input type="file" accept="image/*" multiple onChange={handleFiles} />
        {previews.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {previews.map((p, i) => (
              <div key={i} className="relative">
                <img src={p} className="h-20 w-20 object-cover rounded-lg" alt="" />
                <button type="button" onClick={() => removePhoto(i)} className="absolute -top-1.5 -right-1.5 bg-background border border-border rounded-full p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onClose} disabled={uploading}>Cancel</Button>
        <Button type="submit" disabled={uploading}>
          {uploading ? "Uploading…" : "Save memory"}
        </Button>
      </div>
    </form>
  );
}

function MemoryCard({ m, onOpen, onDelete }: { m: Memory; onOpen: () => void; onDelete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
      }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
      className="photo-card overflow-hidden break-inside-avoid mb-4 cursor-pointer transition-transform"
      onClick={onOpen}
    >
      {m.photos[0] ? (
        <img src={m.photos[0]} alt={m.title} className="w-full object-cover" />
      ) : (
        <div className="h-40 bg-gradient-to-br from-accent to-muted flex items-center justify-center font-script text-2xl text-muted-foreground">no photo yet</div>
      )}
      <div className="p-4">
        <h3 className="font-display text-xl leading-tight">{m.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{m.date}{m.location && ` · ${m.location}`}</p>
        {m.note && <p className="mt-2 text-sm font-script text-foreground/80 line-clamp-3">{m.note}</p>}
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="mt-3 text-xs text-destructive hover:underline inline-flex items-center gap-1">
          <Trash2 className="h-3 w-3" /> Remove
        </button>
      </div>
    </div>
  );
}

function MemoriesPage() {
  const { memories, addMemory, deleteMemory } = useApp();
  const [open, setOpen] = useState(false);
  const [viewing, setViewing] = useState<Memory | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const months = useMemo(() => {
    const s = new Set<string>();
    memories.forEach((m) => s.add(m.date.slice(0, 7)));
    return [...s].sort();
  }, [memories]);

  const filtered = filter === "all" ? memories : memories.filter((m) => m.date.startsWith(filter));

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 pt-8 md:pt-14">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-script text-2xl text-primary">our gallery</p>
          <h1 className="font-display text-4xl md:text-5xl">Memory Vault</h1>
          <p className="text-sm text-muted-foreground mt-1 font-script">Every place you go together becomes part of your story.</p>
        </div>
        <div className="flex gap-2">
          {months.length > 0 && (
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-border bg-card px-3 py-2 text-sm">
              <option value="all">All months</option>
              {months.map((m) => (
                <option key={m} value={m}>{new Date(m + "-01").toLocaleDateString(undefined, { month: "long", year: "numeric" })}</option>
              ))}
            </select>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-1" />New memory</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display text-2xl">A new memory</DialogTitle></DialogHeader>
              <MemoryForm onClose={() => setOpen(false)} onSave={(m) => { addMemory(m); toast.success("Saved to the vault 💛"); }} />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <PrayerFlags className="mb-8" />

      {filtered.length === 0 ? (
        <div className="paper-card p-12 text-center">
          <p className="font-script text-3xl text-primary">Your memories are waiting to be made.</p>
          <p className="mt-2 text-muted-foreground">Start June 28. 🏔️</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((m) => (
            <MemoryCard key={m.id} m={m} onOpen={() => setViewing(m)} onDelete={() => deleteMemory(m.id)} />
          ))}
        </div>
      )}

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          {viewing && (
            <div>
              <DialogHeader><DialogTitle className="font-display text-3xl">{viewing.title}</DialogTitle></DialogHeader>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                {viewing.date}{viewing.location && <><span>·</span><MapPin className="h-3.5 w-3.5" />{viewing.location}</>}
              </p>
              {viewing.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {viewing.photos.map((p, i) => (
                    <img key={i} src={p} alt="" className="w-full h-48 object-cover rounded-lg" />
                  ))}
                </div>
              )}
              {viewing.note && <p className="mt-4 font-script text-xl leading-snug text-foreground/90">{viewing.note}</p>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
