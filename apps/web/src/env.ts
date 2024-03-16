import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BASE_URL: z.string().optional().default('hanjaemeo.vercel.app'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    VERCEL_URL: z.string().optional(),
    PORT: z.coerce.number().optional().default(3000),
    YOUTUBE_API_KEY: z.string(),
  },
  client: {
    // example:
    // NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CHAT_API_ENDPOINT: z.string(),
  },
  runtimeEnv: {
    // you'll have to destructure all the keys manually.
    // This is due to how Next.js bundles environment variables and
    // only explicitly accessed variables are included in the bundle.
    // Refer: https://env.t3.gg/docs/nextjs
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
    NEXT_PUBLIC_CHAT_API_ENDPOINT: process.env.NEXT_PUBLIC_CHAT_API_ENDPOINT,
  },
});
