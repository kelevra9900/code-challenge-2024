import { Model, ObjectId } from 'mongoose';

export interface IVerification {
  email: string;
  accessToken: string;
  expiresIn: Date;
  user: ObjectId;
}

export interface IResetPassword {
  accessToken: string;
  expiresIn: Date;
  user: ObjectId;
}

export enum UserRole {
  ADMIN = 'admin',
  WRITER = 'writer',
  READER = 'reader',
}
export interface IUser {
  _id: ObjectId;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  username: string;
  role: UserRole;
  updatedAt: Date;
  createdAt: Date;
}

export interface IUserMethods {
  comparePassword: (password: string) => boolean;
}

export type UserModel = Model<IUser, unknown, IUserMethods>;
export type VerificationRequestPayload = Pick<IUser, 'email'>;

export interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface DeleteProfilePayload {
  password: string;
}

export interface IUserMethods {
  comparePassword: (password: string) => boolean;
}
