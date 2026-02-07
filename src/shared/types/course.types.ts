import type { CourseStatus, LessonType, EnrollmentStatus, AssessmentType } from '../enums';
import type { UserProfile } from './user.types';
import type { RegionPricing } from './region.types';

// ============================================
// Course Types
// ============================================

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  status: CourseStatus;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  prerequisites: string[];
  tags: string[];
  instructor: Pick<UserProfile, 'id' | 'firstName' | 'lastName' | 'avatarUrl'>;
  modules: CourseModule[];
  regionPricing: RegionPricing[];
  totalDuration: number;
  totalLessons: number;
  enrollmentCount: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content?: string;
  videoUrl?: string;
  videoProvider?: string;
  videoAssetId?: string;
  videoPlaybackId?: string;
  duration: number;
  order: number;
  type: LessonType;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  progress: number; // 0-100 percentage
  currentLessonId?: string;
  startedAt: string;
  completedAt?: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  type: AssessmentType;
  passingScore: number;
  totalQuestions: number;
  timeLimit?: number; // minutes
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  userName: string;
  qrCode: string;
  verificationHash: string;
  issuedAt: string;
}
