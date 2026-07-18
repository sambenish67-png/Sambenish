import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SectionHeader from '../SectionHeader';
import { GlassCard } from '../Card';
import { INTERESTS_DATA } from '@/utils/data';

const Interests: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="interests"
      className={`py-20 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="What Drives Me"
          title="Interests & Passions"
          description="The technologies and topics that fascinate me"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERESTS_DATA.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    {interest.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold">{interest.title}</h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {interest.description}
                  </p>

                  {/* Bottom accent */}
                  <motion.div
                    className="w-12 h-1 bg-gradient-aurora rounded-full mt-4"
                    animate={{
                      width: [48, 96, 48],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className={`text-lg mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            I'm always excited to collaborate on interesting projects and learn new things!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-aurora text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Let's Build Something Amazing →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Interests;
