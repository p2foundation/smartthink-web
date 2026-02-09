'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Video, Calendar, Award, CheckCircle2, ArrowRight, Laptop, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a0f1a] py-14 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6 border border-blue-500/20">
                Corporate Training & LMS
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4 sm:mb-6">
                Build a <span className="text-blue-400">Security-First</span> Culture
              </h1>
              <p className="text-base sm:text-lg text-slate-400 mb-6 sm:mb-8 max-w-xl leading-relaxed">
                Comprehensive training solutions combining on-demand courses, live instructor-led sessions, and hands-on labs. Tailored for enterprise teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto justify-center">
                  Get Enterprise Quote
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto justify-center" asChild>
                  <Link href="/courses">View Course Catalog</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 backdrop-blur-sm"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-primary-500 rounded-2xl opacity-20 blur" />
              <div className="relative rounded-xl overflow-hidden bg-slate-900">
                <div className="aspect-video bg-slate-800 flex items-center justify-center">
                  <Video className="h-16 w-16 text-slate-600 opacity-50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4 text-white">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                           {i}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm font-medium">
                      <span className="block text-lg font-bold">2,500+</span>
                      Professionals Trained
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900">Why SmartThink Training?</h2>
            <p className="mt-4 text-lg text-slate-600">A modern approach to cybersecurity education.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { 
                icon: BookOpen, 
                title: 'On-demand LMS', 
                desc: 'Access pre-recorded videos, modules, and resources 24/7. Learn at your own pace.',
                color: 'text-blue-600', bg: 'bg-blue-50'
              },
              { 
                icon: Video, 
                title: 'Live Sessions', 
                desc: 'Real-time interactive training via Zoom with industry experts. Join from anywhere.',
                color: 'text-purple-600', bg: 'bg-purple-50'
              },
              { 
                icon: Laptop, 
                title: 'Hands-on Labs', 
                desc: 'Practice in safe, sandboxed environments. Real-world scenarios and simulations.',
                color: 'text-emerald-600', bg: 'bg-emerald-50'
              },
              { 
                icon: Award, 
                title: 'Certifications', 
                desc: 'Earn QR-verified certificates to validate your skills and advance your career.',
                color: 'text-orange-600', bg: 'bg-orange-50'
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
              >
                <div className={`h-12 w-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Structured Learning Paths</h2>
              <div className="space-y-6">
                {[
                  "Foundations of Cybersecurity",
                  "Network Defense & Security",
                  "Ethical Hacking & Penetration Testing",
                  "GRC & Risk Management",
                  "Cloud Security Essentials"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900">{item}</h4>
                      <p className="text-sm text-slate-600 mt-1">Comprehensive modules designed for industry relevance.</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-8 gap-2" variant="outline">
                Download Full Syllabus <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Upcoming Live Cohorts</h3>
              <div className="space-y-4">
                {[
                  { title: "Cybersecurity Bootcamp", date: "Starts March 15th", spots: "5 spots left" },
                  { title: "Advanced Pentesting", date: "Starts April 2nd", spots: "Open" },
                  { title: "GRC Masterclass", date: "Starts April 10th", spots: "Filling fast" },
                ].map((cohort, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div>
                      <div className="font-semibold text-slate-900">{cohort.title}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" /> {cohort.date}
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {cohort.spots}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
