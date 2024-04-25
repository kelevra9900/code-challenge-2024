import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, it } from 'vitest';

import { Theme } from '@/api/theme/themeModel';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Theme API Endpoints', () => {
  it('GET /themes', async () => {
    const response = await request(app).get('/themes');

    const responseBody: ServiceResponse<Theme[]> = response.body;

    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Themes found');
  });

  it('GET /themes/:id', async () => {
    const response = await request(app).get('/themes/6629a9fde36ab73c87f22ef6');

    const responseBody: ServiceResponse<Theme> = response.body;

    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Theme found');
  });

  it('POST /themes', async () => {
    const newTheme = {
      name: faker.lorem.words(2),
      categoryId: '6629a9fde36ab73c87f22ef6',
      allowImages: faker.datatype.boolean(),
      allowVideos: faker.datatype.boolean(),
      allowTexts: faker.datatype.boolean(),
    };

    const response = await request(app).post('/themes').send(newTheme);

    const responseBody: ServiceResponse<Theme> = response.body;

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Theme created');
  });

  it('PUT /themes/:id', async () => {
    const updatedTheme = {
      name: faker.lorem.words(2),
      categoryId: '6629a9fde36ab73c87f22ef6',
      allowImages: faker.datatype.boolean(),
      allowVideos: faker.datatype.boolean(),
      allowTexts: faker.datatype.boolean(),
    };

    const response = await request(app).put('/themes/6629a9fde36ab73c87f22ef6').send(updatedTheme);

    const responseBody: ServiceResponse<Theme> = response.body;

    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Theme updated');
  });
});
