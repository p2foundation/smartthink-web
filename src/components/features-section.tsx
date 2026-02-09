'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, Shield, Users, Rocket, ArrowRight, Monitor, Wifi, Award } from 'lucide-react';

const services = [
  {
    title: 'Training & LMS',
    description:
      'Self-paced and instructor-led courses, hands-on labs, QR-verified certificates, and live Zoom sessions. AI-powered learning paths.',
    icon: GraduationCap,
    href: '/services/training',
    color: 'from-primary-500 to-primary-700',
    iconBg: 'bg-primary-500/10 text-primary-500',
    highlights: ['50+ courses', 'Live labs', 'QR certificates'],
    span: 'md:col-span-2',
  },
  {
    title: 'Consulting',
    description:
      'Enterprise cybersecurity consulting — risk assessments, compliance audits, incident response, and security architecture.',
    icon: Shield,
    href: '/services/consulting',
    color: 'from-accent-500 to-accent-700',
    iconBg: 'bg-accent-500/10 text-accent-500',
    highlights: ['ISO 27001', 'Risk audits', 'Incident response'],
    span: '',
  },
  {
    title: 'Recruitment',
    description:
      'Connect with skills-verified cybersecurity talent across Africa, USA, and Europe. Pre-vetted candidates for your team.',
    icon: Users,
    href: '/services/recruitment',
    color: 'from-amber-500 to-amber-700',
    iconBg: 'bg-amber-500/10 text-amber-500',
    highlights: ['Vetted talent', 'Global reach', 'Fast placement'],
    span: '',
  },
  {
    title: 'Career Development',
    description:
      'Personalized learning paths, mentorship programs, and industry certifications to accelerate your tech career from anywhere.',
    icon: Rocket,
    href: '/services/career',
    color: 'from-violet-500 to-violet-700',
    iconBg: 'bg-violet-500/10 text-violet-500',
    highlights: ['Mentorship', 'Career paths', 'Job placement'],
    span: 'md:col-span-2',
  },
];

const platformFeatures = [
  { icon: Monitor, label: 'Web & Mobile' },
  { icon: Wifi, label: 'Live Zoom sessions' },
  { icon: Award, label: 'Verified certificates' },
  { icon: Shield, label: 'Hands-on labs' },
];

export function FeaturesSection() {
  return (
    <section className="py-14 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-600 mb-4">
            Our Services
          </span>
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              level up
            </span>
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-slate-500">
            Four pillars of excellence — training, consulting, recruitment, and career development — tailored for your region.
          </p>
        </motion.div>

        {/* Platform feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-14"
        >
          {platformFeatures.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
            >
              <f.icon className="h-4 w-4 text-slate-400" />
              {f.label}
            </span>
          ))}
        </motion.div>

        {/* Bento grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={service.span}
            >
              <Link
                href={service.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              >
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 transition-opacity group-hover:opacity-100`} />

                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.iconBg}`}>
                  <service.icon className="h-6 w-6" />
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 transition-colors group-hover:text-primary-600">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-slate-500">
                  {service.description}
                </p>

                {/* Highlight chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:gap-2.5 transition-all">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
