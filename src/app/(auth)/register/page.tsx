'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Shield, User, Phone } from 'lucide-react';

import { registerSchema, type RegisterInput, UserRole, RegionCode } from '@/shared';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { SimpleAuthInput, SimpleAuthButton } from '@/components/simple-auth-components';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { regionCode } = useRegionStore();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
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
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          role: UserRole.STUDENT,
          regionCode: regionCode ?? RegionCode.GH,
          avatarUrl: undefined,
          isVerified: false,
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
              Start Your Cybersecurity Journey Today
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-primary-100">
              Join thousands of professionals advancing their careers with 
              world-class training, hands-on labs, and industry certifications.
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

      {/* Right Panel - Register Form */}
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
              Create Account
            </h1>
            <p className="mt-2 text-slate-600">
              Join SmartThink and start your cybersecurity journey.
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

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <SimpleAuthInput
                label="First name"
                placeholder="John"
                icon={<User className="h-4 w-4" />}
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <SimpleAuthInput
                label="Last name"
                placeholder="Doe"
                icon={<User className="h-4 w-4" />}
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>

            <SimpleAuthInput
              label="Email address"
              type="email"
              placeholder="john@example.com"
              icon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <SimpleAuthInput
              label="Phone number"
              type="tel"
              placeholder="+233 20 123 4567"
              icon={<Phone className="h-4 w-4" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <SimpleAuthInput
              label="Password"
              type="password"
              placeholder="Create a strong password"
              icon={<Lock className="h-4 w-4" />}
              showPasswordToggle={true}
              error={errors.password?.message}
              {...register('password')}
            />

            <SimpleAuthButton
              type="submit"
              isLoading={isLoading}
              loadingText="Creating account..."
              className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg"
            >
              Create Account
            </SimpleAuthButton>
          </form>

          {/* Terms and Sign In */}
          <div className="mt-6 space-y-4">
            <p className="text-xs text-center text-slate-500">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="font-medium text-primary-600 hover:text-primary-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-primary-600 hover:text-primary-700">
                Privacy Policy
              </Link>
            </p>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
