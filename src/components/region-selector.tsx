'use client';

import { RegionCode, REGION_LIST } from '@/shared';
import { useRegionStore } from '@/stores/region-store';
import { cn } from '@/lib/cn';

export function RegionSelector({ className }: { className?: string }) {
  const { regionCode, setRegion } = useRegionStore();

  return (
    <div className={cn('relative', className)}>
      <select
        value={regionCode}
        onChange={(e) => setRegion(e.target.value as RegionCode)}
        className="h-9 appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm font-medium transition-colors hover:border-slate-300 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        aria-label="Select your region"
      >
        {REGION_LIST.map((region) => (
          <option key={region.code} value={region.code}>
            {region.flag} {region.name} ({region.currencySymbol})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
