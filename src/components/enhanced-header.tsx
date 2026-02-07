'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown,
  User,
  Shield,
  Settings,
  LogOut,
  Bell,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Award,
  CreditCard,
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { useLmsStore } from '@/stores/lms-store';
import { useLabsStore } from '@/stores/labs-store';
import type { UserProfile } from '@/shared';

interface UserHeaderProps {
  user: UserProfile;
}

function UserHeader({ user }: UserHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuthStore();
  const { resetForUser } = useLmsStore();
  const { resetForUser: resetLabsForUser } = useLabsStore();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const isStaff =
    user.role === 'ADMIN' ||
    user.role === 'SUPER_ADMIN' ||
    user.role === 'INSTRUCTOR' ||
    user.role === 'CONTENT_MANAGER';

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-700 border-red-200';
      case 'INSTRUCTOR': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'STUDENT': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getKycColor = (isVerified: boolean) => {
    return isVerified 
      ? 'text-green-600 bg-green-50 border-green-200' 
      : 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getKycIcon = (isVerified: boolean) => {
    return isVerified ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />;
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    resetForUser(user.id);
    resetLabsForUser(user.id);
    logout();
    router.push('/');
  };

  return (
    <div className="flex items-center gap-4">
      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
      </Button>

      {/* User Profile Dropdown */}
      <div className="relative" ref={profileRef}>
        <Button
          variant="ghost"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {/* Avatar */}
          <div className="relative">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                {getInitials(user.firstName, user.lastName)}
              </div>
            )}
            
            {/* KYC Status Indicator */}
            <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white flex items-center justify-center ${getKycColor(user.isVerified)}`}>
              {getKycIcon(user.isVerified)}
            </div>
          </div>

          {/* User Info */}
          <div className="hidden md:block text-left">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-slate-900">
                {user.firstName} {user.lastName}
              </p>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>
                {user.role}
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getKycColor(user.isVerified)}`}>
                {getKycIcon(user.isVerified)}
                {user.isVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
        </Button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
            >
              {/* Profile Header */}
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="h-12 w-12 rounded-full object-cover border-2 border-slate-200"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-lg font-semibold">
                      {getInitials(user.firstName, user.lastName)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      {!user.isVerified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border text-amber-600 bg-amber-50 border-amber-200">
                          <Clock className="h-3 w-3" />
                          KYC Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>
                
                <Link
                  href="/dashboard/my-courses"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  My Courses
                </Link>

                <Link
                  href="/dashboard/my-labs"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  My Labs
                </Link>
                
                <Link
                  href="/dashboard/certificates"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Award className="h-4 w-4" />
                  Certificates
                </Link>

                {isStaff && (
                  <Link
                    href="/dashboard/manage/courses"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Manage Courses
                  </Link>
                )}
                
                <Link
                  href="/dashboard/billing"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <CreditCard className="h-4 w-4" />
                  Billing & Plans
                </Link>
                
                {!user.isVerified && (
                  <Link
                    href="/dashboard/kyc"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Complete KYC Verification
                  </Link>
                )}
                
                <hr className="my-2 border-slate-100" />
                
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                
                <Link
                  href="/help"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </Link>
                
                <hr className="my-2 border-slate-100" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function EnhancedHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  const navigation = isAuthenticated
    ? [
        { name: 'Dashboard', href: '/dashboard', current: pathname === '/dashboard' },
        { name: 'My Courses', href: '/dashboard/my-courses', current: pathname === '/dashboard/my-courses' },
        { name: 'Labs', href: '/labs', current: pathname === '/labs' },
        { name: 'Catalog', href: '/dashboard/courses', current: pathname === '/dashboard/courses' },
        { name: 'About', href: '/about', current: pathname === '/about' },
      ]
    : [
        { name: 'Home', href: '/', current: pathname === '/' },
        { name: 'Training', href: '/services/training', current: pathname === '/services/training' },
        { name: 'Consulting', href: '/services/consulting', current: pathname === '/services/consulting' },
        { name: 'Recruitment', href: '/services/recruitment', current: pathname === '/services/recruitment' },
        { name: 'Courses', href: '/courses', current: pathname === '/courses' },
        { name: 'About', href: '/about', current: pathname === '/about' },
      ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 group-hover:bg-primary-700 transition-colors">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Smart<span className="text-primary-600">Think</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-primary-600'
                    : 'text-slate-600 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <UserHeader user={user} />
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-slate-200"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      item.current
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <>
                    <div className="pt-4 border-t border-slate-200">
                      <Link
                        href="/login"
                        className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="block px-3 py-2 text-base font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-md transition-colors mt-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
