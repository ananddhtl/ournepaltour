import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { PrayerFlags } from "@/components/PrayerFlags";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map — Our Nepal Story" },
      { name: "description", content: "Every pin a moment, every line a memory." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { events, memories } = useApp();
  const [mod, setMod] = useState<typeof import("react-leaflet") | null>(null);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, leaf]) => {
      // Fix default icon paths
      // @ts-expect-error private
      delete leaf.Icon.Default.prototype._getIconUrl;
      leaf.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setMod(rl);
      setL(leaf);
    });
  }, []);

  const pins = [
    ...events.filter((e) => e.lat && e.lng).map((e) => ({ kind: "event" as const, id: e.id, lat: e.lat!, lng: e.lng!, title: e.title, sub: e.location, date: e.date })),
    ...memories.filter((m) => m.lat && m.lng).map((m) => ({ kind: "memory" as const, id: m.id, lat: m.lat!, lng: m.lng!, title: m.title, sub: m.location, date: m.date })),
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-10 pt-8 md:pt-14">
      <header className="mb-6">
        <p className="font-script text-2xl text-primary">where we go</p>
        <h1 className="font-display text-4xl md:text-5xl">Trip Map</h1>
        <p className="text-sm text-muted-foreground mt-1 font-script">Every pin a moment, every line a memory.</p>
      </header>

      <PrayerFlags className="mb-6" />

      <div className="paper-card p-2 overflow-hidden">
        {mod && L ? (
          <mod.MapContainer center={[28.2, 84.0]} zoom={7} style={{ height: "70vh", width: "100%", borderRadius: "0.75rem" }}>
            <mod.TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pins.map((p) => (
              <mod.Marker key={`${p.kind}-${p.id}`} position={[p.lat, p.lng]}>
                <mod.Popup>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.kind}</div>
                    <div className="font-semibold">{p.title}</div>
                    {p.sub && <div className="text-xs">{p.sub}</div>}
                    <div className="text-xs text-muted-foreground">{p.date}</div>
                  </div>
                </mod.Popup>
              </mod.Marker>
            ))}
          </mod.MapContainer>
        ) : (
          <div className="h-[70vh] flex items-center justify-center text-muted-foreground font-script text-xl">unfolding the map…</div>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground text-center font-script">
        Add lat/lng to events or memories to see them appear here. (Seed events are already placed.)
      </p>
    </div>
  );
}
