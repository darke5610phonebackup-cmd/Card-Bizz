'use client';

import { Card, CardLink, CardTemplate } from '@/lib/supabase';
import { getTemplateComponentKey } from '@/lib/templateRegistry';

import { resolveTemplateComponent } from './templates';

interface CardDisplayProps {
  card: Card;
  links: CardLink[];
  template: CardTemplate | null;
}

export function CardDisplay({ card, links, template }: CardDisplayProps) {
  const renderTemplate = resolveTemplateComponent(template);
  const templateKey = getTemplateComponentKey(template);

  return (
    <div data-template-key={templateKey ?? 'modern'}>
      {renderTemplate({ card, links, template })}
    </div>
  );
}
