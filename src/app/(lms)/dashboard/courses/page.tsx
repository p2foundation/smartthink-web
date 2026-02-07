'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

import { LMSCourseCard } from '@/components/lms-course-card';
import { fetchCourses } from '@/lib/lms-courses';
import type { Course } from '@/shared';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import { useRegionStore } from '@/stores/region-store';

const LEVELS: Array<Course['level']> = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

export default function DashboardCoursesPage() {
  const { tokens } = useAuthStore();
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

    fetchCourses({ token: tokens?.accessToken ?? undefined, regionCode: regionCode ?? undefined })
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
  }, [tokens?.accessToken, regionCode]);

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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Courses</h1>
          <p className="mt-1 text-sm text-slate-600">
            Curated, performance-first learning paths built for USA-to-world professionals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters((v) => !v)}
            className="gap-2"
            type="button"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-xs font-semibold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
          {activeFilterCount > 0 && (
            <Button variant="ghost" onClick={clearFilters} className="gap-2" type="button">
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, tags, skills..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        {showFilters && (
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:w-[360px]">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} type="button">
                Close
              </Button>
            </div>

            <div className="mt-4 space-y-5">
              <div>
                <div className="text-xs font-semibold text-slate-600">Level</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {LEVELS.map((lvl) => {
                    const active = selectedLevels.has(lvl);
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          const next = new Set(selectedLevels);
                          if (active) next.delete(lvl);
                          else next.add(lvl);
                          setSelectedLevels(next);
                        }}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                          active
                            ? 'border-primary-200 bg-primary-50 text-primary-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-600">Tags</div>
                <div className="mt-2 flex max-h-40 flex-wrap gap-2 overflow-auto pr-1">
                  {allTags.length === 0 ? (
                    <div className="text-xs text-slate-500">No tags</div>
                  ) : (
                    allTags.map((tag) => {
                      const active = selectedTags.has(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const next = new Set(selectedTags);
                            if (active) next.delete(tag);
                            else next.add(tag);
                            setSelectedTags(next);
                          }}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            active
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[188px] animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="h-4 w-24 rounded bg-slate-100" />
              <div className="mt-3 h-5 w-3/4 rounded bg-slate-100" />
              <div className="mt-2 h-4 w-full rounded bg-slate-100" />
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="h-4 rounded bg-slate-100" />
                <div className="h-4 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
          <div className="mx-auto max-w-md">
            <div className="text-lg font-semibold text-slate-900">No courses match your filters.</div>
            <div className="mt-2 text-sm text-slate-600">Try clearing filters or searching a different skill.</div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="outline" onClick={clearFilters} type="button">
                Clear filters
              </Button>
              <Button onClick={() => setQuery('')} type="button">
                Reset search
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((course) => (
            <LMSCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
