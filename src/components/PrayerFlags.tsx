const FLAG_COLORS = [
  "oklch(0.65 0.18 25)",   // red
  "oklch(0.85 0.16 95)",   // yellow
  "oklch(0.7 0.15 145)",   // green
  "oklch(0.98 0.005 80)",  // white
  "oklch(0.6 0.13 240)",   // blue
];

export function PrayerFlags({ count = 18, className = "" }: { count?: number; className?: string }) {
  const flags = Array.from({ length: count }, (_, i) => FLAG_COLORS[i % FLAG_COLORS.length]);
  return (
    <div className={`flex items-end justify-center gap-1 ${className}`} aria-hidden>
      {flags.map((c, i) => (
        <div
          key={i}
          className="flag-sway"
          style={{
            width: 14,
            height: 20,
            background: c,
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            animationDelay: `${(i % 6) * 0.2}s`,
            boxShadow: "0 1px 1px oklch(0 0 0 / 0.1)",
            borderTop: "1px solid oklch(0.4 0.02 60 / 0.5)",
          }}
        />
      ))}
    </div>
  );
}

export function MountainSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 180" className={className} preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.55 0.07 220)" stopOpacity="0.55" />
          <stop offset="1" stopColor="oklch(0.55 0.07 220)" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="m2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.35 0.04 250)" stopOpacity="0.7" />
          <stop offset="1" stopColor="oklch(0.35 0.04 250)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M0,180 L0,110 L120,40 L210,95 L320,30 L430,100 L560,20 L680,90 L820,50 L940,110 L1080,55 L1200,100 L1200,180 Z" fill="url(#m1)" />
      <path d="M0,180 L0,140 L150,90 L280,135 L400,80 L520,130 L640,85 L780,125 L900,90 L1040,130 L1200,95 L1200,180 Z" fill="url(#m2)" />
    </svg>
  );
}
