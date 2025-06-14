import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID!,
    dataset: process.env.SANITY_DATASET!,
    apiVersion: '2024-06-14',
    token: process.env.SANITY_API_TOKEN, // Must be an Editor/Contributor token
    useCdn: false,
})