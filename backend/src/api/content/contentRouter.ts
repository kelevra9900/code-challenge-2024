import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import {
  ContentCreateUpdateSchema,
  ContentSchema,
  GetContentSchema,
  ParamsContentSchema,
} from '@/api/content/contentModel';
import { contentService } from '@/api/content/contentService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const contentRegistry = new OpenAPIRegistry();

contentRegistry.register('Content', ContentSchema);

export const contentRouter: Router = (() => {
  const router = express.Router();
  router.use(express.json());

  contentRegistry.registerPath({
    method: 'get',
    path: '/contents',
    tags: ['Content'],
    request: {
      params: ParamsContentSchema.shape.params,
    },
    responses: createApiResponse(z.array(ContentSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const query = _req.query;
    const serviceResponse = await contentService.findAll({ params: query });
    handleServiceResponse(serviceResponse, res);
  });

  contentRegistry.registerPath({
    method: 'get',
    path: '/contents/{id}',
    tags: ['Content'],
    request: { params: GetContentSchema.shape.params },
    responses: createApiResponse(ContentSchema, 'Success'),
  });

  router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await contentService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  contentRegistry.registerPath({
    method: 'post',
    path: '/contents',
    tags: ['Content'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: ContentCreateUpdateSchema,
          },
        },
        description: 'Create a new category',
      },
    },
    responses: createApiResponse(ContentSchema, 'Success'),
  });

  router.post('/', async (req: Request, res: Response) => {
    const serviceResponse = await contentService.create(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  // method Put
  contentRegistry.registerPath({
    method: 'put',
    path: '/contents/{id}',
    tags: ['Content'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: ContentCreateUpdateSchema,
          },
        },
        description: 'Update a content by id',
      },
    },
    responses: createApiResponse(ContentSchema, 'Success'),
  });

  router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await contentService.update(id, req.body);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
