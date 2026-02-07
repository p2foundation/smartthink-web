import { z } from 'zod';

// ============================================
// Course Validation Schemas
// ============================================

export const createCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(5000),
  shortDescription: z.string().max(300).optional(),
  price: z.number().min(0, 'Price cannot be negative'),
  currency: z.string().length(3),
  regionCodes: z.array(z.string().min(2).max(3)).min(1, 'At least one region is required'),
  categoryId: z.string().uuid().optional(),
  thumbnailUrl: z.string().url().optional(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).default('BEGINNER'),
  prerequisites: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export const updateCourseSchema = createCourseSchema.partial();

export const createModuleSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  order: z.number().int().min(0),
});

export const createLessonSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().optional(),
  videoUrl: z.string().url().optional(),
  duration: z.number().int().min(0).optional(),
  order: z.number().int().min(0),
  type: z.enum(['VIDEO', 'TEXT', 'QUIZ', 'LAB', 'ASSIGNMENT']),
});

// Inferred types
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type CreateLessonInput = z.infer<typeof createLessonSchema>;
