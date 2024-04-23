import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { Category } from '@/api/category/categoryModel';
import { categories } from '@/api/category/categoryRepository';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Category API Endpoints', () => {
  describe('GET /categories', () => {
    it('should return a list of categories', async () => {
      // Act
      const response = await request(app).get('/categories');
      const responseBody: ServiceResponse<Category[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Categories found');
      expect(responseBody.responseObject.length).toEqual(categories.length);
      responseBody.responseObject.forEach((category, index) =>
        compareCategories(categories[index] as Category, category)
      );
    });
  });

  describe('GET /categories/:id', () => {
    it('should return a category for a valid ID', async () => {
      // Arrange
      const testId = '6626a6d3ab30f2ab4090259a';
      const expectedCategory = categories.find((category) => category._id === testId) as Category;

      // Act
      const response = await request(app).get(`/categories/${testId}`);
      const responseBody: ServiceResponse<Category> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Category found');
      if (!expectedCategory) throw new Error('Invalid test data: expectedCategory is undefined');
      compareCategories(expectedCategory, responseBody.responseObject);
    });

    it('should return a not found error for non-existent ID', async () => {
      // Arrange
      const testId = '1';

      // Act
      const response = await request(app).get(`/categories/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Invalid ObjectId');
      expect(responseBody.responseObject).toBeNull();
    });

    it('should return a bad request for invalid ID format', async () => {
      // Act
      const invalidInput = 'abc';
      const response = await request(app).get(`/categories/${invalidInput}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Invalid ObjectId');
      expect(responseBody.responseObject).toBeNull();
    });
  });
});

function compareCategories(mockCaategory: Category, responseCategory: Category) {
  if (!mockCaategory || !responseCategory) {
    throw new Error('Invalid test data: category is undefined');
  }

  expect(responseCategory._id).toEqual(mockCaategory._id);
  expect(responseCategory.name).toEqual(mockCaategory.name);
  expect(responseCategory.slug).toEqual(mockCaategory.slug);
  expect(responseCategory.icon).toEqual(mockCaategory.icon);
  expect(responseCategory.image).toEqual(mockCaategory.image);
  expect(new Date(responseCategory.createdAt)).toEqual(mockCaategory.createdAt);
  expect(new Date(responseCategory.updatedAt)).toEqual(mockCaategory.updatedAt);
}
