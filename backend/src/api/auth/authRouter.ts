/**
 * This code snippet defines an authentication router in an Express application.
 * It handles sign-in, sign-up, and retrieving the authenticated user's information.
 * The router uses the OpenAPIRegistry to register the API paths and their corresponding schemas and responses.
 * It also utilizes the ServiceResponse class and handleServiceResponse function for handling service responses.
 * The authRouter is exported as a Router instance.
 */
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { UserRole } from '@/contracts/user';

import { authTokenSchema, AuthUserSchema, UserCreateSchema, UserSchema } from '../user/userModel';
import { authService } from './authService';

export const authRegistry = new OpenAPIRegistry();
authRegistry.register('Auth', UserSchema);

export const authRouter: Router = (() => {
  const router = express.Router();
  router.use(express.json());

  // auth signin
  authRegistry.registerPath({
    method: 'post',
    path: '/auth/sign-in',
    summary: 'Sign in',
    tags: ['Authentication'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: AuthUserSchema,
          },
        },
        description: 'Sign in',
      },
    },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  // auth signup
  authRegistry.registerPath({
    method: 'post',
    path: '/auth/sign-up',
    summary: 'Sign up',
    tags: ['Authentication'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserCreateSchema,
          },
        },
        description: 'Sign up',
      },
    },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.post('/sign-in', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await authService.signIn(email, password);
    if (response !== null) {
      handleServiceResponse(response, res);
    }
  });

  router.post('/sign-up', async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      const serviceResponse = new ServiceResponse(
        ResponseStatus.Failed,
        'Email, password, and username are required',
        null,
        StatusCodes.BAD_REQUEST
      );
      handleServiceResponse(serviceResponse, res);
    }

    const response = await authService.signUp({
      email,
      authentication: { password, salt: '', sessionToken: '' },
      role: UserRole.READER,
      username,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    handleServiceResponse(response, res);
  });

  // Get auth user
  authRegistry.registerPath({
    method: 'get',
    path: '/auth/me',
    summary: 'Get auth user',
    tags: ['Authentication'],
    request: {
      headers: authTokenSchema,
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/me', async (req: Request, res: Response) => {
    try {
      if (!req.headers.authorization || req.headers.authorization?.split(' ').length === 1) {
        return res
          .send({
            message: 'UNAUTHORIZED',
          })
          .status(StatusCodes.UNAUTHORIZED);
      }
      // delete Bearer string from token
      const token = req.headers.authorization.split(' ')[1];
      handleServiceResponse(await authService.getAuthUser(token), res);
    } catch (error) {
      const serviceResponse = new ServiceResponse(
        ResponseStatus.Failed,
        'Invalid token',
        null,
        StatusCodes.UNAUTHORIZED
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
