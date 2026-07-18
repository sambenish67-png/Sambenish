import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SectionHeader from '../SectionHeader';
import StatCard from '../StatCard';
import { Card } from '../Card';
import { ABOUT_DATA } from '@/utils/data';

const About: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`py-20 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Know Me Better"
          title="About Me"
          description="Learn more about my background, passion, and career objective"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Image/Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-aurora bg-clip-text text-transparent">
                Professional Summary
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {ABOUT_DATA.summary}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3 bg-gradient-aurora bg-clip-text text-transparent">
                Career Objective
              </h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {ABOUT_DATA.objective}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-aurora text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Let's Connect →
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Statistics */}
        {ABOUT_DATA.stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">What I'm Passionate About</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🤖', title: 'AI & Machine Learning', desc: 'Building intelligent systems' },
              { emoji: '📱', title: 'Mobile Development', desc: 'Creating amazing app experiences' },
              { emoji: '🎨', title: 'UI/UX Design', desc: 'Crafting beautiful interfaces' },
            ].map((item, index) => (
              <Card key={item.title} delay={index * 0.1}>
                <div className="p-6 text-center">
                  <div className="text-5xl mb-3">{item.emoji}</div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
