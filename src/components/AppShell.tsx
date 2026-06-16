import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CalendarDays, Image as ImageIcon, Sparkles, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { MountainSilhouette } from "./PrayerFlags";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/plan", label: "Plan", icon: CalendarDays },
  { to: "/memories", label: "Memories", icon: ImageIcon },
  { to: "/date-ideas", label: "Date Ideas", icon: Sparkles },
  { to: "/map", label: "Map", icon: MapPin },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-sm px-4 py-6 sticky top-0 h-screen">
        <Link to="/" className="block px-2 mb-8">
          <p className="font-script text-3xl leading-none text-primary">Our Nepal</p>
          <p className="font-display text-2xl leading-tight text-foreground">Story</p>
          <p className="text-xs text-muted-foreground mt-1 font-script">a love letter, in days</p>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? "bg-primary text-primary-foreground shadow-paper"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 text-[11px] text-muted-foreground font-script text-center">
          Made for us. July 28 onwards.
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 pb-24 md:pb-12">{children}</main>
        <footer className="relative h-24 md:h-32 mt-auto pointer-events-none overflow-hidden">
          <MountainSilhouette className="absolute inset-x-0 bottom-0 w-full h-full" />
        </footer>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-sidebar/95 backdrop-blur border-t border-border px-2 py-1.5 flex justify-around">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
