'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RegionSelector } from '@/components/region-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { useAuthStore } from '@/stores/auth-store';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const navigation = [
    { name: 'Training', href: '/services/training' },
    { name: 'Consulting', href: '/services/consulting' },
    { name: 'Recruitment', href: '/services/recruitment' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
  ];

  const resources = [
    { name: 'Blog', href: '/blog' },
    { name: 'Certificate Verify', href: '/certificates/verify' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
              <span className="text-lg font-bold text-white font-display">S</span>
            </div>
            <span className="text-xl font-bold font-display text-fg">
              Smart<span className="text-primary-600">Think</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Resources dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-slate-100 bg-white py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-fg-secondary hover:bg-bg-secondary hover:text-fg"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <RegionSelector />

            {/* Desktop Auth */}
            <div className="hidden items-center gap-2 md:flex">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </div>
                    <button
                      onClick={logout}
                      className="text-sm text-slate-500 hover:text-slate-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation — premium overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-x-0 top-16 z-40 border-t border-border bg-bg shadow-xl shadow-black/5 lg:hidden"
            >
              <nav className="mx-auto max-w-7xl divide-y divide-border px-4 pb-6 sm:px-6">
                {/* Nav links */}
                <div className="space-y-1 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-fg-secondary active:bg-bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Resources */}
                <div className="py-4">
                  <p className="px-4 mb-2 text-xs font-semibold text-fg-muted uppercase tracking-wide">Resources</p>
                  {resources.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-fg-secondary active:bg-bg-secondary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Auth actions */}
                <div className="flex flex-col gap-3 py-4">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </div>
                        <span className="text-sm font-medium text-fg-secondary">
                          {user?.firstName} {user?.lastName}
                        </span>
                      </div>
                      <Button variant="outline" size="lg" className="w-full justify-center" asChild>
                        <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                          Dashboard
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-center text-red-600"
                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="lg" className="w-full justify-center" asChild>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          Log in
                        </Link>
                      </Button>
                      <Button size="lg" className="w-full justify-center" asChild>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </>
                  )}
                </div>

                {/* Theme toggle */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium text-fg-muted">Appearance</span>
                  <ThemeToggle />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
