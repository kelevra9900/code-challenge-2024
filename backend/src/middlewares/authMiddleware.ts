import { NextFunction, Request, Response } from 'express';

import { userService } from '@/api/user/userService';
import { redis } from '@/config/redis';
import { getAccessTokenFromHeaders } from '@/utils/headers';
import { jwtVerify } from '@/utils/jwt';

export const authMiddleware = async (req: Request, _: Response, next: NextFunction): Promise<void> => {
  try {
    Object.assign(req, { context: {} });

    const { accessToken } = getAccessTokenFromHeaders(req.headers);
    if (!accessToken) return next();

    const { id } = jwtVerify({ accessToken });
    if (!id) return next();

    if (redis.client === undefined) return next();

    const isAccessTokenExpired = await redis.client!.get(`expiredToken:${accessToken}`);
    if (isAccessTokenExpired) return next();

    const user = await userService.findById(id.toString());
    if (!user) return next();

    Object.assign(req, {
      context: {
        user,
        accessToken,
      },
    });

    return next();
  } catch (error) {
    return next();
  }
};
