'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Zap, Shield, Users } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  icon: React.ReactNode;
  delay?: number;
}

function PricingCard({ title, price, period, description, features, highlighted = false, icon, delay = 0 }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative rounded-2xl p-8 ${highlighted 
        ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white border-2 border-primary-400 shadow-xl scale-105' 
        : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-shadow'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gold-400 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className={`inline-flex p-3 rounded-xl ${highlighted ? 'bg-white/20' : 'bg-primary-50'} mb-4`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold ${highlighted ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        <div className="mt-2">
          <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-slate-900'}`}>
            {price}
          </span>
          <span className={highlighted ? 'text-primary-100' : 'text-slate-500'}>
            {period}
          </span>
        </div>
        <p className={`mt-2 text-sm ${highlighted ? 'text-primary-100' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-primary-200' : 'text-accent-500'}`} />
            <span className={`text-sm ${highlighted ? 'text-primary-100' : 'text-slate-600'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/register"
        className={`block w-full text-center rounded-lg font-semibold py-3 px-6 transition ${highlighted 
          ? 'bg-white text-primary-600 hover:bg-primary-50' 
          : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  );
}

export function PricingSection() {
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
      icon: <Zap className="h-6 w-6 text-primary-600" />,
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
      icon: <Shield className="h-6 w-6 text-primary-600" />,
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
      icon: <Users className="h-6 w-6 text-primary-600" />,
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Choose the plan that fits your cybersecurity journey. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.title}
              {...plan}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              🌍 Africa-First Pricing
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              We offer regional pricing with local currency support (GH₵, $, €) and mobile money payment options. 
              Quality cybersecurity education should be accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  View Regional Pricing
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
