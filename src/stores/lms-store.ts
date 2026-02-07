import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { EnrollmentStatus } from '@/shared';

type EnrollmentRecord = {
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress: number;
  currentLessonId?: string;
  completedLessonIds: string[];
  startedAt: string;
  completedAt?: string;
};

type LMSState = {
  enrollments: Record<string, EnrollmentRecord>;

  enroll: (args: { userId: string; courseId: string; firstLessonId?: string; now?: string }) => EnrollmentRecord;
  setCurrentLesson: (args: { userId: string; courseId: string; lessonId: string }) => void;
  markLessonComplete: (args: { userId: string; courseId: string; lessonId: string; totalLessons: number }) => void;
  pauseEnrollment: (args: { userId: string; courseId: string }) => void;
  resumeEnrollment: (args: { userId: string; courseId: string }) => void;
  cancelEnrollment: (args: { userId: string; courseId: string }) => void;
  resetEnrollment: (args: { userId: string; courseId: string; firstLessonId?: string }) => void;
  resetForUser: (userId: string) => void;
};

function key(userId: string, courseId: string) {
  return `${userId}:${courseId}`;
}

function clampProgress(n: number) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export const useLmsStore = create<LMSState>()(
  persist(
    (set, get) => ({
      enrollments: {},

      enroll: ({ userId, courseId, firstLessonId, now }) => {
        const k = key(userId, courseId);
        const existing = get().enrollments[k];
        if (existing) return existing;

        const startedAt = now ?? new Date().toISOString();
        const record: EnrollmentRecord = {
          userId,
          courseId,
          status: EnrollmentStatus.ACTIVE,
          progress: 0,
          currentLessonId: firstLessonId,
          completedLessonIds: [],
          startedAt,
        };

        set((state) => ({
          enrollments: {
            ...state.enrollments,
            [k]: record,
          },
        }));

        return record;
      },

      setCurrentLesson: ({ userId, courseId, lessonId }) => {
        const k = key(userId, courseId);
        set((state) => {
          const current = state.enrollments[k];
          if (!current) return state;
          return {
            enrollments: {
              ...state.enrollments,
              [k]: {
                ...current,
                currentLessonId: lessonId,
              },
            },
          };
        });
      },

      pauseEnrollment: ({ userId, courseId }) => {
        const k = key(userId, courseId);
        set((state) => {
          const current = state.enrollments[k];
          if (!current) return state;
          if (current.status !== EnrollmentStatus.ACTIVE) return state;
          return {
            enrollments: {
              ...state.enrollments,
              [k]: {
                ...current,
                status: EnrollmentStatus.PAUSED,
              },
            },
          };
        });
      },

      resumeEnrollment: ({ userId, courseId }) => {
        const k = key(userId, courseId);
        set((state) => {
          const current = state.enrollments[k];
          if (!current) return state;
          if (current.status !== EnrollmentStatus.PAUSED) return state;
          return {
            enrollments: {
              ...state.enrollments,
              [k]: {
                ...current,
                status: EnrollmentStatus.ACTIVE,
              },
            },
          };
        });
      },

      cancelEnrollment: ({ userId, courseId }) => {
        const k = key(userId, courseId);
        set((state) => {
          const current = state.enrollments[k];
          if (!current) return state;
          if (current.status === EnrollmentStatus.CANCELLED) return state;
          return {
            enrollments: {
              ...state.enrollments,
              [k]: {
                ...current,
                status: EnrollmentStatus.CANCELLED,
              },
            },
          };
        });
      },

      resetEnrollment: ({ userId, courseId, firstLessonId }) => {
        const k = key(userId, courseId);
        set((state) => {
          const current = state.enrollments[k];
          if (!current) return state;
          return {
            enrollments: {
              ...state.enrollments,
              [k]: {
                ...current,
                status: EnrollmentStatus.ACTIVE,
                progress: 0,
                completedLessonIds: [],
                currentLessonId: firstLessonId,
                completedAt: undefined,
              },
            },
          };
        });
      },

      markLessonComplete: ({ userId, courseId, lessonId, totalLessons }) => {
        const k = key(userId, courseId);
        set((state) => {
          const current = state.enrollments[k];
          if (!current) return state;

          if (current.status === EnrollmentStatus.CANCELLED) return state;

          const completed = new Set(current.completedLessonIds);
          completed.add(lessonId);

          const doneCount = completed.size;
          const progress = clampProgress((doneCount / Math.max(1, totalLessons)) * 100);

          const isComplete = progress >= 100;

          return {
            enrollments: {
              ...state.enrollments,
              [k]: {
                ...current,
                completedLessonIds: Array.from(completed),
                progress,
                status: isComplete ? EnrollmentStatus.COMPLETED : current.status,
                completedAt: isComplete ? new Date().toISOString() : current.completedAt,
              },
            },
          };
        });
      },

      resetForUser: (userId) => {
        set((state) => {
          const next: Record<string, EnrollmentRecord> = {};
          for (const [k, v] of Object.entries(state.enrollments)) {
            if (v.userId !== userId) next[k] = v;
          }
          return { enrollments: next };
        });
      },
    }),
    {
      name: 'smartthink-lms',
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

export function getEnrollmentForUser(enrollments: Record<string, EnrollmentRecord>, userId: string, courseId: string) {
  return enrollments[`${userId}:${courseId}`];
}
