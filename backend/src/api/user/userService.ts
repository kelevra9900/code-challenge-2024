import { StatusCodes } from 'http-status-codes';

import { User } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

import { authRepository } from '../auth/authRepository';

export const userService = {
  isExistByEmail: (email: string) => userRepository.isExistByEmail(email),

  // Retrieves all users from the database
  findAll: async (): Promise<ServiceResponse<User[] | null>> => {
    try {
      const users = await userRepository.findAllAsync();
      if (!users) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Users found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<User[]>(ResponseStatus.Success, 'Users found', users, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single user by their ID
  findById: async (id: string): Promise<ServiceResponse<User | null>> => {
    try {
      const user = await userRepository.findByIdAsync(id);
      if (!user) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<User>(ResponseStatus.Success, 'User found', user, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  signUp: async (
    user: User
  ): Promise<ServiceResponse<Pick<User, 'email' | 'role' | 'username' | 'authentication'> | null>> => {
    try {
      const newUser = await authRepository.signUpAsync(user);
      if (!newUser) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not created', null, StatusCodes.INTERNAL_SERVER_ERROR);
      }
      return new ServiceResponse<User>(ResponseStatus.Success, 'User created', newUser, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error creating user: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
