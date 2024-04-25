import { describe, expect, it } from 'vitest';

import { authTokenSchema, UserSchema } from '@/api/user/userModel';

describe('UserSchema Tests', () => {
  it('test_user_schema_with_valid_data', () => {
    const validUser = {
      _id: '507f1f77bcf86cd799439011',
      username: 'testuser',
      email: 'test@example.com',
      authentication: {
        salt: 'randomsalt',
        password: 'securepassword',
        sessionToken: 'sessiontoken123',
      },
      role: 'reader',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = UserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validUser);
  });

  it('test_user_schema_with_invalid_id', () => {
    const invalidUser = {
      _id: 'invalidid',
      username: 'testuser',
      email: 'test@example.com',
      authentication: {
        salt: 'randomsalt',
        password: 'securepassword',
        sessionToken: 'sessiontoken123',
      },
      role: 'reader',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = UserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
    expect(result.error!.issues[0].message).toBe('Invalid ObjectId');
  });
});

describe('AuthTokenSchema Tests', () => {
  it('test_auth_token_schema_with_valid_token', () => {
    const validToken = {
      authorization: 'Bearer validtoken123',
    };

    const result = authTokenSchema.safeParse(validToken);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validToken);
  });
});
