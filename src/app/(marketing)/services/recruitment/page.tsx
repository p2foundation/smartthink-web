'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, BadgeCheck, Globe, Briefcase, CheckCircle2, ArrowRight, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a0f1a] py-20 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-teal-600/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-6 border border-emerald-500/20">
                Cybersecurity Recruitment
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
                Hire Vetted <span className="text-emerald-400">Security Talent</span>
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-xl">
                Access a global pool of pre-verified cybersecurity professionals. We match you with skills-tested candidates ready to protect your organization.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Find Talent
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white" asChild>
                  <Link href="/contact">Post a Job</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 backdrop-blur-sm"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-20 blur" />
              <div className="relative rounded-xl overflow-hidden bg-slate-900 p-8">
                <div className="space-y-4">
                  {[
                    { role: "Senior SOC Analyst", loc: "Remote (GH)", status: "Verified", skills: ["SIEM", "Splunk", "IR"] },
                    { role: "Penetration Tester", loc: "Hybrid (NG)", status: "Verified", skills: ["OSCP", "Python", "Burp"] },
                    { role: "GRC Consultant", loc: "Remote (US)", status: "Verified", skills: ["ISO 27001", "Risk"] },
                  ].map((candidate, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                          <Users className="h-5 w-5 text-slate-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{candidate.role}</div>
                          <div className="text-xs text-slate-400">{candidate.loc}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                          {candidate.status}
                        </span>
                        <div className="flex -space-x-1">
                          {candidate.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="h-2 w-2 rounded-full bg-slate-600 ring-1 ring-slate-800" title={skill} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Talent Pool</span>
                  <span className="font-bold text-white">12,450+ Candidates</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why Hire Through SmartThink?</h2>
            <p className="mt-4 text-lg text-slate-600">We don't just find resumes; we verify skills.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                icon: BadgeCheck, 
                title: 'Skills Verified', 
                desc: 'Every candidate passes technical assessments and hands-on labs before reaching you.',
                color: 'text-emerald-600', bg: 'bg-emerald-50'
              },
              { 
                icon: Globe, 
                title: 'Global Talent Pool', 
                desc: 'Access top-tier professionals from Africa, US, and Europe. Local expertise, global standards.',
                color: 'text-blue-600', bg: 'bg-blue-50'
              },
              { 
                icon: Zap, 
                title: 'Fast Placement', 
                desc: 'Reduce time-to-hire by 60%. Our pre-vetted pipeline means you interview ready-to-work talent.',
                color: 'text-amber-600', bg: 'bg-amber-50'
              },
              { 
                icon: Briefcase, 
                title: 'Role-Specific Matching', 
                desc: 'From SOC Analysts to CISOs, we understand the nuances of every security role.',
                color: 'text-purple-600', bg: 'bg-purple-50'
              },
              { 
                icon: Search, 
                title: 'Cultural Fit', 
                desc: 'We assess soft skills and communication to ensure long-term team cohesion.',
                color: 'text-cyan-600', bg: 'bg-cyan-50'
              },
              { 
                icon: Users, 
                title: 'Diversity & Inclusion', 
                desc: 'Build diverse security teams that bring varied perspectives to threat defense.',
                color: 'text-rose-600', bg: 'bg-rose-50'
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
              >
                <div className={`h-14 w-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Our Vetting Process</h2>
            <p className="mt-4 text-lg text-slate-600">How we ensure you get the best talent.</p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden lg:block" />
            <div className="grid gap-8 lg:grid-cols-4 relative z-10">
              {[
                { step: "1", title: "Profile Screening", desc: "Review of experience, certifications, and background check." },
                { step: "2", title: "Technical Assessment", desc: "Timed coding challenges and security knowledge quizzes." },
                { step: "3", title: "Live Lab Challenge", desc: "Real-world scenario defense/attack simulation." },
                { step: "4", title: "Interview Ready", desc: "Soft skills check and final portfolio review." }
              ].map((process, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative text-center lg:text-left">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center mx-auto lg:mx-0 mb-4 ring-4 ring-white">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{process.title}</h3>
                  <p className="text-sm text-slate-600">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0a0f1a] rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Build Your Security Team?</h2>
              <p className="text-lg text-slate-400 mb-10">
                Stop sifting through unqualified resumes. Let us connect you with the top 1% of cybersecurity talent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[200px]">
                  Start Hiring
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white min-w-[200px]" asChild>
                  <Link href="/contact">Talk to an Expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
