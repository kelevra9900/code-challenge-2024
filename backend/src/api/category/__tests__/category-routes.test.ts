import { faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, it } from 'vitest';

import { Category } from '@/api/category/categoryModel';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Category API Endpoints', () => {
  it('GET /categories', async () => {
    const response = await request(app).get('/categories');

    const responseBody: ServiceResponse<Category[]> = response.body;

    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Categories found');
  });

  it('GET /categories/:id', async () => {
    const response = await request(app).get('/categories/6626a6d3ab30f2ab4090259a');

    const responseBody: ServiceResponse<Category> = response.body;

    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Category found');
  });

  it('POST /categories', async () => {
    const newCategory = {
      name: faker.lorem.words(2),
      slug: faker.lorem.words(2),
      icon: faker.lorem.words(2),
      image: faker.image.imageUrl(),
    };

    const response = await request(app).post('/categories').send(newCategory);

    const responseBody: ServiceResponse<Category> = response.body;

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Category created');
  });

  it('PUT /categories/:id', async () => {
    const updatedCategory = {
      name: faker.lorem.words(2),
      slug: faker.lorem.words(2),
      icon: faker.lorem.words(2),
      image: faker.image.imageUrl(),
    };

    const response = await request(app).put('/categories/6629a8ad6a2806797e96e274').send(updatedCategory);

    const responseBody: ServiceResponse<Category> = response.body;

    expect(response.status).toBe(StatusCodes.OK);
    expect(responseBody.success).toBe(true);
    expect(responseBody.message).toContain('Category updated');
  });
});
