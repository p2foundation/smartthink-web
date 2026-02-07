'use client';

import { api } from '@/lib/api-client';
import type { Course } from '@/shared';
import { CourseStatus, LessonType, RegionCode, Currency } from '@/shared';

type AnyApiResponse<T> = {
  success?: boolean;
  data?: T;
};

function isApiResponse<T>(value: unknown): value is AnyApiResponse<T> {
  return typeof value === 'object' && value !== null;
}

export async function fetchCourses(options?: { token?: string; regionCode?: string }): Promise<Course[]> {
  try {
    const res = await api.get<AnyApiResponse<Course[]>>('/courses', {
      token: options?.token,
      regionCode: options?.regionCode,
    });

    if (isApiResponse<Course[]>(res) && Array.isArray(res.data)) return res.data;
    if (Array.isArray(res as unknown)) return res as unknown as Course[];

    return mockCourses;
  } catch {
    return mockCourses;
  }
}

export async function fetchCourseBySlug(
  slug: string,
  options?: { token?: string; regionCode?: string },
): Promise<Course | null> {
  try {
    const res = await api.get<AnyApiResponse<Course>>(`/courses/${encodeURIComponent(slug)}`, {
      token: options?.token,
      regionCode: options?.regionCode,
    });

    if (isApiResponse<Course>(res) && res.data) return res.data;

    return mockCourses.find((c) => c.slug === slug) ?? null;
  } catch {
    return mockCourses.find((c) => c.slug === slug) ?? null;
  }
}

const now = new Date().toISOString();

