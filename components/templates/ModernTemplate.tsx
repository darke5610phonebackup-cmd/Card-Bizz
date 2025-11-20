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
  Share2,
} from 'lucide-react';
import Image from 'next/image';

import { SaveContactButton } from '@/components/SaveContactButton';
import { createValidUrl, createWhatsAppLink, formatPhoneLink, getInitials } from '@/lib/utils';

import { TemplateRendererProps } from './types';

export function ModernTemplate({ card, links }: TemplateRendererProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gray-50">
      <div className="w-full max-w-md relative">

        {/* Background Blur Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-3xl opacity-20 -z-10" />

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-violet-900/10 overflow-hidden border border-white/50 backdrop-blur-sm">

          {/* Header Image / Gradient */}
          <div className="h-48 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Profile Section */}
          <div className="px-8 pb-8 -mt-20 relative">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative p-1.5 bg-white rounded-3xl shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                {card.avatar_url ? (
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={card.avatar_url}
                      alt={card.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center text-4xl font-bold text-violet-600">
                    {getInitials(card.full_name)}
                  </div>
                )}
              </div>

              {/* Name & Info */}
              <div className="text-center mt-6 space-y-2">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {card.full_name}
                </h1>
                {card.title && (
                  <p className="text-violet-600 font-medium bg-violet-50 px-3 py-1 rounded-full inline-block text-sm">
                    {card.title}
                  </p>
                )}
                {card.company && (
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm pt-1">
                    <Building2 className="w-4 h-4" />
                    <span>{card.company}</span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {card.bio && (
                <p className="text-center text-gray-600 text-sm mt-4 leading-relaxed max-w-xs mx-auto">
                  {card.bio}
                </p>
              )}

              {/* Main Actions Grid */}
              <div className="grid grid-cols-4 gap-3 w-full mt-8">
                {card.email && (
                  <a
                    href={`mailto:${card.email}`}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-violet-50 hover:text-violet-600 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 group-hover:text-violet-600 group-hover:scale-110 transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 group-hover:text-violet-600">Email</span>
                  </a>
                )}
                {card.phone_number && (
                  <a
                    href={formatPhoneLink(card.phone_number) || '#'}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-violet-50 hover:text-violet-600 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 group-hover:text-violet-600 group-hover:scale-110 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 group-hover:text-violet-600">Call</span>
                  </a>
                )}
                {card.website_url && (
                  <a
                    href={createValidUrl(card.website_url) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-violet-50 hover:text-violet-600 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 group-hover:text-violet-600 group-hover:scale-110 transition-all">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 group-hover:text-violet-600">Web</span>
                  </a>
                )}
                {(card.whatsapp_enabled && card.whatsapp_number) && (
                  <a
                    href={createWhatsAppLink(card.whatsapp_number) || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gray-50 hover:bg-violet-50 hover:text-violet-600 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 group-hover:text-violet-600 group-hover:scale-110 transition-all">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 group-hover:text-violet-600">Chat</span>
                  </a>
                )}
              </div>

              {/* Save Contact Button */}
              <div className="w-full mt-6">
                <SaveContactButton
                  card={card}
                  links={links}
                  className="w-full justify-center rounded-2xl bg-gray-900 py-4 text-white font-bold shadow-xl shadow-gray-900/20 hover:bg-gray-800 hover:scale-[1.02] transition-all active:scale-95"
                  iconClassName="text-violet-400"
                />
              </div>

              {/* Social Links */}
              {(card.instagram_url || card.facebook_url) && (
                <div className="flex gap-4 mt-8">
                  {card.instagram_url && (
                    <a
                      href={createValidUrl(card.instagram_url) || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                  {card.facebook_url && (
                    <a
                      href={createValidUrl(card.facebook_url) || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  )}
                </div>
              )}

              {/* Custom Links List */}
              {links.length > 0 && (
                <div className="w-full mt-8 space-y-3">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={createValidUrl(link.value) || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-violet-100 transition-all group"
                    >
                      <span className="font-medium text-gray-700 group-hover:text-violet-700 transition-colors">{link.label}</span>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-violet-50 transition-colors">
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-violet-600" />
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* Branding Footer */}
              <div className="mt-8 mb-2 flex items-center gap-2 opacity-30 hover:opacity-60 transition-opacity">
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-widest">Virtual Card</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

