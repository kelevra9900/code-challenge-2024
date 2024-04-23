import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';
import { Mock } from 'vitest';

import { Content, ContentType } from '@/api/content/contentModel';
import { contentRepository } from '@/api/content/contentRepository';
import { contentService } from '@/api/content/contentService';

vi.mock('@/api/content/contentRepository');
vi.mock('@/server', () => ({
  ...vi.importActual('@/server'),
  logger: {
    error: vi.fn(),
  },
}));

describe('contentService', () => {
  const mockContents: Content[] = [
    {
      _id: new ObjectId(),
      title: 'Content 1',
      type: ContentType.TEXT,
      url: 'https://content1.com',
      text: 'Content 1 text',
      slug: 'content-1',
      themeId: new ObjectId(),
      userId: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId(),
      title: 'Content 2',
      type: ContentType.TEXT,
      url: 'https://content2.com',
      slug: 'content-2',
      text: 'Content 2 text',
      themeId: new ObjectId(),
      userId: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  describe('findAll', () => {
    it('return all contents', async () => {
      // Arrange
      (contentRepository.findAllAsync as Mock).mockReturnValue(mockContents);

      // Act
      const result = await contentService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('Contents Found');
      expect(result.responseObject).toEqual(mockContents);
    });

    it('return a not found error for no contents found', async () => {
      // Arrange
      (contentRepository.findAllAsync as Mock).mockReturnValue(null);

      // Act
      const result = await contentService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('No Content found');
      expect(result.responseObject).toBeNull();
    });

    it('handle error when finding all contents', async () => {
      // Arrange
      const errorMessage = 'Error finding all content: an error';
      (contentRepository.findAllAsync as Mock).mockImplementation(() => {
        throw new Error('an error');
      });

      // Act
      const result = await contentService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain(errorMessage);
      expect(result.responseObject).toBeNull();
    });
  });
});
