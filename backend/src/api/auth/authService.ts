/**
 * Represents the authService object.
 * Provides methods for user authentication and authorization.
 *
 * @property {Function} signIn - Asynchronously signs in a user with the provided email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<ServiceResponse<User | null>>} - A promise that resolves to a ServiceResponse object containing the user information if the sign-in is successful, or null if the sign-in fails.
 *
 * @property {Function} signUp - Asynchronously signs up a new user with the provided user object.
 * @param {User} user - The user object containing the user information.
 * @returns {Promise<ServiceResponse<User | null>>} - A promise that resolves to a ServiceResponse object containing the newly created user information if the sign-up is successful, or null if the sign-up fails.
 *
 * @property {Function} getAuthUser - Asynchronously retrieves the authenticated user with the provided token.
 * @param {string} token - The authentication token.
 * @returns {Promise<ServiceResponse<User>>} - A promise that resolves to a ServiceResponse object containing the authenticated user information if the token is valid, or an error message if the token is invalid or the user is not found.
 */

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