export const mockCourses: Course[] = [
  {
    id: 'c-intro-cyber',
    title: 'Introduction to Cybersecurity (USA & Global Foundations)',
    slug: 'introduction-to-cybersecurity',
    description:
      'Start with the fundamentals: threat landscape, security principles, common attack vectors, and the mindset of modern defenders. Designed for career switchers and professionals worldwide.',
    shortDescription: 'A world-class foundation for anyone starting in cybersecurity.',
    thumbnailUrl: undefined,
    status: CourseStatus.PUBLISHED,
    level: 'BEGINNER',
    prerequisites: [],
    tags: ['foundations', 'threats', 'defense'],
    instructor: {
      id: 'u-instructor-1',
      firstName: 'Avery',
      lastName: 'Morgan',
      avatarUrl: undefined,
    },
    modules: [
      {
        id: 'm-1',
        title: 'Security Mindset & Threat Landscape',
        description: 'Core concepts and modern threat actors.',
        order: 1,
        lessons: [
          {
            id: 'l-1',
            title: 'How attackers think',
            duration: 420,
            order: 1,
            type: LessonType.VIDEO,
          },
          {
            id: 'l-2',
            title: 'CIA triad and beyond',
            duration: 360,
            order: 2,
            type: LessonType.TEXT,
          },
          {
            id: 'l-3',
            title: 'Quick checkpoint quiz',
            duration: 300,
            order: 3,
            type: LessonType.QUIZ,
          },
        ],
      },
      {
        id: 'm-2',
        title: 'Core Defense Practices',
        description: 'Security controls and practical playbooks.',
        order: 2,
        lessons: [
          {
            id: 'l-4',
            title: 'Password hygiene & MFA',
            duration: 360,
            order: 1,
            type: LessonType.VIDEO,
          },
          {
            id: 'l-5',
            title: 'Phishing: detection and response',
            duration: 420,
            order: 2,
            type: LessonType.LAB,
          },
        ],
      },
    ],
    regionPricing: [
      { regionCode: RegionCode.US, price: 49, currency: Currency.USD, originalPrice: 99, discountPercentage: 50 },
      { regionCode: RegionCode.EU, price: 49, currency: Currency.EUR, originalPrice: 99, discountPercentage: 50 },
      { regionCode: RegionCode.GH, price: 399, currency: Currency.GHS, originalPrice: 699, discountPercentage: 43 },
      { regionCode: RegionCode.NG, price: 25000, currency: Currency.GBP, originalPrice: 0 },
    ],
    totalDuration: 2260,
    totalLessons: 5,
    enrollmentCount: 5821,
    averageRating: 4.7,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'c-network-sec',
    title: 'Network Security Fundamentals (Blue Team Core)',
    slug: 'network-security-fundamentals',
    description:
      'Learn how networks really work and how to secure them: segmentation, firewalls, IDS/IPS fundamentals, logging, and hands-on incident triage patterns used across enterprise teams.',
    shortDescription: 'Practical network security for real-world teams.',
    thumbnailUrl: undefined,
    status: CourseStatus.PUBLISHED,
    level: 'INTERMEDIATE',
    prerequisites: ['Introduction to Cybersecurity'],
    tags: ['networks', 'blue-team', 'defense'],
    instructor: {
      id: 'u-instructor-2',
      firstName: 'Jordan',
      lastName: 'Lee',
      avatarUrl: undefined,
    },
    modules: [
      {
        id: 'm-1',
        title: 'Network Essentials for Security',
        order: 1,
        lessons: [
          { id: 'l-1', title: 'TCP/IP refresher', duration: 540, order: 1, type: LessonType.VIDEO },
          { id: 'l-2', title: 'Traffic inspection basics', duration: 480, order: 2, type: LessonType.LAB },
        ],
      },
      {
        id: 'm-2',
        title: 'Defensive Controls',
        order: 2,
        lessons: [
          { id: 'l-3', title: 'Firewalls & rules', duration: 480, order: 1, type: LessonType.VIDEO },
          { id: 'l-4', title: 'IDS/IPS and alerts', duration: 540, order: 2, type: LessonType.TEXT },
          { id: 'l-5', title: 'Scenario: suspicious beaconing', duration: 720, order: 3, type: LessonType.LAB },
        ],
      },
    ],
    regionPricing: [
      { regionCode: RegionCode.US, price: 99, currency: Currency.USD },
      { regionCode: RegionCode.EU, price: 99, currency: Currency.EUR },
      { regionCode: RegionCode.GH, price: 799, currency: Currency.GHS },
      { regionCode: RegionCode.NG, price: 499, currency: Currency.GBP },
    ],
    totalDuration: 2760,
    totalLessons: 5,
    enrollmentCount: 3140,
    averageRating: 4.6,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'c-ethical-hacking',
    title: 'Ethical Hacking Basics (Red Team Starter)',
    slug: 'ethical-hacking-basics',
    description:
      'A responsible, structured introduction to ethical hacking: reconnaissance, vulnerability discovery, safe exploitation patterns, and reporting. Built to create job-ready intuition with a compliance-first mindset.',
    shortDescription: 'Learn ethically. Think like an attacker. Defend like a pro.',
    thumbnailUrl: undefined,
    status: CourseStatus.PUBLISHED,
    level: 'BEGINNER',
    prerequisites: ['Introduction to Cybersecurity'],
    tags: ['red-team', 'pentest', 'security'],
    instructor: {
      id: 'u-instructor-3',
      firstName: 'Sam',
      lastName: 'Patel',
      avatarUrl: undefined,
    },
    modules: [
      {
        id: 'm-1',
        title: 'Recon & Discovery',
        order: 1,
        lessons: [
          { id: 'l-1', title: 'Recon fundamentals', duration: 420, order: 1, type: LessonType.VIDEO },
          { id: 'l-2', title: 'Lab: scanning safely', duration: 900, order: 2, type: LessonType.LAB },
        ],
      },
      {
        id: 'm-2',
        title: 'Reporting & Remediation',
        order: 2,
        lessons: [
          { id: 'l-3', title: 'Writing impactful reports', duration: 480, order: 1, type: LessonType.TEXT },
          { id: 'l-4', title: 'Final assessment', duration: 600, order: 2, type: LessonType.QUIZ },
        ],
      },
    ],
    regionPricing: [
      { regionCode: RegionCode.US, price: 79, currency: Currency.USD },
      { regionCode: RegionCode.EU, price: 79, currency: Currency.EUR },
      { regionCode: RegionCode.GH, price: 599, currency: Currency.GHS },
      { regionCode: RegionCode.NG, price: 399, currency: Currency.GBP },
    ],
    totalDuration: 2400,
    totalLessons: 4,
    enrollmentCount: 4025,
    averageRating: 4.5,
    createdAt: now,
    updatedAt: now,
  },
];
