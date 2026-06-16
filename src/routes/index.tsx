import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApp, CATEGORY_STYLES } from "@/context/AppContext";
import { PrayerFlags } from "@/components/PrayerFlags";
import { CalendarDays, Sparkles, Image as ImageIcon, MapPin, Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Us Together.. K and A" },
      { name: "description", content: "Countdown, love note, and what's next for K and A." },
    ],
  }),
  component: HomePage,
});

const ARRIVAL = new Date("2026-06-28T00:00:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s, arrived: diff === 0 };
}

function HomePage() {
  const { events, memories, loveNote, setLoveNote } = useApp();
  const cd = useCountdown(ARRIVAL);

  const upcoming = [...events]
    .filter((e) => new Date(e.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const featured = memories.length > 0 ? memories[Math.floor(Math.random() * memories.length)] : null;

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-10 pt-8 md:pt-14">
      <PrayerFlags className="mb-6 -mt-2" />

      <header className="text-center mb-10">
        <p className="font-script text-2xl text-primary">welcome to</p>
        <h1 className="font-display text-5xl md:text-6xl mt-1">Us Together.. K and A</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          A private place for K and A — two months of mountains, lakes, prayer flags, and small moments
          we'll want to remember forever.
        </p>
      </header>

      {/* Countdown */}
      <section className="paper-card p-6 md:p-10 text-center mb-8 overflow-hidden">
        <p className="font-script text-xl text-secondary mb-1">
          {cd.arrived ? "You're here ✨" : "until you arrive…"}
        </p>
        {!cd.arrived ? (
          <div className="flex justify-center gap-4 md:gap-8 mt-4 font-display">
            {[
              { v: cd.d, l: "days" },
              { v: cd.h, l: "hours" },
              { v: cd.m, l: "minutes" },
              { v: cd.s, l: "seconds" },
            ].map((u) => (
              <div key={u.l}>
                <div className="text-4xl md:text-6xl text-primary tabular-nums">{String(u.v).padStart(2, "0")}</div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground mt-1">{u.l}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-2xl font-display mt-3">The story begins today.</p>
        )}
        <p className="mt-5 text-sm text-muted-foreground">June 28, 2026 · Tribhuvan International, Kathmandu</p>
      </section>

      {/* Love note + quick actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <section className="md:col-span-2 paper-card p-6 tape" style={{ background: "oklch(0.96 0.05 80)", transform: "rotate(-0.6deg)" }}>
          <label className="font-script text-xl text-foreground/80">a little note for us today</label>
          <textarea
            value={loveNote}
            onChange={(e) => setLoveNote(e.target.value)}
            rows={3}
            className="mt-2 w-full bg-transparent resize-none font-script text-2xl md:text-3xl leading-snug text-espresso focus:outline-none"
          />
        </section>
        <section className="paper-card p-5 flex flex-col gap-2">
          <p className="font-display text-lg">Quick add</p>
          <Link to="/plan" className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-3 py-2.5 text-sm hover:opacity-90">
            <Plus className="h-4 w-4" /> New event
          </Link>
          <Link to="/memories" className="flex items-center gap-2 rounded-xl bg-secondary text-secondary-foreground px-3 py-2.5 text-sm hover:opacity-90">
            <Plus className="h-4 w-4" /> New memory
          </Link>
          <Link to="/date-ideas" className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm hover:bg-accent">
            <Sparkles className="h-4 w-4 text-primary" /> Ask for a date idea
          </Link>
        </section>
      </div>

      {/* Next event + memory */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="paper-card p-6">
          <div className="flex items-center gap-2 text-secondary"><CalendarDays className="h-4 w-4" /><span className="text-xs uppercase tracking-widest">Next up</span></div>
          {upcoming ? (
            <div className="mt-3">
              <p className={`inline-block text-[11px] px-2 py-0.5 rounded-full ${CATEGORY_STYLES[upcoming.category].bg} ${CATEGORY_STYLES[upcoming.category].text}`}>
                {CATEGORY_STYLES[upcoming.category].emoji} {upcoming.category}
              </p>
              <h3 className="font-display text-2xl mt-2">{upcoming.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {upcoming.location}
              </p>
              <p className="text-sm text-foreground/80 mt-1">{new Date(upcoming.date).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</p>
              {upcoming.notes && <p className="mt-3 text-sm font-script text-foreground/80">{upcoming.notes}</p>}
              <Link to="/plan" className="mt-4 inline-block text-sm text-primary hover:underline">See the full plan →</Link>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground font-script">Nothing planned yet — that's what adventures are for.</p>
          )}
        </section>

        <section className="paper-card p-6">
          <div className="flex items-center gap-2 text-secondary"><ImageIcon className="h-4 w-4" /><span className="text-xs uppercase tracking-widest">Memory of the day</span></div>
          {featured ? (
            <div className="mt-3">
              {featured.photos[0] && (
                <img src={featured.photos[0]} alt={featured.title} className="w-full h-44 object-cover rounded-xl mb-3" />
              )}
              <h3 className="font-display text-2xl">{featured.title}</h3>
              <p className="text-xs text-muted-foreground">{featured.date} · {featured.location}</p>
              <p className="mt-2 text-sm font-script text-foreground/80 line-clamp-3">{featured.note}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground font-script">
              Your memories are waiting to be made. Start June 28. 🏔️
            </p>
          )}
        </section>
      </div>

      <PrayerFlags className="mt-12" count={22} />
    </div>
  );
}
