'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, FileCheck, AlertTriangle, Layout, CheckCircle2, ArrowRight, Lock, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a0f1a] py-14 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-400 mb-6 border border-violet-500/20">
                Enterprise Security Consulting
              </span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4 sm:mb-6">
                Secure Your <span className="text-violet-400">Digital Future</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 mb-6 sm:mb-8 max-w-xl leading-relaxed">
                Strategic cybersecurity consulting, risk management, and compliance solutions. We help organizations build resilience against modern threats.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white w-full sm:w-auto justify-center">
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto justify-center" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-2 backdrop-blur-sm"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl opacity-20 blur" />
              <div className="relative rounded-xl overflow-hidden bg-slate-900 p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Compliance Score", value: "98%", color: "text-green-400" },
                    { label: "Risk Reduction", value: "85%", color: "text-blue-400" },
                    { label: "Audits Passed", value: "100%", color: "text-violet-400" },
                    { label: "Response Time", value: "<15m", color: "text-orange-400" },
                  ].map((stat, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-800/50 p-4 border border-slate-800">
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-violet-400" />
                    <span className="text-white font-medium">Enterprise-Grade Protection</span>
                  </div>
                  <p className="text-sm text-slate-400">Trusted by leading organizations across finance, healthcare, and technology.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900">Strategic Security Services</h2>
            <p className="mt-4 text-lg text-slate-600">End-to-end solutions for your security posture.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { 
                icon: Shield, 
                title: 'Risk Assessments', 
                desc: 'Comprehensive evaluation of your security posture. Identify vulnerabilities before attackers do.',
                color: 'text-violet-600', bg: 'bg-violet-50'
              },
              { 
                icon: FileCheck, 
                title: 'Compliance Audits', 
                desc: 'Expert guidance for ISO 27001, SOC 2, PCI-DSS, and regional frameworks (GDPR, NDPR).',
                color: 'text-blue-600', bg: 'bg-blue-50'
              },
              { 
                icon: AlertTriangle, 
                title: 'Incident Response', 
                desc: '24/7 rapid response team to handle breaches, minimize impact, and restore operations.',
                color: 'text-red-600', bg: 'bg-red-50'
              },
              { 
                icon: Layout, 
                title: 'Security Architecture', 
                desc: 'Secure-by-design infrastructure planning. Zero Trust implementation and cloud security.',
                color: 'text-emerald-600', bg: 'bg-emerald-50'
              },
              { 
                icon: Lock, 
                title: 'Penetration Testing', 
                desc: 'Advanced red teaming exercises to test your defenses against real-world attack vectors.',
                color: 'text-orange-600', bg: 'bg-orange-50'
              },
              { 
                icon: Server, 
                title: 'vCISO Services', 
                desc: 'Executive-level security leadership on demand. Strategic planning and board reporting.',
                color: 'text-cyan-600', bg: 'bg-cyan-50'
              },
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200 transition-all duration-300"
              >
                <div className={`h-14 w-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold font-display text-slate-900 mb-6">Why Choose SmartThink Consulting?</h2>
              <div className="space-y-6">
                {[
                  { title: "Regional Expertise", desc: "Deep understanding of African and Global compliance landscapes." },
                  { title: "Certified Experts", desc: "Team holds CISSP, CISA, CISM, OSCP, and other top certifications." },
                  { title: "Business-Aligned", desc: "Security strategies that enable business growth, not slow it down." },
                  { title: "Proactive Approach", desc: "Focus on prevention and resilience rather than just reaction." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100">
                      <CheckCircle2 className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-slate-900 text-white hover:bg-slate-800 gap-2">
                Download Service Brief <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-200 to-blue-200 rounded-full opacity-30 blur-3xl" />
              <div className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Our Methodology</h3>
                <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                  {[
                    { step: "01", title: "Assess", desc: "Deep dive into your current security posture and risks." },
                    { step: "02", title: "Strategize", desc: "Develop a tailored roadmap aligned with business goals." },
                    { step: "03", title: "Implement", desc: "Deploy controls, policies, and technologies." },
                    { step: "04", title: "Manage", desc: "Continuous monitoring, auditing, and improvement." }
                  ].map((phase, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-violet-600 text-xs font-bold text-white shadow-sm">
                        {phase.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{phase.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{phase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
