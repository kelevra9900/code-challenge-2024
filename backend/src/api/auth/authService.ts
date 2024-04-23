// import { sign } from '@/utils/jwt';

import { StatusCodes } from 'http-status-codes';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { jwtVerify } from '@/utils/jwt';

import { User } from '../user/userModel';
import { userRepository } from '../user/userRepository';
import { authRepository } from './authRepository';

export const authService = {
  signIn: async (email: string, password: string): Promise<ServiceResponse<User | null>> => {
    const user = await authRepository.signInAsync(email, password);
    if (!user) {
      return new ServiceResponse(ResponseStatus.Failed, 'Invalid email or password', null, StatusCodes.UNAUTHORIZED);
    }
    return new ServiceResponse<User>(ResponseStatus.Success, 'Active session', user, StatusCodes.OK);
  },
  signUp: async (user: User): Promise<ServiceResponse<User | null>> => {
    const newUser = await authRepository.signUpAsync(user);
    if (!newUser) {
      return new ServiceResponse(ResponseStatus.Failed, 'User already exists', null, StatusCodes.CONFLICT);
    }

    return new ServiceResponse<User>(ResponseStatus.Success, 'User created', newUser, StatusCodes.CREATED);
  },
  getAuthUser: async (token: string) => {
    // decrypt getAuthUser
    const user = jwtVerify({ accessToken: token });

    if (!user) {
      return new ServiceResponse(ResponseStatus.Failed, 'Invalid token', null, StatusCodes.UNAUTHORIZED);
    }

    const userExist = await userRepository.findByIdAsync(user.id.toString());

    if (!userExist) {
      return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
    }

    return new ServiceResponse<User>(ResponseStatus.Success, 'User found', userExist, StatusCodes.OK);
  },
};
