import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Award } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import SectionHeader from '../SectionHeader';
import { GlassCard } from '../Card';
import Button from '../Button';

const INTERNSHIPS = [
  {
    id: 1,
    company: 'App Innovation & AI Tech',
    role: 'UI/UX Design Intern',
    duration: '15 Days',
    description: [
      'Completed intensive UI/UX Design training.',
      'Designed responsive mobile and web interfaces.',
      'Created wireframes, prototypes, and modern user experiences.',
      'Learned design principles, color theory, typography, and usability.',
      'Worked with modern UI/UX design workflows and best practices.',
    ],
    tech: ['Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    certificate: '#',
  },
  {
    id: 2,
    company: 'App Innovation & AI Tech',
    role: 'React Native & Web Developer Intern',
    duration: '3 Months',
    description: [
      'Developed cross-platform mobile applications using React Native.',
      'Built responsive websites using React.js, HTML, CSS, and JavaScript.',
      'Integrated Firebase services and REST APIs.',
      'Developed reusable components and optimized application performance.',
      'Collaborated on real-world development projects using industry best practices.',
    ],
    tech: ['React Native', 'React.js', 'JavaScript', 'HTML5', 'CSS3', 'Firebase', 'Git'],
    certificate: '#',
  },
];

const Internships: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="internships"
      className={`relative py-20 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-grid-pattern" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="💼 Internship Experience"
          title="Internship" 
          description="Hands-on industry experience building product designs and developer-first applications."
        />

        <div className="mt-8 space-y-8">
          {INTERNSHIPS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative"
            >
              <div className="absolute left-[-2.5rem] top-6 hidden md:block">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 flex items-center justify-center border border-white/10 shadow-neon">
                  <Briefcase size={20} className="text-cyan-200" />
                </div>
              </div>

              <GlassCard className="p-6 md:pl-20">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-semibold text-white">{item.role}</h4>
                      <span className="text-sm text-slate-400">@ {item.company}</span>
                    </div>

                    <div className="mt-3 space-y-2 text-sm text-slate-300">
                      {item.description.map((d, i) => (
                        <p key={i}>• {d}</p>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 px-3 py-2 text-xs text-cyan-200 border border-white/10">
                      <Calendar size={14} />
                      {item.duration}
                    </div>

                    <div className="mt-2">
                      <Button as="a" href={item.certificate} target="_blank" rel="noopener noreferrer" variant="outline">
                        <Award size={16} />&nbsp;Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internships;
