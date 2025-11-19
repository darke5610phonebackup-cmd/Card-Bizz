import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Create a valid URL from user input
 */
export function createValidUrl(url: string | null): string | null {
  if (!url) return null;

  // If URL doesn't start with http/https, add https
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
}

/**
 * Format phone number for tel: link
 */
export function formatPhoneLink(phone: string | null): string | null {
  if (!phone) return null;
  // Remove all non-numeric characters
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

/**
 * Create WhatsApp link
 */
export function createWhatsAppLink(phone: string | null): string | null {
  if (!phone) return null;
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  return `https://wa.me/${cleanPhone}`;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
