'use client';

import { Phone, MessageCircle, Mail, Globe, LinkIcon, Share2 } from 'lucide-react';
import Image from 'next/image';

import { SaveContactButton } from '@/components/SaveContactButton';
import { CardLink } from '@/lib/supabase';
import { cn, createValidUrl, getInitials } from '@/lib/utils';

import { TemplateRendererProps } from './types';

type ActionButton = {
  key: string;
  label: string;
  icon: typeof Phone;
  accentClass: string;
  onClick: () => void;
};

const sanitizePhone = (value?: string | null) => value?.replace(/[^0-9+]/g, '');

const openWindow = (href: string, target: '_blank' | '_self' = '_blank') => {
  if (typeof window === 'undefined' || !href) {
    return;
  }
  window.open(href, target);
};

const formatCustomLinks = (links: CardLink[]) => links.filter((link) => Boolean(link.value));

const THEME = {
  primary: '#f97316',
  secondary: '#111827',
};

export function DharmaPremiumTemplate({ card, links }: TemplateRendererProps) {
  const primaryColor = THEME.primary;
  const secondaryColor = THEME.secondary;
  const phoneNumber = sanitizePhone(card.phone_number);
  const whatsappNumber =
    card.whatsapp_enabled && card.whatsapp_number ? sanitizePhone(card.whatsapp_number) : undefined;
  const websiteUrl = createValidUrl(card.website_url);

  const actionButtons: ActionButton[] = [
    card.phone_number && {
      key: 'call',
      label: 'Call',
      icon: Phone,
      accentClass: 'text-orange-600',
      onClick: () => openWindow(`tel:${phoneNumber}`, '_self'),
    },
    whatsappNumber && {
      key: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      accentClass: 'text-green-600',
      onClick: () => openWindow(`https://wa.me/${whatsappNumber}`),
    },
    card.email && {
      key: 'email',
      label: 'Email',
      icon: Mail,
      accentClass: 'text-blue-600',
      onClick: () => openWindow(`mailto:${card.email}`, '_self'),
    },
    websiteUrl
      ? {
        key: 'website',
        label: 'Website',
        icon: Globe,
        accentClass: 'text-purple-600',
        onClick: () => openWindow(websiteUrl),
      }
      : null,
  ].filter(Boolean) as ActionButton[];

  const contactDetails = [
    card.phone_number && { label: card.phone_number, className: 'text-gray-900 font-semibold text-base' },
    card.email && { label: card.email, className: 'text-gray-700 font-medium' },
    card.website_url && { label: card.website_url, className: 'text-orange-600 font-semibold' },
  ].filter(Boolean) as { label: string; className: string }[];

  const customLinks = formatCustomLinks(links);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 overflow-hidden">

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-20 w-[500px] h-[500px] bg-pink-300/20 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">

          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-6">

              {/* Company Logo Area */}
              <div className="flex justify-center">
                <div className="bg-white/80 rounded-2xl p-4 border border-white shadow-sm relative group transition-transform hover:scale-105 duration-300 min-w-[4rem] min-h-[4rem] flex items-center justify-center">
                  {card.company_logo_url ? (
                    <div className="relative w-24 h-12">
                      <Image
                        src={card.company_logo_url}
                        alt={card.company || 'Company logo'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-gray-300">
                      <Share2 className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div className="relative mx-auto w-32 h-32">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 to-purple-500 blur-lg opacity-40 animate-pulse" />
                {card.avatar_url ? (
                  <div className="relative w-full h-full rounded-full border-[3px] border-white shadow-lg overflow-hidden">
                    <Image
                      src={card.avatar_url}
                      alt={card.full_name || 'Profile'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="relative w-full h-full rounded-full border-[3px] border-white shadow-lg flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br from-orange-400 to-pink-500"
                  >
                    {getInitials(card.full_name)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{card.full_name}</h1>
                {card.title && (
                  <p className="text-base font-medium text-gray-500">{card.title}</p>
                )}
                {card.company && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider">
                    {card.company}
                  </div>
                )}
              </div>

              {card.bio && (
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{card.bio}</p>
              )}
            </div>

            {/* Action Grid */}
            {actionButtons.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {actionButtons.map((action) => (
                  <button
                    key={action.key}
                    type="button"
                    onClick={action.onClick}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-100 h-14 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
                  >
                    <action.icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', action.accentClass)} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Save Contact */}
            <SaveContactButton
              card={card}
              links={links}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white h-14 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:-translate-y-0.5"
              iconClassName="text-orange-400"
            />

            {/* Footer Links */}
            {(contactDetails.length > 0 || customLinks.length > 0) && (
              <div className="text-center space-y-4 pt-6 border-t border-gray-100">

                {contactDetails.map((detail, index) => (
                  <p key={`${detail.label}-${index}`} className={detail.className}>
                    {detail.label}
                  </p>
                ))}

                {customLinks.length > 0 && (
                  <div className="flex flex-col gap-3 pt-2">
                    {customLinks.map((link) => {
                      const href = createValidUrl(link.value) || link.value;
                      return (
                        <a
                          key={link.id}
                          href={href ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-white/50 border border-white/50 hover:bg-white transition-all group"
                        >
                          <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">{link.label || link.type}</span>
                          <LinkIcon className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
