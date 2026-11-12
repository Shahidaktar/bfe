export const CONTACT = {
  phoneDisplay: '+91 (989) 234-4001',
  phoneTel: '+919892344001',
  whatsappNumber: '919892344001',
  email: 'info@beyondforever.earth',
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61552094325712',
  instagram: 'https://www.instagram.com/beyondforever.earth/',
  youtube: 'https://www.youtube.com/@beyondforeverearth',
  linkedin: 'https://www.linkedin.com/company/beyondforeverearth/',
} as const;

export const LEGAL_LINKS = {
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
} as const;

const SPECIALIST_MESSAGE =
  'Hello Beyond Forever Earth, I would like to speak with a travel specialist about planning a journey.';

export function whatsappLink(message: string = SPECIALIST_MESSAGE): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function openExternal(url: string) {
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
}
