'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  country: string;
  content: string;
  rating: number;
  avatar: string;
  delay?: number;
}

function TestimonialCard({ name, role, company, country, content, rating, avatar, delay = 0 }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-gold-400 text-gold-400' : 'text-slate-300'}`}
          />
        ))}
      </div>
      
      <div className="relative mb-4">
        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary-200" />
        <p className="text-slate-600 italic relative z-10">{content}</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-semibold">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="text-sm text-slate-500">
            {role} at {company} • {country}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Ama Osei',
      role: 'Security Analyst',
      company: 'Ghana Tech Ltd',
      country: 'Ghana',
      content: 'SmartThink\'s hands-on labs and real-world scenarios prepared me for my CEH certification. The WhatsApp support is incredible - they respond within minutes!',
      rating: 5,
      avatar: 'AO',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'SecureNet Solutions',
      country: 'USA',
      content: 'We hired 3 cybersecurity professionals through SmartThink\'s recruitment service. All were pre-vetted and hit the ground running. Game-changer for our startup.',
      rating: 5,
      avatar: 'MC',
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'IT Security Manager',
      company: 'Dubai Corp',
      country: 'UAE',
      content: 'The consulting services helped us achieve ISO 27001 certification in record time. Their understanding of regional compliance requirements is unmatched.',
      rating: 5,
      avatar: 'FA',
    },
    ];

  return (
    <section className="py-20 bg-white">
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
            Trusted by professionals worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Join thousands of cybersecurity experts who advanced their careers with SmartThink
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 p-8 text-white"
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {[
              { label: 'Student Satisfaction', value: '98%' },
              { label: 'Job Placement Rate', value: '87%' },
              { label: 'Average Salary Increase', value: '45%' },
              { label: 'Companies Served', value: '500+' },
            ].map((stat, index) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">
            Ready to write your own success story?
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600">
              Start Your Journey
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
