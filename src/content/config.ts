import { z, defineCollection } from "astro:content";

export const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    archived: z.boolean().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
