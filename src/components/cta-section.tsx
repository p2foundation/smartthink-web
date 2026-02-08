'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Users, GraduationCap } from 'lucide-react';

export function CallToActionSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f1a] py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] rounded-full bg-primary-600/15 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl"
          >
            Ready to transform your{' '}
            <span className="bg-gradient-to-r from-accent-400 via-accent-300 to-primary-400 bg-clip-text text-transparent">
              tech career?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-2xl text-lg text-slate-400"
          >
            Join thousands of professionals across Africa, the US, and Europe who advanced with SmartThink — training, consulting, recruitment, and career development built for your region.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
          >
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-accent-400" />
              50+ courses
            </span>
            <span className="inline-flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent-400" />
              QR-verified certs
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-accent-400" />
              5,000+ learners
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/register"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-600 to-accent-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-600/25 transition hover:from-accent-500 hover:to-accent-400 hover:shadow-accent-500/30 sm:text-lg"
            >
              Start free
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 bg-slate-800/50 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-slate-400 hover:bg-slate-700/50 sm:text-lg"
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
