'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Star, Quote, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  country: string;
  content: string;
  rating: number;
  avatar: string;
  service: string;
}

function TestimonialCard({ name, role, company, country, content, rating, avatar, service }: TestimonialProps) {
  return (
    <div className="flex w-[300px] sm:w-[340px] flex-shrink-0 flex-col rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 snap-start">
      {/* Service tag */}
      <span className="mb-4 inline-flex w-fit items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
        {service}
      </span>

      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-gold-400 text-gold-400' : 'text-slate-200'}`}
          />
        ))}
      </div>

      <div className="relative mb-5 flex-1">
        <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary-100" />
        <p className="pl-5 text-sm text-slate-600 leading-relaxed">{content}</p>
      </div>

      <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-accent-400 text-sm font-semibold text-white">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{name}</p>
          <p className="text-xs text-slate-500">
            {role}, {company} &middot; {country}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const testimonials = [
    {
      name: 'Ama Osei',
      role: 'Security Analyst',
      company: 'Ghana Tech Ltd',
      country: 'Ghana',
      content: 'SmartThink\'s hands-on labs and real-world scenarios prepared me for my CEH certification. The WhatsApp support is incredible — they respond within minutes!',
      rating: 5,
      avatar: 'AO',
      service: 'Training',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'SecureNet Solutions',
      country: 'USA',
      content: 'We hired 3 cybersecurity professionals through SmartThink\'s recruitment service. All were pre-vetted and hit the ground running. Game-changer for our startup.',
      rating: 5,
      avatar: 'MC',
      service: 'Recruitment',
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'IT Security Manager',
      company: 'Dubai Corp',
      country: 'UAE',
      content: 'The consulting services helped us achieve ISO 27001 certification in record time. Their understanding of regional compliance requirements is unmatched.',
      rating: 5,
      avatar: 'FA',
      service: 'Consulting',
    },
    {
      name: 'Kwame Mensah',
      role: 'Junior Developer',
      company: 'Freelance',
      country: 'Ghana',
      content: 'The career development program gave me a clear path from junior dev to security engineer. The mentorship and job placement support made all the difference.',
      rating: 5,
      avatar: 'KM',
      service: 'Career Development',
    },
    {
      name: 'Sarah Johnson',
      role: 'CISO',
      company: 'FinTech Corp',
      country: 'UK',
      content: 'We onboarded our entire security team through SmartThink. The custom learning paths and progress tracking saved us months of training coordination.',
      rating: 5,
      avatar: 'SJ',
      service: 'Training',
    },
    {
      name: 'Chidi Okafor',
      role: 'SOC Lead',
      company: 'Zenith Systems',
      country: 'Nigeria',
      content: 'Paying in Naira with Paystack was seamless. No currency conversion headaches. The courses are world-class and the pricing is fair for our region.',
      rating: 5,
      avatar: 'CO',
      service: 'Training',
    },
  ];

  return (
    <section className="py-14 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between"
        >
          <div>
            <span className="inline-block rounded-full bg-gold-400/10 px-4 py-1.5 text-sm font-medium text-gold-600 mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Trusted by professionals{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                worldwide
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-slate-500">
              From Accra to Austin — hear how SmartThink helps teams level up.
            </p>
          </div>

          {/* Scroll arrows (desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll carousel — full-bleed */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 p-8 sm:p-10"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { label: 'Student Satisfaction', value: '98%' },
              { label: 'Job Placement Rate', value: '87%' },
              { label: 'Average Salary Increase', value: '45%' },
              { label: 'Companies Served', value: '500+' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 mb-5">
            Ready to write your own success story?
          </p>
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
