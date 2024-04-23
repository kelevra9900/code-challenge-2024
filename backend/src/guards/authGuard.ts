import { NextFunction, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { IContextRequest, IUserRequest } from '@/contracts/request';

export const authGuard = {
  isAuth: ({ context: { user } }: IContextRequest<IUserRequest>, res: Response, next: NextFunction) => {
    if (!user) {
      const response = new ServiceResponse(ResponseStatus.Failed, 'Unauthorized', null, StatusCodes.UNAUTHORIZED);
      return res.status(StatusCodes.UNAUTHORIZED).json(response);
    }
    next();
  },
  isGuest: ({ context: { user } }: IContextRequest<IUserRequest>, res: Response, next: NextFunction) => {
    if (!user) {
      return next();
    }

    return res.status(StatusCodes.FORBIDDEN).json({
      message: ReasonPhrases.FORBIDDEN,
      status: StatusCodes.FORBIDDEN,
    });
  },
};
