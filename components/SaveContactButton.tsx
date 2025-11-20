'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

import { Card, CardLink } from '@/lib/supabase';
import { cn } from '@/lib/utils';

type SaveContactButtonProps = {
  card: Card;
  links?: CardLink[];
  className?: string;
  label?: string;
  iconClassName?: string;
  hideIcon?: boolean;
};

const sanitizePhone = (value?: string | null) => value?.replace(/[^0-9+]/g, '');

const createVCardPayload = (card: Card, links: CardLink[]) => {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  if (card.full_name) {
    lines.push(`FN:${card.full_name}`);
    const parts = card.full_name.trim().split(/\s+/);
    const firstName = parts[0] ?? '';
    const lastName = parts.length > 1 ? parts[parts.length - 1] : '';
    const middleName = parts.slice(1, -1).join(' ');
    lines.push(`N:${lastName};${firstName};${middleName};;`);
  }

  if (card.company) {
    lines.push(`ORG:${card.company}`);
  }

  if (card.title) {
    lines.push(`TITLE:${card.title}`);
  }

  if (card.bio) {
    lines.push(`NOTE:${card.bio}`);
  }

  const primaryPhone = sanitizePhone(card.phone_number);
  if (primaryPhone) {
    lines.push(`TEL;TYPE=VOICE,WORK:${primaryPhone}`);
  }

  if (card.whatsapp_enabled) {
    const whatsappPhone = sanitizePhone(card.whatsapp_number);
    if (whatsappPhone) {
      lines.push(`TEL;TYPE=CELL,WHATSAPP:${whatsappPhone}`);
      lines.push(`X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/${whatsappPhone}`);
    }
  }

  if (card.email) {
    lines.push(`EMAIL;TYPE=INTERNET:${card.email}`);
  }

  if (card.website_url) {
    const website = card.website_url.startsWith('http')
      ? card.website_url
      : `https://${card.website_url}`;
    lines.push(`URL;TYPE=WORK:${website}`);
  }

  if (card.instagram_url) {
    lines.push(`X-SOCIALPROFILE;TYPE=instagram:${card.instagram_url}`);
  }

  if (card.facebook_url) {
    lines.push(`X-SOCIALPROFILE;TYPE=facebook:${card.facebook_url}`);
  }

  links.forEach((link, index) => {
    if (!link.value) return;
    lines.push(`item${index}.URL:${link.value}`);
    lines.push(`item${index}.X-ABLabel:${link.label || link.type || `Link ${index + 1}`}`);
  });

  lines.push(`REV:${new Date().toISOString()}`);
  lines.push('END:VCARD');

  return lines.join('\n');
};

export function SaveContactButton({
  card,
  links = [],
  className,
  label = 'Save Contact',
  iconClassName,
  hideIcon = false,
}: SaveContactButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!card.full_name) return;
    setIsGenerating(true);

    try {
      const vcard = createVCardPayload(card, links);
      const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const slug = card.full_name.toLowerCase().replace(/\s+/g, '-');
      link.download = `${slug || 'contact-card'}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:active:scale-100',
        className
      )}
      aria-busy={isGenerating}
    >
      {isGenerating ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          {!hideIcon && <Download className={cn('w-5 h-5', iconClassName)} />}
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

