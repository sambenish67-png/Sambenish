import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import SectionHeader from '../SectionHeader';
import { Card } from '../Card';
import { EDUCATION_DATA } from '@/utils/data';
import { Calendar, Award } from 'lucide-react';

const Education: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="education"
      className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="My Academic Journey"
          title="Education"
          description="Building a strong foundation through quality education"
        />

        <div className="relative">
          {/* Timeline line */}
          <div
            className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent opacity-20`}
          />

          {/* Education items */}
          <div className="space-y-12">
            {EDUCATION_DATA.map((education, index) => (
              <motion.div
                key={education.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="flex-1 flex justify-center md:block">
                  <div className="relative z-10 flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 rounded-full bg-gradient-aurora shadow-glow"
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: ['0 0 10px rgba(16, 185, 129, 0.5)', '0 0 20px rgba(16, 185, 129, 1)', '0 0 10px rgba(16, 185, 129, 0.5)'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <Card delay={index * 0.2}>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-3 justify-between">
                        <div>
                          <h3 className="text-2xl font-bold">{education.institution}</h3>
                          <p className="text-lg font-semibold bg-gradient-aurora bg-clip-text text-transparent">
                            {education.degree}
                          </p>
                        </div>
                        <Award className="text-cyan-400 hidden md:block" size={32} />
                      </div>

                      <p className={`mb-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {education.field}
                      </p>

                      <div className={`flex items-center gap-2 mb-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        <Calendar size={16} />
                        {education.period}
                      </div>

                      {education.grade && (
                        <p className={`mb-3 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {education.grade}
                        </p>
                      )}

                      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {education.description}
                      </p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
