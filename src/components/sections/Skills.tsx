import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SectionHeader from '../SectionHeader';
import { Card } from '../Card';
import { ProgressBar, CircularProgress } from '../ProgressBar';
import { SKILLS_DATA } from '@/utils/data';

const Skills: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = SKILLS_DATA.map(s => s.category);
  const filteredSkills = selectedCategory
    ? SKILLS_DATA.filter(s => s.category === selectedCategory)
    : SKILLS_DATA;

  return (
    <section
      id="skills"
      className={`py-20 ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="My Technical Arsenal"
          title="Skills & Expertise"
          description="Technologies and tools I work with"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-gradient-aurora text-white shadow-neon'
                : isDark
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            All Skills
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-aurora text-white shadow-neon'
                  : isDark
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSkills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            I'm constantly learning and exploring new technologies to stay updated with industry trends.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
