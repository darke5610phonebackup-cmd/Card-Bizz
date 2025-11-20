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

export interface PublicCardResponse {
  card: Card;
  links: CardLink[];
  template: CardTemplate | null;
}

/**
 * Fetch card data from Supabase Edge Function
 * Falls back to direct Supabase queries if Edge Function is unavailable
 */
export async function fetchCardByPublicId(
  publicId: string
): Promise<PublicCardResponse | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // Try Edge Function first
  if (supabaseUrl) {
    try {
      const edgeFunctionUrl = `${supabaseUrl}/functions/v1/get-public-card/${publicId}`;

      const response = await fetch(edgeFunctionUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      if (response.status === 404) {
        return null;
      }

      // Edge Function error, fall through to direct Supabase query
      console.warn('Edge Function error, falling back to Supabase:', response.status);
    } catch (error) {
      console.warn('Edge Function unavailable, falling back to Supabase:', error);
    }
  }

  // Fallback to direct Supabase queries
  const { data: card, error: cardError } = await supabase
    .from('cards')
    .select('*')
    .eq('public_id', publicId)
    .eq('is_published', true)
    .maybeSingle();

  if (cardError || !card) {
    return null;
  }

  const { data: links = [] } = await supabase
    .from('card_links')
    .select('*')
    .eq('card_id', card.id)
    .order('order_index', { ascending: true });

  let template = null;
  if (card.template_id) {
    const { data: templateData } = await supabase
      .from('card_templates')
      .select('*')
      .eq('id', card.template_id)
      .maybeSingle();
    template = templateData;
  }

  return { card, links, template };
}
