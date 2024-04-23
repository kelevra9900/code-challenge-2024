import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { isValidObjectId } from '@/common/utils/validId';
import { IUserMethods, UserModel, UserRole } from '@/contracts/user';

extendZodWithOpenApi(z);
export const UserSchema = z.object({
  _id: z.unknown().refine(isValidObjectId, {
    message: 'Invalid ObjectId',
  }),
  username: z.string(),
  email: z.string().email(),
  authentication: z
    .object({
      salt: z.string(),
      password: z.string(),
      sessionToken: z.string(),
    })
    .nullable(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const authTokenSchema = z.object({
  authorization: z
    .string()
    .refine((value) => value.startsWith('Bearer '), {
      message: 'Invalid Authorization header',
    })
    .openapi({
      description: "Include a Bearer token in the 'Authorization' header. For example: 'Bearer YOUR_TOKEN_HERE'",
    }),
});

export const AuthUserSchema = z.object({ email: z.string().email(), password: z.string() });
export const UserCreateSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
});

// Zod Request Body
export type User = z.infer<typeof UserSchema>;

// Without password and salt field
export type UserWithoutPassword = Pick<User, '_id' | 'email' | 'username' | 'role'>;

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// MongoDB Model schema for User
const schema = new Schema<User, UserModel, IUserMethods>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.READER,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<User, UserModel>('User', schema);
// type without id field
export const createUser = (user: Omit<User, 'id'>) => {
  return User.create(user);
};

export const getAllUsers = async () => {
  return User.find();
};

export const getUserByEmail = (email: string) =>
  User.findOne({ email }).select('+authentication.password +authentication.salt');

export const getUserById = (id: string) => {
  return User.findById(id);
};
