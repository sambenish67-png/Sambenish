import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { SOCIAL_LINKS, type SocialPlatform } from '@/utils/data';

const ICONS: Record<SocialPlatform, LucideIcon> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

interface SocialLinksProps {
  platforms?: SocialPlatform[];
  iconSize?: number;
  padding?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  platforms,
  iconSize = 24,
  padding = 'p-3',
}) => {
  const { isDark } = useTheme();
  const links = platforms
    ? SOCIAL_LINKS.filter((link) => platforms.includes(link.platform))
    : SOCIAL_LINKS;

  return (
    <div className="flex gap-4">
      {links.map((link) => {
        const Icon = ICONS[link.platform];

        return (
          <motion.a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            aria-label={link.label}
            title={link.label}
            className={`${padding} rounded-lg transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 hover:shadow-neon'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
          >
            <Icon size={iconSize} />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
