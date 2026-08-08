import React from 'react';
import { motion } from 'framer-motion';
import Section from '../Section';
import SectionHeader from '../SectionHeader';
import { GlassCard } from '../Card';
import { revealUp } from '@/utils/motion';

const PROJECT_OVERVIEW = {
  title: 'Aurora Calm',
  role: 'Full-Stack Mobile App Developer',
  description:
    'Aurora Calm is a modern cross-platform meditation and wellness application built using React Native, Expo, and Firebase. The application helps users reduce stress, improve focus, build mindfulness habits, and enhance sleep quality through guided meditation sessions, breathing exercises, calming soundscapes, personalized themes, and progress tracking.',
};

const HIGHLIGHTS = [
  { label: 'Role', value: PROJECT_OVERVIEW.role },
  { label: 'Experience', value: 'Mindful UI & Motion' },
];

const DESIGN_DETAILS = [
  'Soft gradients, glowing accents, and premium glass surfaces create a calm, polished experience.',
  'Unique floating elements and depth layers give the section a distinctive visual identity.',
];

const ProjectOverview: React.FC = () => {
  return (
    <Section
      id="projects"
      surface="deep"
      padding="py-24"
      maxWidth="max-w-5xl"
      className="overflow-hidden"
      background={
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(124,58,237,0.22),transparent_28%),radial-gradient(circle_at_right_bottom,rgba(6,182,212,0.18),transparent_28%)] pointer-events-none" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-16 left-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-16 right-8 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
        </>
      }
    >
      <SectionHeader
        subtitle="Project Overview"
        title={PROJECT_OVERVIEW.title}
        description="A premium AI-powered meditation and wellness mobile application with a thoughtful, glassmorphism-inspired UX."
      />

      <motion.div
        {...revealUp({ duration: 0.8, distance: 40 })}
        className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr]"
      >
          <GlassCard className="relative overflow-hidden p-8 lg:p-10">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cyan-400/10 to-transparent" />
            <div className="absolute right-6 top-8 h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-400/20 to-violet-500/0 blur-3xl" />
            <div className="relative z-10 space-y-8">
              <div className="flex flex-wrap items-center gap-3 rounded-full border border-white/10 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-cyan-200 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                Project Highlight
              </div>

              <div className="space-y-5">
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">{PROJECT_OVERVIEW.title}</h1>
                <p className="max-w-3xl text-slate-300 leading-8">{PROJECT_OVERVIEW.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {HIGHLIGHTS.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                  >
                    <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{highlight.label}</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{highlight.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard className="p-8 shadow-[0_40px_90px_rgba(15,23,42,0.2)]">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">About the Project</h3>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200">2026</span>
              </div>
              <p className="mt-4 text-slate-300 leading-7">{PROJECT_OVERVIEW.description}</p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white">Design Details</h3>
              <div className="mt-6 space-y-4">
                {DESIGN_DETAILS.map((detail) => (
                  <div
                    key={detail}
                    className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <p className="text-sm text-slate-300">{detail}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
      </motion.div>
    </Section>
  );
};

export default ProjectOverview;
