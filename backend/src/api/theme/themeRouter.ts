import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetThemeSchema, ThemeCreateUpdateSchema, ThemeSchema } from '@/api/theme/themeModel';
import { themeService } from '@/api/theme/themeService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const themeRegistry = new OpenAPIRegistry();

themeRegistry.register('Theme', ThemeSchema);

export const themeRouter: Router = (() => {
  const router = express.Router();
  router.use(express.json());

  themeRegistry.registerPath({
    method: 'get',
    path: '/themes',
    tags: ['Theme'],
    responses: createApiResponse(z.array(ThemeSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await themeService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  themeRegistry.registerPath({
    method: 'get',
    path: '/themes/{id}',
    tags: ['Theme'],
    request: { params: GetThemeSchema.shape.params },
    responses: createApiResponse(ThemeSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetThemeSchema), async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await themeService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  themeRegistry.registerPath({
    method: 'post',
    path: '/themes',
    tags: ['Theme'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: ThemeCreateUpdateSchema,
          },
        },
        description: 'Update a content by id',
      },
    },
    responses: createApiResponse(ThemeSchema, 'Success'),
  });

  router.post('/', async (req: Request, res: Response) => {
    const serviceResponse = await themeService.create(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  themeRegistry.registerPath({
    method: 'put',
    path: '/themes/{id}',
    tags: ['Theme'],
    request: {
      params: GetThemeSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: ThemeCreateUpdateSchema,
          },
        },
        description: 'Update a content by id',
      },
    },
    responses: createApiResponse(ThemeSchema, 'Success'),
  });

  router.put('/:id', validateRequest(GetThemeSchema), async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await themeService.update(id, req.body);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
