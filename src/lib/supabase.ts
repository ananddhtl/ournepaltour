import { createClient } from "@supabase/supabase-js";

// Node.js < 22 has no native WebSocket. Polyfill it for SSR only so that
// Supabase's realtime client can initialize. The `import.meta.env.SSR` guard
// tells Vite to strip this block from the browser bundle entirely.
if (import.meta.env.SSR && typeof globalThis.WebSocket === "undefined") {
  const { default: ws } = await import("ws");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).WebSocket = ws;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadPhoto(file: File, folder: "events" | "memories"): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("photos").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return data.publicUrl;
}
