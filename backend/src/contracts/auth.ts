import { IUser } from './user';

export type SignInPayload = Pick<IUser, 'email' | 'authentication'>;

export type SignUpPayload = Pick<IUser, 'email' | 'authentication'>;

export type ResetPasswordPayload = Pick<IUser, 'email'>;

export type NewPasswordPayload = Pick<IUser, 'authentication'>;
