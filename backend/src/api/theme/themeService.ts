import { StatusCodes } from 'http-status-codes';

import { Theme } from '@/api/theme/themeModel';
import { themeRepository } from '@/api/theme/themeRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const themeService = {
  create: async (theme: Theme): Promise<ServiceResponse<Theme | null>> => {
    try {
      const newTheme = await themeRepository.createAsync(theme);
      return new ServiceResponse<Theme>(ResponseStatus.Success, 'Theme created', newTheme, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error creating theme: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  update: async (id: string, theme: Theme): Promise<ServiceResponse<Theme | null>> => {
    try {
      const updatedTheme = await themeRepository.updateAsync(id, theme);
      return new ServiceResponse<Theme>(ResponseStatus.Success, 'Theme updated', updatedTheme!, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error updating theme: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  findAll: async (): Promise<ServiceResponse<Theme[] | null>> => {
    try {
      const themes = await themeRepository.findAllAsync();
      if (!themes) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Themes found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Theme[]>(ResponseStatus.Success, 'Themes found', themes, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all themes: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  // Retrieves a single theme by its ID
  findById: async (id: string): Promise<ServiceResponse<Theme | null>> => {
    try {
      const theme = await themeRepository.findByIdAsync(id);
      if (!theme) {
        return new ServiceResponse(ResponseStatus.Failed, 'Theme not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Theme>(ResponseStatus.Success, 'Theme found', theme, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding theme with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
