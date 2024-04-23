// util jwt function
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

import { User } from '@/api/user/userModel';
import { env } from '@/common/utils/envConfig';
import { IAccessToken, IJwtUser } from '@/contracts/jwt';

const secret = env.APP_SECRET;
const expiresIn = env.JWT_EXPIRATION;
export const sign = (user: Pick<User, 'username' | 'email'>) => {
  return jwt.sign({ email: user.email, username: user.username }, secret, { expiresIn: process.env.JWT_EXPIRATION });
};

export const jwtVerify = ({ accessToken }: { accessToken: string }) => {
  return jwt.verify(accessToken, process.env.JWT_SECRET!) as IJwtUser;
};

export const jwtSign = (id: ObjectId): IAccessToken => {
  const accessToken = jwt.sign({ id }, secret, {
    expiresIn: expiresIn,
  });

  return { accessToken };
};

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
};
