import { StatusCodes } from 'http-status-codes';
import { Mock } from 'vitest';

import { Category } from '@/api/category/categoryModel';
import { categoryRepository } from '@/api/category/categoryRepository';
import { categoryService } from '@/api/category/categoryService';

vi.mock('@/api/category/categoryRepository');
vi.mock('@/server', () => ({
  ...vi.importActual('@/server'),
  logger: {
    error: vi.fn(),
  },
}));

describe('categoryService', () => {
  const mockCategories: Category[] = [
    { _id: '1', name: 'Category 1', createdAt: new Date(), updatedAt: new Date(), slug: 'category-1' },
    { _id: '2', name: 'Category 2', createdAt: new Date(), updatedAt: new Date(), slug: 'category-2' },
  ];

  describe('findAll', () => {
    it('return all categories', async () => {
      // Arrange
      (categoryRepository.findAllAsync as Mock).mockReturnValue(mockCategories);

      // Act
      const result = await categoryService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).toContain('Categories found');
      expect(result.responseObject).toEqual(mockCategories);
    });

    it('returns a not found error for no categories found', async () => {
      // Arrange
      (categoryRepository.findAllAsync as Mock).mockReturnValue(null);

      // Act
      const result = await categoryService.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).toContain('No Categories found');
      expect(result.responseObject).toBeNull();
    });
  });

  it('hadles errors when finding all categories', async () => {
    // Arrange
    const errorMessage = 'Error finding all categories';
    (categoryRepository.findAllAsync as Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act
    const result = await categoryService.findAll();

    // Assert
    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.success).toBeFalsy();
    expect(result.message).toContain(errorMessage);
    expect(result.responseObject).toBeNull();
  });

  // TODO: Find By ID tests
});
