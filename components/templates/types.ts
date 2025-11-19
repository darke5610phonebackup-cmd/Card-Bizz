import { Card, CardLink, CardTemplate } from '@/lib/supabase';

export interface TemplateRendererProps {
  card: Card;
  links: CardLink[];
  template?: CardTemplate | null;
}

export type TemplateRenderer = (props: TemplateRendererProps) => JSX.Element;

