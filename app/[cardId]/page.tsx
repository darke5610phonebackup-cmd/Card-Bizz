import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCardByPublicId, type CardLink, type CardTemplate } from '@/lib/supabase';
import { CardDisplay } from '@/components/CardDisplay';

type Props = {
  params: Promise<{ cardId: string }>;
};

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cardId } = await params;
  const data = await fetchCardByPublicId(cardId);

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
  const data = await fetchCardByPublicId(cardId);

  if (!data) {
    notFound();
  }

  const { card, links, template } = data;

  return (
    <CardDisplay card={card} links={links as CardLink[]} template={template as CardTemplate | null} />
  );
}

// Enable static generation for published cards
export const dynamic = 'force-dynamic'; // Changed to dynamic for real-time updates
export const revalidate = 60; // Revalidate every 60 seconds
