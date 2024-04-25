import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, it } from 'vitest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Auth API Endpoints', () => {
  it('POST /auth/sign-in wrong user or password', async () => {
    const response = await request(app).post('/auth/sign-in').send({
      email: '',
      password: '',
    });

    const responseBody: ServiceResponse<null> = response.body;

    // Assert the response
    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(responseBody.success).toBe(false);
    expect(responseBody.message).toContain('Invalid email or password');
  });

  it('POST /auth/sign-in correct user and password', async () => {
    const response = await request(app).post('/auth/sign-in').send({
      email: 'user@gmail.com',
      password: '123456789',
    });

    const responseBody: ServiceResponse<null> = response.body;

    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
  });

  it('POST /auth/sign-up', async () => {
    const response = await request(app).post('/auth/sign-up').send({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    });

    const responseBody: ServiceResponse<null> = response.body;

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(responseBody.success).toBe(true);
  });
});
