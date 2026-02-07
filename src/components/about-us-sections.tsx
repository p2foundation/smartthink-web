'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Globe, 
  Users, 
  Award, 
  Target, 
  Heart,
  Lightbulb,
  Rocket,
  Handshake,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Star,
  Quote,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function AboutUsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 h-3 w-3 rounded-full bg-accent-400 opacity-60"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-4 w-4 rounded-full bg-primary-400 opacity-40"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-accent-300 backdrop-blur-sm"
          >
            <MapPin className="h-4 w-4" />
            Africa-anchored, globally trusted
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            About{' '}
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              SmartThink
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-primary-100"
          >
            We are building Africa's premier cybersecurity education platform—empowering 
            professionals across Ghana, Nigeria, the United States, and Europe with world-class 
            training, consulting, and career opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/courses">
              <Button size="xl" className="bg-white text-primary-600 hover:bg-primary-50 shadow-lg">
                Explore Our Mission
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary-600">
                Contact Our Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              To democratize cybersecurity education and career opportunities across Africa and beyond, 
              making world-class training accessible, affordable, and relevant to local markets.
            </p>
            
            <div className="mt-8 space-y-4">
              {[
                { icon: Target, text: "Empower 100,000+ cybersecurity professionals by 2030" },
                { icon: Globe, text: "Establish 50+ training centers across Africa" },
                { icon: Award, text: "Achieve 95% certification success rate" },
                { icon: Heart, text: "Support underserved communities with scholarships" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <item.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <p className="text-slate-700">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "15+", label: "Countries" },
                  { value: "5,000+", label: "Students" },
                  { value: "50+", label: "Courses" },
                  { value: "94%", label: "Success Rate" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                    <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: "Excellence",
      description: "We deliver world-class cybersecurity education that meets global standards while addressing local needs.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive network of cybersecurity professionals across Africa and beyond.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pioneering new approaches to cybersecurity education with AI-powered learning and practical simulations.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Making quality cybersecurity education affordable and accessible to everyone, regardless of background.",
      color: "bg-red-50 text-red-600"
    },
    {
      icon: Rocket,
      title: "Growth",
      description: "Empowering career advancement and helping professionals reach their full potential.",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: Handshake,
      title: "Integrity",
      description: "Building trust through transparency, quality, and commitment to our students' success.",
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            The principles that guide everything we do, from course design to student support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${value.color} mb-4`}>
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamSection() {
  const team = [
    {
      name: "Hanson Peprah",
      role: "Founder & CEO",
      bio: "Cybersecurity expert with 10+ years experience in enterprise security and education.",
      avatar: "HP",
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Dr. Amara Okonkwo",
      role: "Head of Training",
      bio: "Former CISO with extensive experience in cybersecurity education and curriculum development.",
      avatar: "AO",
      color: "from-green-500 to-teal-600"
    },
    {
      name: "Kwame Asante",
      role: "Lead Consultant",
      bio: "Specializes in enterprise security architecture and compliance frameworks.",
      avatar: "KA",
      color: "from-amber-500 to-orange-600"
    },
    {
      name: "Fatima Al-Rashid",
      role: "Operations Director",
      bio: "Expert in scaling educational platforms and managing multi-regional operations.",
      avatar: "FA",
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            Meet Our Leadership
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            A diverse team of cybersecurity experts, educators, and innovators passionate about
            transforming cybersecurity education in Africa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-4 mx-auto w-24 h-24">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className={`relative bg-gradient-to-br ${member.color} rounded-full w-full h-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {member.avatar}
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                {member.name}
              </h3>
              <p className="text-primary-600 font-medium text-sm mb-2">{member.role}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">Join our team of passionate cybersecurity professionals</p>
          <Link href="/careers">
            <Button variant="outline" size="lg">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <p className="leading-relaxed">
                SmartThink was born from a simple observation: while Africa produces incredible tech talent, 
                access to quality cybersecurity education remained limited and expensive.
              </p>
              <p className="leading-relaxed">
                Founded in 2023 in Accra, Ghana, we set out to bridge this gap by creating a platform that 
                combines global best practices with local relevance. Our approach integrates mobile-first design, 
                WhatsApp support, and region-specific payment methods to make cybersecurity education truly accessible.
              </p>
              <p className="leading-relaxed">
                Today, we're proud to serve thousands of students across 15+ countries, offering everything 
                from foundational courses to advanced certifications, all while maintaining our commitment to 
                excellence, accessibility, and community impact.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">2023</div>
                <div className="text-sm text-slate-500">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">15+</div>
                <div className="text-sm text-slate-500">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">5000+</div>
                <div className="text-sm text-slate-500">Students</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-8 text-white">
                <Quote className="h-12 w-12 mb-4 text-primary-200" />
                <p className="text-lg leading-relaxed mb-4">
                  "We believe that cybersecurity education should not be a luxury, but a fundamental right 
                  for anyone looking to build a career in the digital economy."
                </p>
                <p className="font-semibold">— Hanson Peprah, Founder & CEO</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to Join Our Mission?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-100">
            Whether you're looking to advance your career, partner with us, or learn more about our programs,
            we're here to help you succeed in cybersecurity.
          </p>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link href="/register" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <BookOpen className="h-8 w-8 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Start Learning</h3>
                <p className="text-sm text-primary-100">Begin your cybersecurity journey</p>
              </div>
            </Link>
            
            <Link href="/contact" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <Mail className="h-8 w-8 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <p className="text-sm text-primary-100">Get in touch with our team</p>
              </div>
            </Link>
            
            <Link href="/careers" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                <Users className="h-8 w-8 mb-3 mx-auto" />
                <h3 className="font-semibold mb-2">Join Our Team</h3>
                <p className="text-sm text-primary-100">Explore career opportunities</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
