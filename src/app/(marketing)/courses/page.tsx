'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, BookOpen, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarketingCourseCard } from '@/components/marketing-course-card';
import { FeaturedPaths } from '@/components/featured-paths';
import { fetchCourses } from '@/lib/lms-courses';
import type { Course } from '@/shared/types/course.types';
import { useRegionStore } from '@/stores/region-store';

const LEVELS: Array<Course['level']> = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

export default function CoursesPage() {
  const { regionCode } = useRegionStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<Set<Course['level']>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let alive = true;
    setIsLoading(true);

    fetchCourses({ regionCode: regionCode ?? undefined })
      .then((data) => {
        if (!alive) return;
        setCourses(data);
      })
      .finally(() => {
        if (!alive) return;
        setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [regionCode]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const c of courses) for (const t of c.tags) tags.add(t);
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }, [courses]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return courses
      .filter((c) => (selectedLevels.size ? selectedLevels.has(c.level) : true))
      .filter((c) => (selectedTags.size ? c.tags.some((t) => selectedTags.has(t)) : true))
      .filter((c) => {
        if (!q) return true;
        const hay = `${c.title} ${c.shortDescription ?? ''} ${c.description} ${c.tags.join(' ')}`.toLowerCase();
        return hay.includes(q);
      });
  }, [courses, query, selectedLevels, selectedTags]);

  const activeFilterCount = selectedLevels.size + selectedTags.size;

  const clearFilters = () => {
    setSelectedLevels(new Set());
    setSelectedTags(new Set());
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a0f1a] py-20 sm:py-32">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[120px]" />
          <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-accent-500/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+')] opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-primary-500/10 px-4 py-1.5 text-sm font-medium text-primary-400 mb-6 border border-primary-500/20">
              Course Catalog
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              Master Cybersecurity <br />
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                One Skill at a Time
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10">
              Hands-on training, industry-recognized certifications, and career-focused learning paths. 
              Built for professionals across Africa, US, and Europe.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent-400" /> Self-paced
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent-400" /> Hands-on Labs
              </span>
              <span className="flex items-center gap-2">
                <Award className="h-4 w-4 text-accent-400" /> Verified Certs
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Featured Paths - Added here */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/50 mb-12">
          <FeaturedPaths />
        </div>

        {/* Search & Filter Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/50 mb-10">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, skills, or topics..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 min-w-[120px]"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white text-primary-600 px-1.5 text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
              {activeFilterCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="text-slate-500 hover:text-red-600">
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-6 border-t border-slate-100 pt-6 grid gap-8 md:grid-cols-2"
            >
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Difficulty Level</h3>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map((lvl) => {
                    const active = selectedLevels.has(lvl);
                    return (
                      <button
                        key={lvl}
                        onClick={() => {
                          const next = new Set(selectedLevels);
                          if (active) next.delete(lvl);
                          else next.add(lvl);
                          setSelectedLevels(next);
                        }}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          active
                            ? 'border-primary-200 bg-primary-50 text-primary-700 ring-1 ring-primary-200'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const active = selectedTags.has(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          const next = new Set(selectedTags);
                          if (active) next.delete(tag);
                          else next.add(tag);
                          setSelectedTags(next);
                        }}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                          active
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[400px] animate-pulse rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-48 bg-slate-100 w-full" />
                <div className="p-6 space-y-4">
                  <div className="h-4 w-24 rounded bg-slate-100" />
                  <div className="h-6 w-3/4 rounded bg-slate-100" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto max-w-md">
              <h3 className="text-lg font-semibold font-display text-slate-900">No courses found</h3>
              <p className="mt-2 text-slate-600">
                We couldn't find any courses matching your search. Try adjusting your filters or search terms.
              </p>
              <Button onClick={clearFilters} className="mt-6" variant="outline">
                Clear all filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <div key={course.id} className="h-full">
                <MarketingCourseCard course={course} regionCode={regionCode || 'GH'} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
