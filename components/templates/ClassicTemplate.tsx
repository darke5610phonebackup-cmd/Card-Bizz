'use client';

import { Mail, Phone, Globe, Instagram, Facebook, MessageCircle, Link as LinkIcon, MapPin } from 'lucide-react';
import Image from 'next/image';

import { SaveContactButton } from '@/components/SaveContactButton';
import { createValidUrl, createWhatsAppLink, formatPhoneLink, getInitials } from '@/lib/utils';

import { TemplateRendererProps } from './types';

const THEME = {
  primary: '#1e3a8a', // Navy Blue
  secondary: '#fbbf24', // Amber/Gold
  text: '#1f2937',
  textLight: '#6b7280',
  bg: '#f3f4f6',
};

export function ClassicTemplate({ card, links }: TemplateRendererProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Column - Profile & Brand */}
        <div className="md:w-2/5 bg-slate-900 text-white p-8 flex flex-col items-center text-center relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,transparent_60%)]" />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center h-full justify-center space-y-6">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full opacity-75 blur-sm" />
              {card.avatar_url ? (
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl">
                  <Image
                    src={card.avatar_url}
                    alt={card.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-40 h-40 rounded-full border-4 border-slate-800 bg-slate-800 flex items-center justify-center text-5xl font-serif font-bold text-amber-500">
                  {getInitials(card.full_name)}
                </div>
              )}
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-3xl font-serif font-bold tracking-wide text-white">
                {card.full_name}
              </h1>
              {card.title && (
                <p className="text-amber-400 font-medium tracking-wider uppercase text-sm">
                  {card.title}
                </p>
              )}
            </div>

            {/* Company Logo (if present, shown small here or in right col) */}
            {card.company_logo_url && (
              <div className="pt-4">
                <div className="relative w-24 h-12 opacity-90 grayscale hover:grayscale-0 transition-all">
                  <Image
                    src={card.company_logo_url}
                    alt={card.company || 'Company'}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Details & Actions */}
        <div className="md:w-3/5 p-8 md:p-12 bg-white flex flex-col justify-center">
          <div className="space-y-8">

            {/* Bio */}
            {card.bio && (
              <div className="relative pl-4 border-l-4 border-amber-400">
                <p className="text-gray-600 italic leading-relaxed">
                  &quot;{card.bio}&quot;
                </p>
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-4">
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Email</p>
                    <p className="text-gray-800 font-medium">{card.email}</p>
                  </div>
                </a>
              )}

              {card.phone_number && (
                <a
                  href={formatPhoneLink(card.phone_number) || '#'}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Phone</p>
                    <p className="text-gray-800 font-medium">{card.phone_number}</p>
                  </div>
                </a>
              )}

              {card.website_url && (
                <a
                  href={createValidUrl(card.website_url) || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-slate-900 group-hover:text-amber-400 transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Website</p>
                    <p className="text-gray-800 font-medium">{card.website_url}</p>
                  </div>
                </a>
              )}
            </div>

            {/* Social Media Row */}
            {(card.instagram_url || card.facebook_url || (card.whatsapp_enabled && card.whatsapp_number)) && (
              <div className="flex gap-3 pt-2">
                {card.instagram_url && (
                  <a
                    href={createValidUrl(card.instagram_url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {card.facebook_url && (
                  <a
                    href={createValidUrl(card.facebook_url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {card.whatsapp_enabled && card.whatsapp_number && (
                  <a
                    href={createWhatsAppLink(card.whatsapp_number) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-amber-400 hover:text-amber-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}

            {/* Save Contact Button */}
            <SaveContactButton
              card={card}
              links={links}
              className="w-full justify-center rounded-lg bg-slate-900 py-4 text-white font-semibold shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              iconClassName="text-amber-400"
            />

            {/* Additional Links */}
            {links.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  More Info
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={createValidUrl(link.value) || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2 rounded bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                    >
                      <span className="font-medium">{link.label}</span>
                      <LinkIcon className="w-3 h-3 text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
