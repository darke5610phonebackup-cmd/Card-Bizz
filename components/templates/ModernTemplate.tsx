'use client';

import {
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook,
  MessageCircle,
  ExternalLink,
  Building2,
} from 'lucide-react';
import Image from 'next/image';

import { SaveContactButton } from '@/components/SaveContactButton';
import { createValidUrl, createWhatsAppLink, formatPhoneLink, getInitials } from '@/lib/utils';

import { TemplateRendererProps } from './types';

export function ModernTemplate({ card, links }: TemplateRendererProps) {
  const primaryColor = card.theme_primary || '#3b82f6';
  const secondaryColor = card.theme_secondary || '#1e40af';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Main Card */}
        <div
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
          style={{
            borderTop: `6px solid ${primaryColor}`,
          }}
        >
          {/* Header with Avatar */}
          <div
            className="relative h-40 bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
            }}
          >
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              {card.avatar_url ? (
                <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white">
                  <Image
                    src={card.avatar_url}
                    alt={card.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center text-white text-4xl font-bold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {getInitials(card.full_name)}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 pb-8 px-8 text-center">
            {/* Name & Title */}
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {card.full_name}
            </h1>

            {card.title && (
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
                {card.title}
              </p>
            )}

            {card.company && (
              <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                <Building2 className="w-4 h-4" />
                <span>{card.company}</span>
              </div>
            )}

            {/* Company Logo */}
            {card.company_logo_url && (
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-12">
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
              <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto mb-8">
                {card.bio}
              </p>
            )}

            {/* Contact Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Mail className="w-6 h-6" style={{ color: primaryColor }} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Email</span>
                </a>
              )}

              {card.phone_number && (
                <a
                  href={formatPhoneLink(card.phone_number) || '#'}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Phone className="w-6 h-6" style={{ color: primaryColor }} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Call</span>
                </a>
              )}

              {card.website_url && (
                <a
                  href={createValidUrl(card.website_url) || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Globe className="w-6 h-6" style={{ color: primaryColor }} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Website</span>
                </a>
              )}

              {card.whatsapp_enabled && card.whatsapp_number && (
                <a
                  href={createWhatsAppLink(card.whatsapp_number) || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <MessageCircle className="w-6 h-6" style={{ color: primaryColor }} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp</span>
                </a>
              )}
            </div>

            {/* Save Contact */}
            <SaveContactButton
              card={card}
              links={links}
              className="w-full justify-center rounded-2xl border border-gray-200 bg-white py-3 text-gray-800 shadow-md hover:bg-gray-50"
              iconClassName="text-gray-600"
            />

            {/* Social Links */}
            {(card.instagram_url || card.facebook_url) && (
              <div className="flex justify-center gap-4 mb-8">
                {card.instagram_url && (
                  <a
                    href={createValidUrl(card.instagram_url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                )}
                {card.facebook_url && (
                  <a
                    href={createValidUrl(card.facebook_url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                  </a>
                )}
              </div>
            )}

            {/* Custom Links */}
            {links.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                  Links
                </h3>
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={createValidUrl(link.value) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{link.label}</span>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Powered by Virtual Business Card
        </div>
      </div>
    </div>
  );
}
