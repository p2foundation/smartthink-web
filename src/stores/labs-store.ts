import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type LabRunRecord = {
  userId: string;
  labId: string;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  activeStepIndex: number;
  completedStepIds: string[];
  progress: number;
};

type LabsState = {
  runs: Record<string, LabRunRecord>;

  startOrResumeRun: (args: { userId: string; labId: string; now?: string }) => LabRunRecord;
  setActiveStepIndex: (args: { userId: string; labId: string; index: number; totalSteps: number; now?: string }) => void;
  markStepComplete: (args: { userId: string; labId: string; stepId: string; totalSteps: number; now?: string }) => void;
  resetRun: (args: { userId: string; labId: string; now?: string }) => void;
  resetForUser: (userId: string) => void;
};

function key(userId: string, labId: string) {
  return `${userId}:${labId}`;
}

function clampProgress(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export const useLabsStore = create<LabsState>()(
  persist(
    (set, get) => ({
      runs: {},

      startOrResumeRun: ({ userId, labId, now }) => {
        const k = key(userId, labId);
        const existing = get().runs[k];
        if (existing) return existing;

        const startedAt = now ?? new Date().toISOString();
        const record: LabRunRecord = {
          userId,
          labId,
          startedAt,
          updatedAt: startedAt,
          activeStepIndex: 0,
          completedStepIds: [],
          progress: 0,
        };

        set((state) => ({
          runs: {
            ...state.runs,
            [k]: record,
          },
        }));

        return record;
      },

      setActiveStepIndex: ({ userId, labId, index, totalSteps, now }) => {
        const k = key(userId, labId);
        set((state) => {
          const current = state.runs[k];
          if (!current) return state;
          const updatedAt = now ?? new Date().toISOString();
          const safeIndex = Math.max(0, Math.min(Math.max(0, totalSteps - 1), index));
          return {
            runs: {
              ...state.runs,
              [k]: {
                ...current,
                activeStepIndex: safeIndex,
                updatedAt,
              },
            },
          };
        });
      },

      markStepComplete: ({ userId, labId, stepId, totalSteps, now }) => {
        const k = key(userId, labId);
        set((state) => {
          const current = state.runs[k];
          if (!current) return state;

          const completed = new Set(current.completedStepIds);
          completed.add(stepId);

          const doneCount = completed.size;
          const progress = clampProgress((doneCount / Math.max(1, totalSteps)) * 100);
          const updatedAt = now ?? new Date().toISOString();

          const isComplete = progress >= 100;

          return {
            runs: {
              ...state.runs,
              [k]: {
                ...current,
                completedStepIds: Array.from(completed),
                progress,
                updatedAt,
                completedAt: isComplete ? updatedAt : current.completedAt,
              },
            },
          };
        });
      },

      resetRun: ({ userId, labId, now }) => {
        const k = key(userId, labId);
        set((state) => {
          const current = state.runs[k];
          if (!current) return state;

          const updatedAt = now ?? new Date().toISOString();

          return {
            runs: {
              ...state.runs,
              [k]: {
                ...current,
                activeStepIndex: 0,
                completedStepIds: [],
                progress: 0,
                updatedAt,
                completedAt: undefined,
              },
            },
          };
        });
      },

      resetForUser: (userId) => {
        set((state) => {
          const next: Record<string, LabRunRecord> = {};
          for (const [k, v] of Object.entries(state.runs)) {
            if (v.userId !== userId) next[k] = v;
          }
          return { runs: next };
        });
      },
    }),
    {
      name: 'smartthink-labs',
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

export function getRunForUser(runs: Record<string, LabRunRecord>, userId: string, labId: string) {
  return runs[`${userId}:${labId}`];
}

export type { LabRunRecord };
