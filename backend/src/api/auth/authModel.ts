import { extendZodWithOpenApi, ZodRequestBody } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

// ZodRequestBody for 'POST /auth/sign-in'
export const AuthSchema: ZodRequestBody = {
  description: 'Sign in',
  content: {
    'application/json': {
      schema: z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    },
  },
};
// ZodRequestBody for 'POST /auth/sign-up'
export const SignUpSchema: ZodRequestBody = {
  description: 'Sign up',
  content: {
    'application/json': {
      schema: z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
      }),
    },
  },
};
