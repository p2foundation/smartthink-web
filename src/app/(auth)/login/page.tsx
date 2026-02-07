'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, ArrowRight } from 'lucide-react';

import { loginSchema, type LoginInput, UserRole, RegionCode } from '@/shared';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { SimpleAuthInput, SimpleAuthButton } from '@/components/simple-auth-components';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { regionCode } = useRegionStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const now = new Date().toISOString();
      setAuth(
        {
          id: 'demo-user',
          email: data.email,
          firstName: 'John',
          lastName: 'Doe',
          phone: undefined,
          role: UserRole.STUDENT,
          regionCode: regionCode ?? RegionCode.GH,
          avatarUrl: undefined,
          isVerified: true,
          emailVerifiedAt: now,
          twoFactorEnabled: false,
          twoFactorMethod: null,
          whatsappOptIn: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          accessToken: 'demo-access-token',
          refreshToken: 'demo-refresh-token',
        },
      );

      router.push('/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-white">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 p-12 flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Smart<span className="text-primary-300">Think</span>
            </span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Welcome Back to Your Cybersecurity Journey
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-100">
              Continue mastering cybersecurity with world-class training, 
              hands-on labs, and certifications that advance your career.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm text-primary-300"
        >
          <p>&copy; {new Date().getFullYear()} SmartThink LLC. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="mb-8 flex justify-center lg:hidden">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                Smart<span className="text-primary-600">Think</span>
              </span>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Sign In
            </h1>
            <p className="mt-2 text-slate-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <SimpleAuthInput
              label="Email address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <SimpleAuthInput
                type="password"
                placeholder="Enter your password"
                icon={<Lock className="h-4 w-4" />}
                showPasswordToggle={true}
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <SimpleAuthButton
              type="submit"
              isLoading={isLoading}
              loadingText="Signing in..."
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg"
            >
              Sign In
            </SimpleAuthButton>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link 
              href="/register" 
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
