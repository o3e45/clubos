import { z } from 'zod';

export const createClubSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional()
});

export const updateClubSchema = createClubSchema.partial();

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10)
});
