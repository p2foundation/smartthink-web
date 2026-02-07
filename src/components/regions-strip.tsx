'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Link from 'next/link';

const regions = [
  { code: 'GH', name: 'Ghana & Africa', currency: 'GH₵', payment: 'Paystack, Mobile Money' },
  { code: 'NG', name: 'Nigeria', currency: '₦', payment: 'Paystack, Bank' },
  { code: 'US', name: 'United States', currency: '$', payment: 'Stripe' },
  { code: 'EU', name: 'Europe', currency: '€', payment: 'Stripe' },
];

export function RegionsStrip() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 mb-8">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Serving your region</span>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {regions.map((r) => (
              <motion.div
                key={r.code}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="font-display text-2xl font-bold text-primary-600">
                  {r.currency}
                </div>
                <div className="mt-1 font-medium text-slate-900">{r.name}</div>
                <div className="mt-0.5 text-xs text-slate-500">{r.payment}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Set your region in the header to see prices in your currency.{' '}
            <Link href="/pricing" className="font-medium text-primary-600 hover:underline">View pricing</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
