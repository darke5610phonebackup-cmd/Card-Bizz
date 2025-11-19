import { CardTemplate } from './supabase';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export function getTemplateComponentKey(template?: CardTemplate | null): string | undefined {
  if (!template) {
    return undefined;
  }

  const config = template.config_json ?? {};
  const candidates: Array<unknown> = [
    config.componentKey,
    config.slug,
    config.key,
    template.name,
    template.id,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return slugify(candidate);
    }
  }

  return undefined;
}

export function getTemplateLookupKeys(template?: CardTemplate | null): string[] {
  const keys = new Set<string>();
  const componentKey = getTemplateComponentKey(template);
  if (componentKey) {
    keys.add(componentKey);
  }

  if (template?.name) {
    keys.add(slugify(template.name));
    keys.add(template.name.toLowerCase());
  }

  if (template?.id) {
    keys.add(template.id);
  }

  return Array.from(keys).filter(Boolean);
}

