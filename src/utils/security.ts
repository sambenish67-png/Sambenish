const SAFE_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

export const sanitizeHref = (href?: string): string | undefined => {
  if (!href) return undefined;
  const value = href.trim();
  if (value.startsWith('#') || value.startsWith('/')) return value;

  try {
    const url = new URL(value, window.location.origin);
    return SAFE_PROTOCOLS.includes(url.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
};
