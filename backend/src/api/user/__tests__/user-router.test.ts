// tests/userService.test.ts
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, it } from 'vitest';

import { User } from '@/api/user/userModel';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';
describe('Users API Endpoints', () => {
  it('GET /users', async () => {
    const response = await request(app).get('/users');

    const responseBody: ServiceResponse<User[]> = response.body;

    // Assert the response
    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Users found');
  });

  it('GET /users/:id', async () => {
    const response = await request(app).get('/users/66269e4f919549bc73de2b5e');

    const responseBody: ServiceResponse<User> = response.body;

    // Assert the response
    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('User found');
  });
});
