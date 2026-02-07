import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { RegionCode, type RegionConfig, DEFAULT_REGION, REGIONS } from '@/shared';

interface RegionState {
  regionCode: RegionCode;
  regionConfig: RegionConfig;

  // Actions
  setRegion: (code: RegionCode) => void;
}

export const useRegionStore = create<RegionState>()(
  persist(
    (set) => ({
      regionCode: DEFAULT_REGION,
      regionConfig: REGIONS[DEFAULT_REGION],

      setRegion: (code: RegionCode) =>
        set({
          regionCode: code,
          regionConfig: REGIONS[code] ?? REGIONS[DEFAULT_REGION],
        }),
    }),
    {
      name: 'smartthink-region',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    },
  ),
);
