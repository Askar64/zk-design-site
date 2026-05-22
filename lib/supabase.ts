import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ajgmxzlcauggkmvpljuj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZ214emxjYXVnZ2ttdnBsanVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTM2ODIsImV4cCI6MjA5NDgyOTY4Mn0.KKVUrwFPlrP_YfJkPS38yry9X-Vq63hqi8lIM6Sd-6E"
);