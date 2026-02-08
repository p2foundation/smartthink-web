'use client';

import { motion } from 'framer-motion';
import { UserPlus, BookOpen, Award, Briefcase } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Sign up in seconds. We auto-detect your region for local pricing and payment options.',
    icon: UserPlus,
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
  },
  {
    number: '02',
    title: 'Choose your path',
    description: 'Pick from 50+ courses, consulting packages, or recruitment services tailored to your goals.',
    icon: BookOpen,
    color: 'text-accent-500',
    bg: 'bg-accent-500/10',
  },
  {
    number: '03',
    title: 'Learn & build skills',
    description: 'Hands-on labs, live Zoom sessions, and mentorship. Track progress on web or mobile.',
    icon: Award,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    number: '04',
    title: 'Advance your career',
    description: 'Earn QR-verified certificates, get placed through our recruitment network, or level up your team.',
    icon: Briefcase,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-600 mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            From sign-up to{' '}
            <span className="bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent">
              success
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Whether you're learning, hiring, or consulting — getting started takes minutes.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] hidden h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-violet-200 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                {/* Step icon */}
                <div className="relative mx-auto mb-6">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg} ring-4 ring-white`}>
                    <step.icon className={`h-7 w-7 ${step.color}`} />
                  </div>
                  <span className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold ${step.color} shadow-sm ring-1 ring-slate-100`}>
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
