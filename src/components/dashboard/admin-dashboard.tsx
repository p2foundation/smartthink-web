'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useRegionStore } from '@/stores/region-store';
import { Users, BookOpen, DollarSign, Activity, Settings, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserProfile } from '@/shared';

interface AdminDashboardProps {
  user: UserProfile;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const { regionConfig } = useRegionStore();
  
  // Mock data for admin dashboard
  const stats = {
    totalUsers: 1250,
    activeStudents: 850,
    totalCourses: 45,
    totalRevenue: 125000,
    pendingVerifications: 12,
    systemHealth: 'Healthy'
  };

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Users', value: String(stats.totalUsers), icon: Users, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { label: 'Active Courses', value: String(stats.totalCourses), icon: BookOpen, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
          { label: 'Total Revenue', value: `${regionConfig.currency} ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-50 text-green-600 border-green-100' },
          { label: 'System Health', value: stats.systemHealth, icon: Activity, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border p-6 ${stat.color} shadow-sm transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 opacity-60" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content - System Overview */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-display text-fg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-600" />
                Admin Controls
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
               <Link href="/dashboard/admin/users" className="group p-4 rounded-xl border border-border hover:border-primary-200 hover:shadow-sm transition-all bg-card flex items-start gap-4">
                 <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                   <Users className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-fg group-hover:text-primary-700">User Management</h3>
                   <p className="text-sm text-fg-muted mt-1">Manage users, roles, and permissions.</p>
                 </div>
               </Link>

               <Link href="/dashboard/admin/courses" className="group p-4 rounded-xl border border-border hover:border-primary-200 hover:shadow-sm transition-all bg-card flex items-start gap-4">
                 <div className="bg-indigo-50 p-2.5 rounded-lg text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                   <BookOpen className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-fg group-hover:text-primary-700">Course Administration</h3>
                   <p className="text-sm text-fg-muted mt-1">Review and approve courses.</p>
                 </div>
               </Link>
               
               <Link href="/dashboard/admin/finance" className="group p-4 rounded-xl border border-border hover:border-primary-200 hover:shadow-sm transition-all bg-card flex items-start gap-4">
                 <div className="bg-green-50 p-2.5 rounded-lg text-green-600 group-hover:bg-green-100 transition-colors">
                   <DollarSign className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-fg group-hover:text-primary-700">Financial Overview</h3>
                   <p className="text-sm text-fg-muted mt-1">View revenue, payouts, and transactions.</p>
                 </div>
               </Link>

               <Link href="/dashboard/admin/settings" className="group p-4 rounded-xl border border-border hover:border-primary-200 hover:shadow-sm transition-all bg-card flex items-start gap-4">
                 <div className="bg-bg-secondary p-2.5 rounded-lg text-fg-secondary group-hover:bg-bg-tertiary transition-colors">
                   <Settings className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-fg group-hover:text-primary-700">System Settings</h3>
                   <p className="text-sm text-fg-muted mt-1">Configure platform settings.</p>
                 </div>
               </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           {/* Alerts */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-bold font-display text-fg mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Action Required
            </h2>
            <div className="space-y-3">
               <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                 <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                   <Users className="h-3 w-3 text-amber-700" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-amber-900">12 KYC Verifications Pending</p>
                   <Button variant="ghost" className="text-amber-700 h-auto p-0 text-xs mt-1 hover:bg-transparent hover:text-amber-800">Review Queue &rarr;</Button>
                 </div>
               </div>
               
               <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                 <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                   <BookOpen className="h-3 w-3 text-blue-700" />
                 </div>
                 <div>
                   <p className="text-sm font-medium text-blue-900">3 Course Approvals Pending</p>
                   <Button variant="ghost" className="text-blue-700 h-auto p-0 text-xs mt-1 hover:bg-transparent hover:text-blue-800">Review Courses &rarr;</Button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
