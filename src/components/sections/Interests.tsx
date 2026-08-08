import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { GlassCard } from '../Card';
import { INTERESTS_DATA } from '@/utils/data';
import { loop, revealFade, revealUp } from '@/utils/motion';
import { ctaLink, mutedText } from '@/utils/styles';

const Interests: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <Section id="interests" surface="muted">
      <SectionHeader
        subtitle="What Drives Me"
        title="Interests & Passions"
        description="The technologies and topics that fascinate me"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTERESTS_DATA.map((interest, index) => (
          <motion.div
            key={interest.id}
            {...revealUp({ delay: index * 0.1, duration: 0.5 })}
            whileHover={{ scale: 1.02, rotateZ: 2 }}
          >
            <GlassCard gradient delay={index * 0.1}>
              <div className="p-8 h-full flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <motion.div
                  className="text-6xl"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={loop(3, index * 0.2)}
                >
                  {interest.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold">{interest.title}</h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${mutedText(isDark)}`}>
                  {interest.description}
                </p>

                {/* Bottom accent */}
                <motion.div
                  className="w-12 h-1 bg-gradient-aurora rounded-full mt-4"
                  animate={{ width: [48, 96, 48] }}
                  transition={loop(2, index * 0.2)}
                />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div {...revealFade({ delay: 0.5 })} className="mt-16 text-center">
        <p className={`text-lg mb-6 ${mutedText(isDark)}`}>
          I'm always excited to collaborate on interesting projects and learn new things!
        </p>
        <a href="#contact" className={ctaLink('lg')}>
          Let's Build Something Amazing →
        </a>
      </motion.div>
    </Section>
  );
};

export default Interests;
