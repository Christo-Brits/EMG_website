import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        heroImage: z.string().optional(),
        heroImageAlt: z.string().optional(),
        order: z.number().default(0),
        features: z.array(z.string()).optional(),
        relatedServices: z.array(z.string()).optional(),
    }),
});

const areasCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        description: z.string(),
        heroImage: z.string().optional(),
        heroImageAlt: z.string().optional(),
        mapLat: z.number(),
        mapLng: z.number(),
        phone: z.string().optional(),
        neighborhoods: z.array(z.string()).optional(),
    }),
});

export const collections = {
    'services': servicesCollection,
    'areas': areasCollection,
};
