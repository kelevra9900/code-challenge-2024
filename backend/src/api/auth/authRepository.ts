/**
 * Represents an authentication repository.
 * Provides methods for signing in and signing up users.
 *
 * @class
 */
import { authentication, jwtSign, random } from '@/utils/jwt';

import { getUserByEmail, User } from '../user/userModel';

export const authRepository = {
  signInAsync: async (email: string, password: string): Promise<User | null> => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return null;
      }

      const expectedHash = authentication(user.authentication.salt, password);

      if (user.authentication.password !== expectedHash) {
        return null;
      }
      const jwt = jwtSign(user._id);

      if (!jwt) {
        return null;
      }

      user.authentication.sessionToken = jwt.accessToken;
      await user.save();
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },

  signUpAsync: async (user: User): Promise<User | null> => {
    try {
      const userExist = await User.findOne({ email: user.email });
      if (userExist) {
        return null;
      }
      const salt = random();

      const newUser = new User({
        ...user,
        authentication: {
          salt,
          password: authentication(salt, user.authentication!.password!),
        },
      });

      await newUser.save();
      const sessionToken = jwtSign(newUser._id);

      newUser.authentication.sessionToken = sessionToken.accessToken;
      await newUser.save();

      return newUser;
    } catch (e: any) {
      console.error('Error al registrar usuario:', e);
      throw new Error(e);
    }
  },
};
