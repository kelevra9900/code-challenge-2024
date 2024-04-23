import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

import { UploadSchema } from './uploadModel';
import { uploadService } from './uploadService';

export const uploadRegistry = new OpenAPIRegistry();

uploadRegistry.register('Upload', UploadSchema);

export const uploadRouter: Router = (() => {
  const router = express.Router();
  router.use(express.json());

  uploadRegistry.registerPath({
    method: 'post',
    path: '/upload',
    tags: ['Upload'],
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        },
      },
    },
    responses: createApiResponse(z.object({ message: z.string() }), 'Success'),
  });

  router.post('/', async (req: Request, res: Response) => {
    const serviceResponse = await uploadService.uploadFile(req);
    // handleServiceResponse(serviceResponse, res);
    return res.status(200).send(serviceResponse);
  });

  return router;
})();
