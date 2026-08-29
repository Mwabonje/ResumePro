/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-dont-crash.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// This is a singleton client. If keys are missing, we use a placeholder so the app 
// doesn't crash on load, but actual DB requests will fail.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
