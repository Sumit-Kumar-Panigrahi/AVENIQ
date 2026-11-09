import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(5000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PREFIX: z.string().default('/api/v1'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL must be provided')
    .refine(
      (val) => val.startsWith('postgresql://') || val.startsWith('postgres://'),
      'DATABASE_URL must be a valid PostgreSQL connection string starting with postgresql:// or postgres://',
    ),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('===========================================================');
  console.error('CRITICAL: Environment variable validation failed:');
  parsed.error.issues.forEach((issue) => {
    console.error(` - [${issue.path.join('.')}]: ${issue.message}`);
  });
  console.error('Please check your .env file or refer to .env.example');
  console.error('===========================================================');
  throw new Error('Invalid environment configuration');
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
