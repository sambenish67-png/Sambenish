import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import StatCard from '../StatCard';
import { Card } from '../Card';
import { ABOUT_DATA } from '@/utils/data';
import { revealFade, revealFromLeft, revealFromRight, revealUp } from '@/utils/motion';
import { ctaLink, gradientHeading, mutedText } from '@/utils/styles';

const PASSIONS = [
  { emoji: '🤖', title: 'AI & Machine Learning', desc: 'Building intelligent systems' },
  { emoji: '📱', title: 'Mobile Development', desc: 'Creating amazing app experiences' },
  { emoji: '🎨', title: 'UI/UX Design', desc: 'Crafting beautiful interfaces' },
];

const About: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <Section id="about" surface="muted">
      <SectionHeader
        subtitle="Know Me Better"
        title="About Me"
        description="Learn more about my background, passion, and career objective"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Left side - Image/Avatar */}
        <motion.div {...revealFromLeft()} className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-aurora rounded-3xl blur-3xl opacity-30 animate-pulse-glow" />
            <div className={`relative rounded-3xl overflow-hidden border-4 border-transparent bg-gradient-to-br from-cyan-400 to-purple-600 p-1 ${
              isDark ? 'bg-slate-700' : 'bg-white'
            }`}>
              <div className="w-full h-full rounded-2xl flex items-center justify-center text-8xl">
                🚀
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div {...revealFromRight()} className="space-y-6">
          <div>
            <h3 className={`text-2xl font-bold mb-3 ${gradientHeading}`}>
              Professional Summary
            </h3>
            <p className={`text-base leading-relaxed ${mutedText(isDark)}`}>
              {ABOUT_DATA.summary}
            </p>
          </div>

          <div>
            <h3 className={`text-2xl font-bold mb-3 ${gradientHeading}`}>
              Career Objective
            </h3>
            <p className={`text-base leading-relaxed ${mutedText(isDark)}`}>
              {ABOUT_DATA.objective}
            </p>
          </div>

          <motion.div {...revealFade({ delay: 0.3 })}>
            <a href="#contact" className={ctaLink()}>
              Let's Connect →
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Statistics */}
      {ABOUT_DATA.stats.length > 0 && (
        <motion.div {...revealUp()}>
          <h3 className="text-3xl font-bold mb-8 text-center">By The Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ABOUT_DATA.stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Key Skills Highlight */}
      <motion.div {...revealFade({ delay: 0.4 })} className="mt-16">
        <h3 className="text-3xl font-bold mb-8 text-center">What I'm Passionate About</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PASSIONS.map((item, index) => (
            <Card key={item.title} delay={index * 0.1}>
              <div className="p-6 text-center">
                <div className="text-5xl mb-3">{item.emoji}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className={`text-sm ${mutedText(isDark)}`}>{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default About;
