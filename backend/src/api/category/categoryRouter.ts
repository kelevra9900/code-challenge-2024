import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { CategoryCreateUpdateSchema, CategorySchema, GetCategorySchema } from '@/api/category/categoryModel';
import { categoryService } from '@/api/category/categoryService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const categoryRegistry = new OpenAPIRegistry();

categoryRegistry.register('Category', CategorySchema);
// Configuration pusher

export const categoryRouter: Router = (() => {
  const router = express.Router();
  router.use(express.json());

  categoryRegistry.registerPath({
    method: 'get',
    path: '/categories',
    tags: ['Category'],
    responses: createApiResponse(z.array(CategorySchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await categoryService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  categoryRegistry.registerPath({
    method: 'get',
    path: '/categories/{id}',
    tags: ['Category'],
    request: { params: GetCategorySchema.shape.params },
    responses: createApiResponse(CategorySchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetCategorySchema), async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await categoryService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  // Put and post methods are missing from the original code
  // Add them here
  categoryRegistry.registerPath({
    method: 'post',
    path: '/categories',
    tags: ['Category'],
    responses: createApiResponse(CategorySchema, 'Success'),
    request: {
      body: {
        content: {
          'application/json': {
            schema: CategoryCreateUpdateSchema,
          },
        },
        description: 'Create a new category',
      },
    },
  });

  router.post('/', async (req: Request, res: Response) => {
    const serviceResponse = await categoryService.create(req.body);
    handleServiceResponse(serviceResponse, res);
  });

  categoryRegistry.registerPath({
    method: 'put',
    path: '/categories/{id}',
    tags: ['Category'],
    request: {
      params: GetCategorySchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: CategoryCreateUpdateSchema,
          },
        },
        description: 'Update a category',
      },
    },
    responses: createApiResponse(CategorySchema, 'Success'),
  });

  router.put('/:id', validateRequest(GetCategorySchema), async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await categoryService.update(id, req.body);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
