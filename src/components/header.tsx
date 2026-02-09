'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { RegionSelector } from '@/components/region-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600">
            <span className="text-lg font-bold text-white font-display">S</span>
          </div>
          <span className="text-xl font-bold font-display text-fg">
            Smart<span className="text-primary-600">Think</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/services/training"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Training
          </Link>
          <Link
            href="/services/consulting"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Consulting
          </Link>
          <Link
            href="/services/recruitment"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Recruitment
          </Link>
          <Link
            href="/courses"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            Courses
          </Link>
        </nav>

        {/* Right side: Region + Auth */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <RegionSelector />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <div className="pt-4 border-t border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <button
                  onClick={logout}
                  className="border-t border-border bg-bg lg:hidden text-slate-700"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
