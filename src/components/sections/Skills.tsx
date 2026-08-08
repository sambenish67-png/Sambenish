import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { Card } from '../Card';
import { ProgressBar, CircularProgress } from '../ProgressBar';
import { SKILLS_DATA } from '@/utils/data';
import { revealUp } from '@/utils/motion';
import { filterPill, mutedText } from '@/utils/styles';

const Skills: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = SKILLS_DATA.map(s => s.category);
  const filteredSkills = selectedCategory
    ? SKILLS_DATA.filter(s => s.category === selectedCategory)
    : SKILLS_DATA;

  return (
    <Section id="skills" surface="muted">
      <SectionHeader
        subtitle="My Technical Arsenal"
        title="Skills & Expertise"
        description="Technologies and tools I work with"
      />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[null, ...categories].map((category) => (
          <button
            key={category ?? 'all'}
            onClick={() => setSelectedCategory(category)}
            className={filterPill(isDark, selectedCategory === category)}
          >
            {category ?? 'All Skills'}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSkills.map((skillGroup, index) => (
          <motion.div key={skillGroup.category} {...revealUp({ delay: index * 0.1 })}>
            <Card>
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-4xl mb-2">{skillGroup.icon}</div>
                    <h3 className="text-2xl font-bold">{skillGroup.category}</h3>
                  </div>
                  <div className="w-32">
                    <CircularProgress
                      percentage={skillGroup.proficiency}
                      size={100}
                      label={`${skillGroup.proficiency}%`}
                    />
                  </div>
                </div>

                {/* Skills List */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {skillGroup.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all hover:scale-110 ${
                          isDark
                            ? 'bg-slate-700/50 border-cyan-400/30 text-cyan-300 hover:border-cyan-400 hover:shadow-neon'
                            : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <ProgressBar percentage={skillGroup.proficiency} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Skills Info */}
      <motion.div {...revealUp({ delay: 0.4 })} className="mt-16 text-center">
        <p className={`text-lg ${mutedText(isDark)}`}>
          I'm constantly learning and exploring new technologies to stay updated with industry trends.
        </p>
      </motion.div>
    </Section>
  );
};

export default Skills;
