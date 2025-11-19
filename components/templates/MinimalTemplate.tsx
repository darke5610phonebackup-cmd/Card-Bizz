'use client';

import { Mail, Phone, Globe, Instagram, Facebook, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { SaveContactButton } from '@/components/SaveContactButton';
import { createValidUrl, createWhatsAppLink, formatPhoneLink, getInitials } from '@/lib/utils';

import { TemplateRendererProps } from './types';

const PRIMARY_COLOR = '#0f172a';

export function MinimalTemplate({ card, links }: TemplateRendererProps) {
  const primaryColor = PRIMARY_COLOR;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Avatar */}
          <div className="flex justify-center">
            {card.avatar_url ? (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2" style={{ borderColor: primaryColor }}>
                <Image
                  src={card.avatar_url}
                  alt={card.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center text-white text-3xl font-bold border-2"
                style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
              >
                {getInitials(card.full_name)}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-light text-gray-900 dark:text-white tracking-tight">
              {card.full_name}
            </h1>
            {card.title && (
              <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                {card.title}
              </p>
            )}
            {card.company && (
              <p className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                {card.company}
              </p>
            )}
          </div>

          {/* Bio */}
          {card.bio && (
            <p className="text-center text-gray-700 dark:text-gray-300 leading-relaxed">
              {card.bio}
            </p>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-800" style={{ borderColor: `${primaryColor}20` }}></div>

          {/* Contact Info */}
          <div className="space-y-3">
            {card.email && (
              <a
                href={`mailto:${card.email}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                <span className="text-gray-900 dark:text-white font-light">{card.email}</span>
              </a>
            )}
            {card.phone_number && (
              <a
                href={formatPhoneLink(card.phone_number) || '#'}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                <span className="text-gray-900 dark:text-white font-light">{card.phone_number}</span>
              </a>
            )}
            {card.website_url && (
              <a
                href={createValidUrl(card.website_url) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <Globe className="w-5 h-5" style={{ color: primaryColor }} />
                <span className="text-gray-900 dark:text-white font-light">{card.website_url}</span>
              </a>
            )}
          </div>

          {/* Save Contact */}
          <SaveContactButton
            card={card}
            links={links}
            className="w-full justify-center rounded-full border border-gray-200 bg-gray-50 py-3 text-gray-900 hover:bg-gray-100"
            iconClassName="text-gray-600"
          />

          {/* Social Links */}
          {(card.instagram_url || card.facebook_url || (card.whatsapp_enabled && card.whatsapp_number)) && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-800" style={{ borderColor: `${primaryColor}20` }}></div>
              <div className="flex justify-center gap-6">
                {card.instagram_url && (
                  <a
                    href={createValidUrl(card.instagram_url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Instagram className="w-6 h-6" style={{ color: primaryColor }} />
                  </a>
                )}
                {card.facebook_url && (
                  <a
                    href={createValidUrl(card.facebook_url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Facebook className="w-6 h-6" style={{ color: primaryColor }} />
                  </a>
                )}
                {card.whatsapp_enabled && card.whatsapp_number && (
                  <a
                    href={createWhatsAppLink(card.whatsapp_number) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <MessageCircle className="w-6 h-6" style={{ color: primaryColor }} />
                  </a>
                )}
              </div>
            </>
          )}

          {/* Custom Links */}
          {links.length > 0 && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-800" style={{ borderColor: `${primaryColor}20` }}></div>
              <div className="space-y-2">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={createValidUrl(link.value) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group"
                  >
                    <span className="font-light text-gray-900 dark:text-white">{link.label}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
