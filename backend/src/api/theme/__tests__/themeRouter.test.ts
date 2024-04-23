import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import request from 'supertest';

import { Theme } from '@/api/theme/themeModel';
import { themes } from '@/api/theme/themeRepository';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Theme API Endpoints', () => {
  describe('GET /themes', () => {
    it('should return a list of themes', async () => {
      // Act
      const response = await request(app).get('/themes');
      const responseBody: ServiceResponse<Theme[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Themes found');
      expect(responseBody.responseObject.length).toEqual(themes.length);
      responseBody.responseObject.forEach((theme, index) => compareThemes(themes[index] as Theme, theme));
    });
  });

  describe('GET /themes/:id', () => {
    it('should return a theme for a valid ID', async () => {
      // Arrange
      const testId = '6626a9f95d4487f169a81b59';
      const expectedTheme = themes.find((theme) => theme._id === testId) as Theme;

      // Act
      const response = await request(app).get(`/themes/${testId}`);
      const responseBody: ServiceResponse<Theme> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Theme found');
      if (!expectedTheme) throw new Error('Invalid test data: expectedTheme is undefined');
      compareThemes(expectedTheme, responseBody.responseObject);
    });

    it('should return a not found error for non-existent ID', async () => {
      // Arrange
      const testId = '6626a9f95d4487f169a81b52';

      // Act
      const response = await request(app).get(`/themes/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Theme not found');
      expect(responseBody.responseObject).toBeNull();
    });

    it('should return a bad request for invalid ID format', async () => {
      // Act
      const response = await request(app).get('/themes/abc');
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Invalid input: Invalid ObjectId');
      expect(responseBody.responseObject).toBeNull();
    });
  });
});

function compareThemes(expected: Theme, actual: Theme) {
  expect(actual._id).toEqual(expected._id);
  expect(actual.name).toEqual(expected.name);
  expect(new ObjectId(actual.categoryId)).toEqual(new ObjectId(expected.categoryId));
  expect(actual.allowImages).toEqual(expected.allowImages);
  expect(actual.allowVideos).toEqual(expected.allowVideos);
  expect(actual.allowTexts).toEqual(expected.allowTexts);
  expect(new Date(actual.createdAt)).toEqual(expected.createdAt);
  expect(new Date(actual.updatedAt)).toEqual(expected.updatedAt);
}
