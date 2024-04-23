import { StatusCodes } from 'http-status-codes';
import { Mock } from 'vitest';

import { Theme } from '@/api/theme/themeModel';
import { themeRepository } from '@/api/theme/themeRepository';
import { themeService } from '@/api/theme/themeService';

vi.mock('@/api/theme/themeRepository');
vi.mock('@/server', () => ({
  ...vi.importActual('@/server'),
  logger: {
    error: vi.fn(),
  },
}));

describe('themeService', () => {
  const mockThemes: Theme[] = [
    {
      _id: '1',
      name: 'Ciencia',
      categoryId: 1,
      allowImages: true,
      allowVideos: true,
      allowTexts: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      name: 'Matematicas',
      categoryId: 2,
      allowImages: true,
      allowVideos: true,
      allowTexts: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '3',
      name: 'Deportes',
      categoryId: 3,
      allowImages: true,
      allowVideos: true,
      allowTexts: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  describe('findAll', () => {
    it('return all themes', async () => {
      // Arrange
      (themeRepository.findAllAsync as Mock).mockReturnValue(mockThemes);

      // Act
      const result = await themeService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('Themes found');
      expect(result.responseObject).toEqual(mockThemes);
    });

    it('returns a not found error for no themes found', async () => {
      // Arrange
      (themeRepository.findAllAsync as Mock).mockReturnValue(null);

      // Act
      const result = await themeService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('No Themes found');
      expect(result.responseObject).toBeNull();
    });
  });
  it('hadles errors when finding all themes', async () => {
    // Arrange
    const errorMessage = 'Error finding all themes';
    (themeRepository.findAllAsync as Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act
    const result = await themeService.findAll();

    // Assert
    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.success).toBeFalsy();
    expect(result.message).toContain(errorMessage);
    expect(result.responseObject).toBeNull();
  });
});
