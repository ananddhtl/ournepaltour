import { createClient } from "@supabase/supabase-js";

// Node.js < 22 has no native WebSocket. Supabase's realtime client checks for
// it during createClient() even if realtime is never used. Provide a no-op
// class synchronously so the check passes without any actual connections.
// `import.meta.env.SSR` tells Vite to strip this block from the browser bundle.
if (import.meta.env.SSR && typeof globalThis.WebSocket === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).WebSocket = class {
    static CONNECTING = 0; static OPEN = 1; static CLOSING = 2; static CLOSED = 3;
    readyState = 3;
    constructor(_url: string) {}
    close() {} send() {}
    addEventListener() {} removeEventListener() {} dispatchEvent() { return false; }
  };
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
