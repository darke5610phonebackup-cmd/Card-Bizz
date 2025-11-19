import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Public display doesn't need sessions
  },
});

export type Card = {
  id: string;
  public_id: string;
  full_name: string;
  title: string | null;
  company: string | null;
  bio: string | null;
  avatar_url: string | null;
  company_logo_url: string | null;
  phone_number: string | null;
  email: string | null;
  website_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp_number: string | null;
  whatsapp_enabled: boolean;
  template_id: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type CardLink = {
  id: string;
  card_id: string;
  label: string;
  type: string;
  value: string;
  order_index: number;
  created_at: string;
};

export type CardTemplate = {
  id: string;
  name: string;
  preview_url: string | null;
  config_json: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
};
