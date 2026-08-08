export type SectionSurface = 'default' | 'muted' | 'deep';

const SECTION_SURFACES: Record<SectionSurface, { dark: string; light: string }> = {
  default: { dark: 'bg-slate-900', light: 'bg-white' },
  muted: { dark: 'bg-slate-800/50', light: 'bg-slate-50' },
  deep: { dark: 'bg-slate-950', light: 'bg-slate-50' },
};

/** Background of a full-width page section. */
export const sectionSurface = (isDark: boolean, surface: SectionSurface = 'default') =>
  isDark ? SECTION_SURFACES[surface].dark : SECTION_SURFACES[surface].light;

/** Secondary body copy colour. */
export const mutedText = (isDark: boolean) => (isDark ? 'text-slate-400' : 'text-slate-600');

/** Slightly stronger body copy colour, for emphasised lines. */
export const strongText = (isDark: boolean) => (isDark ? 'text-slate-300' : 'text-slate-700');

/** Translucent card background with border, shared by Card and StatCard. */
export const cardSurface = (isDark: boolean) =>
  isDark
    ? 'bg-slate-800/50 border border-slate-700/50'
    : 'bg-white/50 border border-slate-200/50';

/** Square icon/toggle button background. */
export const iconButtonSurface = (isDark: boolean) =>
  isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200';

/** Text input / textarea styling for the contact form. */
export const inputField = (isDark: boolean) =>
  `w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:scale-105 ${
    isDark
      ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-400'
      : 'bg-slate-100 border-slate-300 focus:border-cyan-400'
  }`;

/** Rounded filter pill, highlighted when active. */
export const filterPill = (isDark: boolean, isActive: boolean) =>
  `px-6 py-2 rounded-full font-medium transition-all ${
    isActive
      ? 'bg-gradient-aurora text-white shadow-neon'
      : isDark
      ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
      : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
  }`;

/** Aurora gradient call-to-action anchor. */
export const ctaLink = (size: 'md' | 'lg' = 'md') =>
  `inline-flex items-center gap-2 ${
    size === 'lg' ? 'px-8 py-3' : 'px-6 py-3'
  } rounded-lg bg-gradient-aurora text-white font-semibold hover:shadow-lg transition-all hover:scale-105`;

/** Section heading rendered with the aurora gradient. */
export const gradientHeading = 'bg-gradient-aurora bg-clip-text text-transparent';
