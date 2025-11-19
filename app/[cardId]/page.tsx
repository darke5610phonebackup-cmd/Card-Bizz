import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase, type CardLink, type CardTemplate } from '@/lib/supabase';
import { CardDisplay } from '@/components/CardDisplay';

type Props = {
  params: Promise<{ cardId: string }>;
};

// Fetch card data
async function getCardData(publicId: string) {
  // Fetch card by public_id (encrypted URL param)
  const { data: card, error: cardError } = await supabase
    .from('cards')
    .select('*')
    .eq('public_id', publicId)
    .eq('is_published', true)
    .maybeSingle();

  if (cardError || !card) {
    return null;
  }

  // Fetch card links
  const { data: links = [] } = await supabase
    .from('card_links')
    .select('*')
    .eq('card_id', card.id)
    .order('order_index', { ascending: true });

  // Fetch template
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

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cardId } = await params;
  const data = await getCardData(cardId);

  if (!data) {
    return {
      title: 'Card Not Found',
    };
  }

  const { card } = data;
  const title = `${card.full_name}${card.title ? ` - ${card.title}` : ''}`;
  const description = card.bio || `View ${card.full_name}'s business card`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: card.avatar_url ? [card.avatar_url] : [],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: card.avatar_url ? [card.avatar_url] : [],
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { cardId } = await params;
  const data = await getCardData(cardId);

  if (!data) {
    notFound();
  }

  const { card, links, template } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <CardDisplay card={card} links={links as CardLink[]} template={template as CardTemplate | null} />
    </div>
  );
}

// Enable static generation for published cards
export const dynamic = 'force-dynamic'; // Changed to dynamic for real-time updates
export const revalidate = 60; // Revalidate every 60 seconds
