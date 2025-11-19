'use client';

import { Mail, Phone, Globe, Instagram, Facebook, MessageCircle, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

import { SaveContactButton } from '@/components/SaveContactButton';
import { createValidUrl, createWhatsAppLink, formatPhoneLink, getInitials } from '@/lib/utils';

import { TemplateRendererProps } from './types';

export function ClassicTemplate({ card, links }: TemplateRendererProps) {
  const primaryColor = card.theme_primary || '#1e3a8a';
  const secondaryColor = card.theme_secondary || '#3b82f6';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Left Column - Profile */}
            <div
              className="md:w-1/3 p-8 text-white"
              style={{
                background: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}
            >
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex justify-center">
                  {card.avatar_url ? (
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/20">
                      <Image
                        src={card.avatar_url}
                        alt={card.full_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-40 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center text-4xl font-bold">
                      {getInitials(card.full_name)}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2">{card.full_name}</h1>
                  {card.title && <p className="text-white/80 font-medium">{card.title}</p>}
                  {card.company && (
                    <p className="text-white/60 text-sm mt-1">{card.company}</p>
                  )}
                </div>

                {/* Contact Icons */}
                <div className="flex justify-center gap-4 pt-4">
                  {card.email && (
                    <a
                      href={`mailto:${card.email}`}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {card.phone_number && (
                    <a
                      href={formatPhoneLink(card.phone_number) || '#'}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  )}
                  {card.website_url && (
                    <a
                      href={createValidUrl(card.website_url) || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:w-2/3 p-8">
              <div className="space-y-8">
                {/* Company Logo */}
                {card.company_logo_url && (
                  <div className="flex justify-center md:justify-start">
                    <div className="relative w-32 h-16">
                      <Image
                        src={card.company_logo_url}
                        alt={card.company || 'Company'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Bio */}
                {card.bio && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      About
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{card.bio}</p>
                  </div>
                )}

                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    {card.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <a
                          href={`mailto:${card.email}`}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {card.email}
                        </a>
                      </div>
                    )}
                    {card.phone_number && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <a
                          href={formatPhoneLink(card.phone_number) || '#'}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {card.phone_number}
                        </a>
                      </div>
                    )}
                    {card.website_url && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <a
                          href={createValidUrl(card.website_url) || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {card.website_url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Contact */}
                <SaveContactButton
                  card={card}
                  links={links}
                  className="w-full justify-center rounded-lg border border-gray-200 bg-white py-3 font-semibold text-gray-800 shadow-sm hover:bg-gray-50"
                  iconClassName="text-blue-500"
                />

                {/* Social Media */}
                {(card.instagram_url || card.facebook_url || (card.whatsapp_enabled && card.whatsapp_number)) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      Social Media
                    </h3>
                    <div className="flex gap-3">
                      {card.instagram_url && (
                        <a
                          href={createValidUrl(card.instagram_url) || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Instagram className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                      )}
                      {card.facebook_url && (
                        <a
                          href={createValidUrl(card.facebook_url) || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Facebook className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                      )}
                      {card.whatsapp_enabled && card.whatsapp_number && (
                        <a
                          href={createWhatsAppLink(card.whatsapp_number) || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Custom Links */}
                {links.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                      Links
                    </h3>
                    <div className="space-y-2">
                      {links.map((link) => (
                        <a
                          key={link.id}
                          href={createValidUrl(link.value) || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                        >
                          <LinkIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
