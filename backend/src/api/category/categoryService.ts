import { StatusCodes } from 'http-status-codes';

import { Category } from '@/api/category/categoryModel';
import { categoryRepository } from '@/api/category/categoryRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const categoryService = {
  create: async (category: Category): Promise<ServiceResponse<Category | null>> => {
    try {
      const newCategory = await categoryRepository.createAsync(category);
      return new ServiceResponse<Category>(
        ResponseStatus.Success,
        'Category created',
        newCategory,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating category: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  update: async (id: string, category: Category): Promise<ServiceResponse<Category | null>> => {
    try {
      const updatedCategory = await categoryRepository.updateAsync(id, category);
      return new ServiceResponse<Category>(
        ResponseStatus.Success,
        'Category updated',
        updatedCategory!,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating category: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  // Retrieves all categories from the database
  findAll: async (): Promise<ServiceResponse<Category[] | null>> => {
    try {
      const categories = await categoryRepository.findAllAsync();
      if (!categories) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Categories found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Category[]>(ResponseStatus.Success, 'Categories found', categories, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all categories: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single category by its ID
  findById: async (id: string): Promise<ServiceResponse<Category | null>> => {
    try {
      const category = await categoryRepository.findByIdAsync(id);
      if (!category) {
        return new ServiceResponse(ResponseStatus.Failed, 'Category not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Category>(ResponseStatus.Success, 'Category found', category, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding category with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
