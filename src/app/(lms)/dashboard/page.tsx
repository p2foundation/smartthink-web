'use client';

import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';
import { Shield, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { StudentDashboard, InstructorDashboard, AdminDashboard, ContentManagerDashboard } from '@/components/dashboard';
import { UserRole, RegionCode } from '@/shared';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { regionConfig } = useRegionStore();

  // Mock user data for demonstration if not logged in
  const mockUser = {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+233 20 123 4567',
    role: UserRole.STUDENT,
    regionCode: RegionCode.GH,
    avatarUrl: undefined,
    isVerified: true,
    emailVerifiedAt: '2024-01-15T10:30:00Z',
    twoFactorEnabled: false,
    twoFactorMethod: null,
    whatsappOptIn: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  };

  const currentUser = user || mockUser;

  const renderDashboardContent = () => {
    switch (currentUser.role) {
      case UserRole.ADMIN:
      case UserRole.SUPER_ADMIN:
        return <AdminDashboard user={currentUser} />;
      case UserRole.INSTRUCTOR:
        return <InstructorDashboard user={currentUser} />;
      case UserRole.CONTENT_MANAGER:
        return <ContentManagerDashboard user={currentUser} />;
      case UserRole.STUDENT:
      default:
        return <StudentDashboard user={currentUser} />;
    }
  };

  return (
    <div>
      {/* User Profile Summary Header - Common for all roles */}
      <div className="mb-6 sm:mb-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 sm:p-6 border border-primary-100">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold shadow-sm">
                {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
              </div>
            )}
            
            {/* KYC Status */}
            <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center ${
              currentUser.isVerified 
                ? 'bg-green-100 text-green-600 border-green-200' 
                : 'bg-amber-100 text-amber-600 border-amber-200'
            }`}>
              {currentUser.isVerified ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-3xl font-bold font-display text-slate-900">
              Welcome back, {currentUser.firstName}!
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-600 truncate max-w-full">
              {currentUser.email} • {regionConfig.flag} {regionConfig.name}
            </p>
            
            {/* Status Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-3">
              <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${
                currentUser.role === 'ADMIN' ? 'bg-red-100 text-red-700 border-red-200' :
                currentUser.role === 'INSTRUCTOR' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                'bg-blue-100 text-blue-700 border-blue-200'
              }`}>
                <Shield className="h-3 w-3" />
                {currentUser.role.charAt(0) + currentUser.role.slice(1).toLowerCase()}
              </span>
              
              <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border ${
                currentUser.isVerified 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-amber-100 text-amber-700 border-amber-200'
              }`}>
                {currentUser.isVerified ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    KYC Verified
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    KYC Pending
                  </>
                )}
              </span>
              
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full border bg-slate-100 text-slate-700 border-slate-200">
                <Clock className="h-3 w-3" />
                Member since {new Date(currentUser.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Specific Dashboard Content */}
      {renderDashboardContent()}
    </div>
  );
}
