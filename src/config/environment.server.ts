import * as z from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['info', 'error', 'warn', 'verbose', 'debug']).default('info'),
  PORT: z.string().min(1),
  BACKEND_PROTOCOL: z.enum(['http', 'https']),
  BACKEND_HOST: z.string().min(1),
  BACKEND_URI: z.string().min(1)
});

const environment = environmentSchema.parse(process.env);

export { environment }
