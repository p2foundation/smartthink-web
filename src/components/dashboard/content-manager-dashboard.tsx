'use client';

import Link from 'next/link';
import { useRegionStore } from '@/stores/region-store';
import { FileText, BookOpen, Video, Folder, Upload, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserProfile } from '@/shared';

interface ContentManagerDashboardProps {
  user: UserProfile;
}

export function ContentManagerDashboard({ user }: ContentManagerDashboardProps) {
  const { regionConfig } = useRegionStore();
  
  // Mock stats
  const stats = {
    totalAssets: 124,
    draftCourses: 5,
    pendingReviews: 8,
    storageUsed: '45.2 GB'
  };

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Assets', value: String(stats.totalAssets), icon: FileText, color: 'bg-blue-50 text-blue-600 border-blue-100' },
          { label: 'Draft Courses', value: String(stats.draftCourses), icon: BookOpen, color: 'bg-amber-50 text-amber-600 border-amber-100' },
          { label: 'Pending Reviews', value: String(stats.pendingReviews), icon: Filter, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
          { label: 'Storage Used', value: stats.storageUsed, icon: Folder, color: 'bg-slate-50 text-slate-600 border-slate-100' },
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary-600" />
                Content Management
              </h2>
              <div className="flex gap-2">
                 <Button size="sm" asChild>
                  <Link href="/dashboard/content/upload">
                    <Upload className="h-4 w-4 mr-1" />
                    Upload Assets
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
               <Link href="/dashboard/content/courses" className="group p-4 rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-sm transition-all bg-white flex items-start gap-4">
                 <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                   <BookOpen className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">Course Content</h3>
                   <p className="text-sm text-slate-500 mt-1">Edit and organize course materials.</p>
                 </div>
               </Link>

               <Link href="/dashboard/content/media" className="group p-4 rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-sm transition-all bg-white flex items-start gap-4">
                 <div className="bg-purple-50 p-2.5 rounded-lg text-purple-600 group-hover:bg-purple-100 transition-colors">
                   <Video className="h-6 w-6" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-slate-900 group-hover:text-primary-700">Media Library</h3>
                   <p className="text-sm text-slate-500 mt-1">Manage videos, images, and documents.</p>
                 </div>
               </Link>
            </div>
          </section>

          {/* Recent Uploads */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary-600" />
                Recent Uploads
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Introduction_to_SOC.mp4', type: 'Video', size: '245 MB', time: '2 hours ago' },
                { name: 'Lab_Guide_v2.pdf', type: 'Document', size: '2.4 MB', time: '5 hours ago' },
                { name: 'Course_Thumbnail.png', type: 'Image', size: '1.2 MB', time: 'Yesterday' },
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                      {file.type === 'Video' ? <Video className="h-5 w-5" /> : file.type === 'Image' ? <FileText className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{file.name}</p>
                      <p className="text-xs text-slate-500">{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{file.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Storage Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Total Usage</span>
                  <span className="text-sm font-bold text-slate-900">45.2 GB / 1 TB</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-primary-600" style={{ width: '4.5%' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <p className="text-xs text-slate-500">Videos</p>
                  <p className="text-sm font-bold text-slate-900">38.4 GB</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg text-center">
                  <p className="text-xs text-slate-500">Documents</p>
                  <p className="text-sm font-bold text-slate-900">6.8 GB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
