'use client';
/* eslint-disable @next/next/no-img-element */

import { Phone, MessageCircle, Mail, Globe, LinkIcon } from 'lucide-react';

import { SaveContactButton } from '@/components/SaveContactButton';
import { CardLink } from '@/lib/supabase';
import { cn, createValidUrl } from '@/lib/utils';

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

export function DharmaPremiumTemplate({ card, links }: TemplateRendererProps) {
  const primaryColor = card.theme_primary || '#f97316';
  const secondaryColor = card.theme_secondary || '#111827';
  const phoneNumber = sanitizePhone(card.phone_number);
  const whatsappNumber =
    card.whatsapp_enabled && card.whatsapp_number ? sanitizePhone(card.whatsapp_number) : undefined;

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
    card.website_url && {
      key: 'website',
      label: 'Website',
      icon: Globe,
      accentClass: 'text-purple-600',
      onClick: () =>
        openWindow(
          card.website_url.startsWith('http') ? card.website_url : `https://${card.website_url}`
        ),
    },
  ].filter(Boolean) as ActionButton[];

  const contactDetails = [
    card.phone_number && { label: card.phone_number, className: 'text-gray-900 font-semibold text-base' },
    card.email && { label: card.email, className: 'text-gray-700 font-medium' },
    card.website_url && { label: card.website_url, className: 'text-orange-600 font-semibold' },
  ].filter(Boolean) as { label: string; className: string }[];

  const customLinks = formatCustomLinks(links);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: `${primaryColor}30` }} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-2xl" style={{ backgroundColor: `${secondaryColor}25` }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-2xl shadow-gray-900/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-gray-50/30 rounded-3xl" />

          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200/50 shadow-lg shadow-gray-900/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent rounded-2xl" />
                  {card.company_logo_url ? (
                    <img
                      src={card.company_logo_url}
                      alt={card.company || 'Company logo'}
                      className="h-16 w-auto relative z-10 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-16 w-16 flex items-center justify-center text-xs font-semibold text-gray-400 uppercase relative z-10">
                      Logo
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mx-auto w-36 h-36">
                <div className="absolute -inset-4 rounded-full blur-lg" style={{ background: `${primaryColor}30` }} />
                <div className="absolute -inset-2 rounded-full shadow-xl" style={{ background: 'linear-gradient(135deg, #fff, #f8fafc)' }} />
                {card.avatar_url ? (
                  <img
                    src={card.avatar_url}
                    alt={card.full_name || 'Profile'}
                    className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl shadow-gray-900/20"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="relative w-full h-full rounded-full border-4 border-white shadow-2xl shadow-gray-900/20 flex items-center justify-center text-3xl font-semibold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {card.full_name
                      ?.split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
                <div className="absolute -inset-1 border-2 border-gray-200/50 rounded-full" />
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-semibold text-gray-900 drop-shadow-sm">{card.full_name}</h1>
                {card.title && (
                  <p className="text-base font-medium text-gray-500">{card.title}</p>
                )}
                {card.company && (
                  <>
                    <div className="w-16 h-1 mx-auto rounded-full shadow-lg" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`, boxShadow: `0 5px 15px ${primaryColor}40` }} />
                    <h2 className="text-xl font-medium drop-shadow-sm uppercase tracking-wide" style={{ color: primaryColor }}>
                      {card.company}
                    </h2>
                  </>
                )}
                {card.bio && (
                  <p className="text-sm text-gray-600 font-medium tracking-wide">{card.bio}</p>
                )}
              </div>
            </div>

            {actionButtons.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {actionButtons.map((action) => (
                  <button
                    key={action.key}
                    type="button"
                    onClick={action.onClick}
                    className="bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white text-gray-800 border border-gray-200/50 h-14 rounded-2xl font-medium transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/15 hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-gray-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <action.icon className={cn('w-5 h-5 mr-2 relative z-10', action.accentClass)} />
                    <span className="relative z-10">{action.label}</span>
                  </button>
                ))}
              </div>
            )}

            <SaveContactButton
              card={card}
              links={links}
              className="w-full bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-white text-gray-800 border border-gray-200/50 h-14 rounded-2xl font-medium transition-all duration-300 shadow-xl shadow-gray-900/10 hover:shadow-2xl hover:shadow-gray-900/15 hover:-translate-y-1 backdrop-blur-sm relative overflow-hidden group"
              iconClassName="text-orange-600"
            />

            {(contactDetails.length > 0 || customLinks.length > 0) && (
              <div className="text-center space-y-3 text-sm pt-8 border-t border-gray-200/50 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                {contactDetails.map((detail, index) => (
                  <p key={`${detail.label}-${index}`} className={detail.className}>
                    {detail.label}
                  </p>
                ))}

                {customLinks.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2">
                    {customLinks.map((link) => {
                      const href = createValidUrl(link.value) || link.value;
                      return (
                        <a
                          key={link.id}
                          href={href ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 text-gray-700 font-medium hover:text-orange-600 transition-colors"
                        >
                          <LinkIcon className="w-4 h-4" />
                          <span>{link.label || link.type}</span>
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

