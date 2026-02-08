'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, BarChart, Shield, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Course } from '@/shared/types/course.types';

interface CourseCardProps {
  course: Course;
  regionCode?: string;
}

export function MarketingCourseCard({ course, regionCode = 'GH' }: CourseCardProps) {
  // Mock pricing logic for display - in real app would come from API based on region
  const getPrice = () => {
    // Check if we have region pricing
    // @ts-ignore - RegionPricing type mismatch workaround for now
    const regionPrice = course.regionPricing?.find(p => p.regionCode === regionCode);
    if (regionPrice) {
      const currency = regionCode === 'GH' ? 'GH₵' : regionCode === 'NG' ? '₦' : regionCode === 'EU' ? '€' : '$';
      return `${currency}${regionPrice.price}`;
    }

    // Fallback logic if no pricing data
    switch (regionCode) {
      case 'GH': return `GH₵500`;
      case 'NG': return `₦40,000`;
      case 'US': return `$50`;
      case 'EU': return `€45`;
      default: return `$50`;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER': return 'bg-green-100 text-green-700 border-green-200';
      case 'INTERMEDIATE': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ADVANCED': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'EXPERT': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Generate a consistent gradient based on course ID so it's not random on re-renders
  const getPlaceholderStyle = (id: string) => {
    const gradients = [
      'from-blue-600/20 to-slate-900',
      'from-purple-600/20 to-slate-900',
      'from-emerald-600/20 to-slate-900',
      'from-amber-600/20 to-slate-900',
      'from-rose-600/20 to-slate-900',
      'from-cyan-600/20 to-slate-900',
    ];
    const index = id.charCodeAt(id.length - 1) % gradients.length;
    return gradients[index];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden border-slate-200 hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative h-48 bg-slate-900 overflow-hidden">
          {course.thumbnailUrl ? (
            <img 
              src={course.thumbnailUrl} 
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${getPlaceholderStyle(course.id)} flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500`}>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-30" />
              <Shield className="h-12 w-12 text-white/20" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className={`${getLevelColor(course.level)} border shadow-sm hover:bg-transparent`}>
              {course.level}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.totalDuration ? `${Math.round(course.totalDuration / 60)} hours` : '12 hours'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BarChart className="h-3.5 w-3.5" />
              {course.modules?.length || 8} modules
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          <p className="text-sm text-slate-600 line-clamp-3">
            {course.shortDescription || course.description}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {course.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2 py-1 rounded-md bg-slate-50 text-xs font-medium text-slate-600 border border-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0 border-t border-slate-100 p-6 flex items-center justify-between bg-slate-50/50">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Price</span>
            <span className="text-xl font-bold text-slate-900">{getPrice()}</span>
          </div>
          <Button asChild className="group-hover:bg-primary-700 transition-colors">
            <Link href={`/courses/${course.slug}`}>
              View Details <ChevronRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
