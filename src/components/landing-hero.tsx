'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Globe, Smartphone } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#0a0f1a]">
      {/* Gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 h-[300px] w-[300px] rounded-full bg-primary-500/15 blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#0a0f1a_70%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/50 bg-slate-800/50 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Africa-anchored · Global reach
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/50 bg-slate-800/50 px-4 py-1.5 backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5" />
              GH · NG · US · EU
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/50 bg-slate-800/50 px-4 py-1.5 backdrop-blur-sm">
              <Smartphone className="h-3.5 w-3.5" />
              Mobile-first · WhatsApp
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Cybersecurity training{' '}
            <span className="bg-gradient-to-r from-accent-400 via-accent-300 to-primary-400 bg-clip-text text-transparent">
              that moves with you
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 text-lg text-slate-400 sm:text-xl md:max-w-2xl md:mx-auto"
          >
            On-demand courses and live Zoom sessions. Hands-on labs, QR-verified certificates,
            and region-specific pricing. Built for learners from Accra to Austin.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/register"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-600/25 transition hover:from-accent-500 hover:to-accent-400 hover:shadow-accent-500/30 sm:text-lg"
            >
              Start learning free
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 bg-slate-800/50 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-slate-400 hover:bg-slate-700/50 sm:text-lg"
            >
              Browse courses
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {[
              { value: '5,000+', label: 'Active learners' },
              { value: '50+', label: 'Courses' },
              { value: '15+', label: 'Countries' },
              { value: '94%', label: 'Cert pass rate' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {value}
                </div>
                <div className="mt-0.5 text-sm text-slate-500">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into light section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}
