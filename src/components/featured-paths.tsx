'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Terminal, LineChart } from 'lucide-react';

const paths = [
  {
    id: 'path-soc-analyst',
    title: 'SOC Analyst',
    description: 'Master threat detection, incident response, and SIEM tools. The perfect entry point for blue team careers.',
    icon: Shield,
    color: 'from-blue-600 to-cyan-500',
    bg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    duration: '4 months',
    courses: 12,
  },
  {
    id: 'path-pentester',
    title: 'Penetration Tester',
    description: 'Learn ethical hacking, vulnerability assessment, and exploitation techniques. Become a certified red teamer.',
    icon: Terminal,
    color: 'from-red-600 to-orange-500',
    bg: 'bg-red-500/10',
    iconColor: 'text-red-500',
    duration: '6 months',
    courses: 15,
  },
  {
    id: 'path-grc-specialist',
    title: 'GRC Specialist',
    description: 'Governance, Risk, and Compliance. Bridge the gap between technical security and business strategy.',
    icon: LineChart,
    color: 'from-violet-600 to-purple-500',
    bg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    duration: '3 months',
    courses: 8,
  },
];

export function FeaturedPaths() {
  return (
    <section className="py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Featured Learning Paths</h2>
          <p className="mt-1 text-slate-500">Structured curriculums to take you from beginner to job-ready.</p>
        </div>
        <Link href="/paths" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
          View all paths <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {paths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/paths/${path.id}`}
              className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${path.bg}`}>
                <path.icon className={`h-6 w-6 ${path.iconColor}`} />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {path.title}
              </h3>
              
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                {path.description}
              </p>
              
              <div className="mt-4 flex items-center gap-4 text-xs font-medium text-slate-400">
                <span>{path.duration}</span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span>{path.courses} courses</span>
              </div>
              
              <div className={`mt-4 h-1 w-full rounded-full bg-slate-100 overflow-hidden`}>
                <div className={`h-full w-0 transition-all duration-500 group-hover:w-full bg-gradient-to-r ${path.color}`} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 sm:hidden text-center">
        <Link href="/paths" className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700">
          View all paths <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
