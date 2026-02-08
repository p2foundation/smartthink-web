'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Link from 'next/link';

const regions = [
  { code: 'GH', flag: '\u{1F1EC}\u{1F1ED}', name: 'Ghana & West Africa', currency: 'GH\u20B5', payment: 'Paystack \u00B7 Mobile Money' },
  { code: 'NG', flag: '\u{1F1F3}\u{1F1EC}', name: 'Nigeria', currency: '\u20A6', payment: 'Paystack \u00B7 Bank Transfer' },
  { code: 'US', flag: '\u{1F1FA}\u{1F1F8}', name: 'United States', currency: '$', payment: 'Stripe \u00B7 Card' },
  { code: 'EU', flag: '\u{1F1EA}\u{1F1FA}', name: 'Europe', currency: '\u20AC', payment: 'Stripe \u00B7 SEPA' },
];

export function RegionsStrip() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary-100 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent-100 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-600">
            <Globe className="h-4 w-4" />
            Region-Aware Pricing
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Pay in your local currency
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            We auto-detect your region and show prices you can relate to. No surprises.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {regions.map((r, index) => (
            <motion.div
              key={r.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
            >
              <span className="text-4xl">{r.flag}</span>
              <div className="mt-3 font-display text-2xl font-bold text-primary-600">
                {r.currency}
              </div>
              <div className="mt-1 font-semibold text-slate-900">{r.name}</div>
              <div className="mt-1 text-xs text-slate-400">{r.payment}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-slate-500"
        >
          Set your region in the header to see prices in your currency.{' '}
          <Link href="/pricing" className="font-medium text-primary-600 hover:underline">
            View full pricing
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
