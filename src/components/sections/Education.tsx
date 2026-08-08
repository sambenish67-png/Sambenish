import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { Card } from '../Card';
import { EDUCATION_DATA } from '@/utils/data';
import { loop, revealUp } from '@/utils/motion';
import { gradientHeading, mutedText, strongText } from '@/utils/styles';
import { Calendar, Award } from 'lucide-react';

const Education: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <Section id="education">
      <SectionHeader
        subtitle="My Academic Journey"
        title="Education"
        description="Building a strong foundation through quality education"
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent opacity-20" />

        {/* Education items */}
        <div className="space-y-12">
          {EDUCATION_DATA.map((education, index) => (
            <motion.div
              key={education.id}
              {...revealUp({ delay: index * 0.2 })}
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
                    transition={loop(2, index * 0.3)}
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
                        <p className={`text-lg font-semibold ${gradientHeading}`}>
                          {education.degree}
                        </p>
                      </div>
                      <Award className="text-cyan-400 hidden md:block" size={32} />
                    </div>

                    <p className={`mb-2 text-sm ${mutedText(isDark)}`}>{education.field}</p>

                    <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                      <Calendar size={16} />
                      {education.period}
                    </div>

                    {education.grade && (
                      <p className={`mb-3 font-medium ${strongText(isDark)}`}>
                        {education.grade}
                      </p>
                    )}

                    <p className={`text-sm leading-relaxed ${mutedText(isDark)}`}>
                      {education.description}
                    </p>
                  </div>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Education;
