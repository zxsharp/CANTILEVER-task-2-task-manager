import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1)
});

export const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.iso.datetime().optional(),
  scheduledDate: z.iso.datetime().optional()
});

export const updateTaskSchema = taskSchema.partial();
