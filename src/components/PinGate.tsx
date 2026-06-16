import { useEffect, useState, type ReactNode } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { PrayerFlags } from "@/components/PrayerFlags";

const PIN = "2121";
const STORAGE_KEY = "ons.unlocked";

export function PinGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  // Still hydrating — render nothing to avoid flash
  if (unlocked === null) return null;

  if (unlocked) return <>{children}</>;

  const handleChange = (val: string) => {
    setValue(val);
    setError(false);
    if (val.length === 4) {
      if (val === PIN) {
        localStorage.setItem(STORAGE_KEY, "true");
        setUnlocked(true);
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => {
          setValue("");
          setShake(false);
        }, 600);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.97_0.03_80)] px-4">
      <div
        className="paper-card w-full max-w-sm p-8 md:p-12 text-center"
        style={{ transform: "rotate(-0.4deg)" }}
      >
        <PrayerFlags className="mb-6 -mt-2" count={10} />

        <p className="font-script text-2xl text-primary">our private corner</p>
        <h1 className="font-display text-4xl mt-1 mb-2">Our Nepal Story</h1>
        <p className="text-muted-foreground font-script text-base mb-8">
          Enter the pin to step inside
        </p>

        <div
          className={`flex justify-center transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
        >
          <InputOTP
            maxLength={4}
            value={value}
            onChange={handleChange}
            autoFocus
          >
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="h-14 w-14 text-2xl font-display border-border first:rounded-l-xl last:rounded-r-xl"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <p className="mt-5 font-script text-base text-destructive animate-in fade-in">
            Wrong pin — try again
          </p>
        )}

        {!error && (
          <p className="mt-5 text-xs text-muted-foreground">
            Auto-submits when complete
          </p>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(-0.4deg) translateX(0); }
          20%       { transform: rotate(-0.4deg) translateX(-8px); }
          40%       { transform: rotate(-0.4deg) translateX(8px); }
          60%       { transform: rotate(-0.4deg) translateX(-5px); }
          80%       { transform: rotate(-0.4deg) translateX(5px); }
        }
      `}</style>
    </div>
  );
}
