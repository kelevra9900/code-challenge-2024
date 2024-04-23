import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// recive the zod object and extend it with openapi
// file data schema
export const UploadSchema = z.object({
  file: z.unknown(),
});

extendZodWithOpenApi(z);

export type UploadSchema = z.infer<typeof UploadSchema>;
