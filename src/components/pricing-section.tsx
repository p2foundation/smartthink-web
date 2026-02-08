'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Zap, Shield, Users, ArrowRight } from 'lucide-react';

const plans = [
  {
    title: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for getting started',
    features: [
      'Access to 5 free courses',
      'Basic cybersecurity fundamentals',
      'Community support',
      'Certificate of completion',
      'Mobile app access',
    ],
    icon: Zap,
    iconColor: 'text-primary-600',
    highlighted: false,
  },
  {
    title: 'Professional',
    price: '$49',
    period: '/month',
    description: 'For serious cybersecurity professionals',
    features: [
      'Access to all 50+ courses',
      'Hands-on labs and simulations',
      'Industry certifications prep',
      '1-on-1 mentorship sessions',
      'Priority support',
      'Resume builder & career services',
      'WhatsApp priority support',
    ],
    icon: Shield,
    iconColor: 'text-white',
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and organizations',
    features: [
      'Everything in Professional',
      'Custom learning paths',
      'Team management dashboard',
      'Dedicated account manager',
      'On-premise deployment options',
      'Custom integrations',
      'SLA guarantees',
    ],
    icon: Users,
    iconColor: 'text-primary-600',
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-600 mb-4">
            Pricing
          </span>
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Choose the plan that fits your journey. No hidden fees, cancel anytime. Regional pricing available.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 ${plan.highlighted
                ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white shadow-2xl shadow-primary-600/20 ring-2 ring-primary-400/50 md:-mt-4 md:mb-[-16px]'
                : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gold-400 px-4 py-1.5 text-xs font-bold text-slate-900 shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-xl ${plan.highlighted ? 'bg-white/20' : 'bg-primary-50'} mb-4`}>
                  <plan.icon className={`h-6 w-6 ${plan.iconColor}`} />
                </div>
                <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.title}
                </h3>
                <div className="mt-3">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={plan.highlighted ? 'text-primary-100' : 'text-slate-500'}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-primary-100' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-accent-300' : 'text-accent-500'}`} />
                    <span className={`text-sm ${plan.highlighted ? 'text-primary-100' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`block w-full text-center rounded-xl font-semibold py-3.5 px-6 transition-all ${plan.highlighted
                  ? 'bg-white text-primary-600 hover:bg-primary-50 shadow-lg'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Regional pricing note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 text-center"
        >
          <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
            Africa-First Pricing
          </h3>
          <p className="text-slate-500 mb-6 max-w-2xl mx-auto">
            We offer regional pricing with local currency support (GH₵, ₦, $, €) and mobile money payment options.
            Quality education should be accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              View Regional Pricing
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Contact Sales
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
