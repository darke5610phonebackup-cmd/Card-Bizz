'use client';

import { Mail, Phone, Globe, Instagram, Facebook, MessageCircle, ArrowUpRight, Link as LinkIcon } from 'lucide-react';
import Image from 'next/image';

import { SaveContactButton } from '@/components/SaveContactButton';
import { createValidUrl, createWhatsAppLink, formatPhoneLink, getInitials } from '@/lib/utils';

import { TemplateRendererProps } from './types';

export function MinimalTemplate({ card, links }: TemplateRendererProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-white text-black">
      <div className="w-full max-w-md border-2 border-black p-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 duration-300 bg-white">

        {/* Header */}
        <div className="flex flex-col items-start space-y-6 mb-12">
          {/* Avatar */}
          <div className="w-24 h-24 border-2 border-black overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
            {card.avatar_url ? (
              <Image
                src={card.avatar_url}
                alt={card.full_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center text-white text-3xl font-bold">
                {getInitials(card.full_name)}
              </div>
            )}
          </div>

          {/* Name & Title */}
          <div className="space-y-1">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-[0.9]">
              {card.full_name}
            </h1>
            {card.title && (
              <p className="text-lg font-medium uppercase tracking-widest text-gray-500">
                {card.title}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {card.bio && (
          <div className="mb-12 border-l-2 border-black pl-4">
            <p className="text-lg font-medium leading-snug">
              {card.bio}
            </p>
          </div>
        )}

        {/* Contact Links */}
        <div className="space-y-0 border-t-2 border-black">
          {card.email && (
            <a
              href={`mailto:${card.email}`}
              className="flex items-center justify-between py-4 border-b-2 border-black hover:bg-black hover:text-white transition-colors group px-2 -mx-2"
            >
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wide">Email</span>
              </div>
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>
          )}

          {card.phone_number && (
            <a
              href={formatPhoneLink(card.phone_number) || '#'}
              className="flex items-center justify-between py-4 border-b-2 border-black hover:bg-black hover:text-white transition-colors group px-2 -mx-2"
            >
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wide">Phone</span>
              </div>
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>
          )}

          {card.website_url && (
            <a
              href={createValidUrl(card.website_url) || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-4 border-b-2 border-black hover:bg-black hover:text-white transition-colors group px-2 -mx-2"
            >
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5" />
                <span className="font-bold uppercase tracking-wide">Website</span>
              </div>
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </a>
          )}
        </div>

        {/* Socials */}
        {(card.instagram_url || card.facebook_url || (card.whatsapp_enabled && card.whatsapp_number)) && (
          <div className="flex gap-4 mt-12">
            {card.instagram_url && (
              <a
                href={createValidUrl(card.instagram_url) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            )}
            {card.facebook_url && (
              <a
                href={createValidUrl(card.facebook_url) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            )}
            {card.whatsapp_enabled && card.whatsapp_number && (
              <a
                href={createWhatsAppLink(card.whatsapp_number) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            )}
          </div>
        )}

        {/* Save Contact */}
        <div className="mt-12">
          <SaveContactButton
            card={card}
            links={links}
            className="w-full justify-center bg-black text-white py-4 font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors"
            iconClassName="text-current"
          />
        </div>

        {/* Custom Links */}
        {links.length > 0 && (
          <div className="mt-12 space-y-2">
            <p className="font-bold uppercase tracking-widest text-sm mb-4 border-b-2 border-black pb-2 inline-block">
              Links
            </p>
            {links.map((link) => (
              <a
                key={link.id}
                href={createValidUrl(link.value) || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2 hover:translate-x-2 transition-transform"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="font-medium underline decoration-2 underline-offset-4 decoration-black/30 hover:decoration-black">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

