import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { Content } from '@/api/content/contentModel';
import { contents } from '@/api/content/contentRepository';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Content API Endpoints', () => {
  describe('GET /contents', () => {
    it('should return a list of content', async () => {
      // Act
      const response = await request(app).get('/contents');
      const responseBody: ServiceResponse<Content[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Contents Found');
      expect(responseBody.responseObject.length).toEqual(contents.length);
      responseBody.responseObject.forEach((content, index) => compareContents(contents[index] as Content, content));
    });
  });

  describe('GET /contents/:id', () => {
    it('should return a content for a valid ID', async () => {
      // Arrange
      const testId = '6626dd6dc2d0fff3d52960fc';
      const expectedContent = contents.find((content) => content._id === testId) as Content;

      // Act
      const response = await request(app).get(`/contents/${testId}`);
      const responseBody: ServiceResponse<Content> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Content found');
      if (!expectedContent) throw new Error('Invalid test data: expectedContent is undefined');
      compareContents(expectedContent, responseBody.responseObject);
    });

    it('should return a not found error for non-existent ID', async () => {
      // Arrange
      const testId = '6626dd6dc2d0fff3d52960fa';

      // Act
      const response = await request(app).get(`/contents/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Content not found');
      expect(responseBody.responseObject).toBeNull();
    });

    it('should return a bad request for invalid ID format', async () => {
      // Arrange
      const testId = '1';
      // Act
      const response = await request(app).get(`/contents/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain(
        'Error finding content with id 1: Cast to ObjectId failed for value "1" (type string) at path "_id" for model "Content"'
      );
      expect(responseBody.responseObject).toBeNull();
    });
  });
});

function compareContents(expected: Content, actual: Content): void {
  expect(actual._id).toEqual(expected._id);
  expect(actual.title).toEqual(expected.title);
  expect(actual.type).toEqual(expected.type);
  expect(actual.url).toEqual(expected.url);
  expect(actual.text).toEqual(expected.text);
  expect(actual.themeId).toEqual(expected.themeId);
  expect(actual.userId).toEqual(expected.userId);
  expect(new Date(actual.createdAt)).toEqual(expected.createdAt);
  expect(new Date(actual.updatedAt)).toEqual(expected.updatedAt);
}
