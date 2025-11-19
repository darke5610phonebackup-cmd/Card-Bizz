import { getTemplateLookupKeys } from '@/lib/templateRegistry';
import { CardTemplate } from '@/lib/supabase';

import { ClassicTemplate } from './ClassicTemplate';
import { DharmaPremiumTemplate } from './DharmaPremiumTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ModernTemplate } from './ModernTemplate';
import { TemplateRenderer, TemplateRendererProps } from './types';

const registry: Record<string, TemplateRenderer> = {
  classic: ClassicTemplate,
  'classic-default': ClassicTemplate,
  'classic-template': ClassicTemplate,
  minimal: MinimalTemplate,
  'minimal-template': MinimalTemplate,
  modern: ModernTemplate,
  'modern-template': ModernTemplate,
  'v0-image-analysis': DharmaPremiumTemplate,
  'dharma-bhakti': DharmaPremiumTemplate,
  'dharma-premium': DharmaPremiumTemplate,
  'dharma-premium-v0': DharmaPremiumTemplate,
};

const defaultRenderer = ModernTemplate;

export function resolveTemplateComponent(template?: CardTemplate | null): TemplateRenderer {
  if (!template) {
    return defaultRenderer;
  }

  const lookupKeys = getTemplateLookupKeys(template);
  for (const key of lookupKeys) {
    if (key && registry[key]) {
      return registry[key];
    }
  }

  return defaultRenderer;
}

export { ClassicTemplate, DharmaPremiumTemplate, MinimalTemplate, ModernTemplate };
export type { TemplateRenderer, TemplateRendererProps };

