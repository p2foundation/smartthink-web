'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Cybersecurity Training', href: '/services/training' },
        { name: 'Enterprise Consulting', href: '/services/consulting' },
        { name: 'Talent Recruitment', href: '/services/recruitment' },
        { name: 'Custom Solutions', href: '/services/custom' },
      ],
    },
    {
      title: 'Platform',
      links: [
        { name: 'All Courses', href: '/courses' },
        { name: 'Learning Paths', href: '/paths' },
        { name: 'Certificates', href: '/certificates' },
        { name: 'Verify Certificate', href: '/certificates/verify' },
        { name: 'Blog & Resources', href: '/blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Mission', href: '/mission' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Community', href: '/community' },
        { name: 'WhatsApp Support', href: 'https://wa.me/233XXXXXXXXX' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const regions = [
    { name: 'Ghana & West Africa', currency: 'GH₵' },
    { name: 'United States', currency: '$' },
    { name: 'Europe', currency: '€' },
    { name: 'Other Regions', currency: '$' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold">
                Smart<span className="text-primary-400">Think</span>
              </span>
            </Link>
            
            <p className="text-footer-fg mb-6 max-w-sm">
              World-class cybersecurity training, consulting, and recruitment. 
              Built for Africa, designed for the world.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-footer-bg text-fg-muted hover:bg-primary-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-fg-muted">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@smartthink.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+233 30 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Accra, Ghana • Global</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-footer-fg hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-footer-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-fg-muted">
              © {currentYear} SmartThink LLC. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-fg-muted">
              <span>🔒 SOC 2 Compliant</span>
              <span>🛡️ ISO 27001 Certified</span>
              <span>📱 Mobile Money Ready</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
