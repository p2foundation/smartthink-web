'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, Shield, Users, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  delay?: number;
}

function FeatureCard({ title, description, icon, href, color, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Link
        href={href}
        className="group block rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
      >
        <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
          {icon}
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900 transition-colors group-hover:text-primary-600">
          {title}
        </h3>
        <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
          Learn more
          <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </motion.div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      title: 'Training & LMS',
      description:
        'Self-paced and instructor-led courses, hands-on labs, QR-verified certificates, and live Zoom sessions. AI-powered learning paths.',
      icon: <GraduationCap className="h-6 w-6 text-primary-600" />,
      href: '/services/training',
      color: 'bg-primary-50 text-primary-600',
    },
    {
      title: 'Consulting',
      description:
        'Enterprise cybersecurity consulting — risk assessments, compliance audits, incident response, and security architecture.',
      icon: <Shield className="h-6 w-6 text-accent-600" />,
      href: '/services/consulting',
      color: 'bg-accent-50 text-accent-600',
    },
    {
      title: 'Recruitment',
      description:
        'Connect with skills-verified cybersecurity talent across Africa, USA, and Europe. Pre-vetted candidates for your team.',
      icon: <Users className="h-6 w-6 text-amber-600" />,
      href: '/services/recruitment',
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            How we serve you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Three pillars of cybersecurity excellence — training, consulting, and talent — tailored for your region.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            Explore all courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
