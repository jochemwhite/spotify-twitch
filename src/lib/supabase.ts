import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import { env } from "./env";


export function createSupabaseClient() {
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    db: {
      schema: "jochemwhite"
    }
  });
}

export const supabase = createSupabaseClient();
