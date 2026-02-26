import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

const hardware = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hardware' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
  }),
});

const bulletin = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bulletin' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    type: z.enum(['notice', 'post']),
  }),
});

export const collections = { projects, hardware, bulletin };
