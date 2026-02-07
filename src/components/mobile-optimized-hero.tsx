'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface MobileOptimizedHeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  stats?: Array<{ label: string; value: string }>;
  trustBadge?: string;
}

export function MobileOptimizedHeroSection({
  title = "World-Class Cybersecurity Training & Certification",
  subtitle = "From Ghana to the globe",
  description = "Master cybersecurity with hands-on training, industry certifications, and career paths designed for your region. Mobile-first. WhatsApp-connected. Africa-anchored.",
  primaryCTA = { text: "Start Learning Free", href: "/register" },
  secondaryCTA = { text: "Browse Courses", href: "/courses" },
  stats = [
    { label: "Active Learners", value: "5,000+" },
    { label: "Courses", value: "50+" },
    { label: "Countries", value: "15+" },
    { label: "Cert Pass Rate", value: "94%" },
  ],
  trustBadge = "Trusted by 5,000+ cybersecurity professionals across Africa, USA & Europe",
}: MobileOptimizedHeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 min-h-screen flex items-center">
      {/* Animated background elements - Optimized for mobile */}
      <div className="absolute inset-0">
        {/* Grid pattern - Simplified on mobile */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 sm:opacity-50" />
        
        {/* Floating elements - Reduced motion on mobile */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-20 left-10 h-2 w-2 rounded-full bg-accent-400 opacity-60"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-40 right-20 h-3 w-3 rounded-full bg-primary-400 opacity-40"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 h-2 w-2 rounded-full bg-gold-400 opacity-50"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust badge - Optimized for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1.5 sm:px-4 text-xs sm:text-sm font-medium text-accent-400 backdrop-blur-sm"
          >
            <motion.span
              className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="hidden sm:inline">{trustBadge}</span>
            <span className="sm:hidden">5,000+ professionals worldwide</span>
          </motion.div>

          {/* Main heading - Responsive typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            {title.split(' ').map((word, index) => (
              <span key={index} className="block sm:inline">
                {word === 'Cybersecurity' ? (
                  <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  <span>{word}</span>
                )}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-accent-300"
          >
            {subtitle}
          </motion.p>

          {/* Description - Optimized line height for mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-relaxed sm:leading-relaxed text-slate-300 px-2"
          >
            {description}
          </motion.p>

          {/* CTA Buttons - Mobile-first touch targets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <motion.a
              href={primaryCTA.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-3.5 text-base sm:text-lg font-semibold bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-700 hover:to-accent-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg min-h-[56px] sm:min-h-[60px]"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
            >
              {primaryCTA.text}
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.a>
            
            <motion.a
              href={secondaryCTA.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-3.5 text-base sm:text-lg font-semibold border-2 border-slate-600 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg min-h-[56px] sm:min-h-[60px]"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
            >
              {secondaryCTA.text}
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Stats - Responsive grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 sm:mt-16 grid grid-cols-2 gap-4 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm text-slate-400 leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}
