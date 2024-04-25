/**
 * This code snippet is a module that exports two constants: AuthSchema and SignUpSchema.
 *
 * AuthSchema is a ZodRequestBody object that represents the request body schema for signing in.
 * It has a description field set to 'Sign in' and a content field that specifies the schema for the 'application/json' content type.
 * The schema for the content type is defined using the Zod library, with an object schema that includes email and password fields.
 * The email field is validated using the z.string().email() method, while the password field is validated using the z.string() method.
 *
 * SignUpSchema is also a ZodRequestBody object that represents the request body schema for signing up.
 * It has a description field set to 'Sign up' and a content field that specifies the schema for the 'application/json' content type.
 * The schema for the content type is defined using the Zod library, with an object schema that includes email, password, and name fields.
 * The email field is validated using the z.string().email() method, the password field is validated using the z.string() method,
 * and the name field is validated using the z.string() method.
 *
 * This code snippet also imports the extendZodWithOpenApi and ZodRequestBody types from the '@asteasolutions/zod-to-openapi' library,
 * as well as the z object from the 'zod' library. It extends the z object with OpenAPI support using the extendZodWithOpenApi method.
 */
import { extendZodWithOpenApi, ZodRequestBody } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

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
