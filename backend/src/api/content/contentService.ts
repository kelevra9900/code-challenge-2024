import { StatusCodes } from 'http-status-codes';

import { Content, ParamsContent } from '@/api/content/contentModel';
import { contentRepository } from '@/api/content/contentRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const contentService = {
  // Retrieves all content from the database
  findAll: async (params: ParamsContent): Promise<ServiceResponse<Content[] | null>> => {
    try {
      const content = await contentRepository.findAllAsync(params);
      if (!content) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Content found', null, StatusCodes.NOT_FOUND);
      }
      const emptyContent = content.length === 0;
      return new ServiceResponse<Content[]>(
        ResponseStatus.Success,
        emptyContent ? 'The list is empty' : 'Contents Found',
        content,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding all content: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  update: async (id: string, content: Content): Promise<ServiceResponse<Content | null>> => {
    try {
      const updatedContent = await contentRepository.updateAsync(id, content);
      if (!updatedContent) {
        return new ServiceResponse(ResponseStatus.Failed, 'Content not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Content>(ResponseStatus.Success, 'Content updated', updatedContent, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error updating content with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  create: async (content: Content): Promise<ServiceResponse<Content | null>> => {
    try {
      const newContent = await contentRepository.createAsync(content);
      return new ServiceResponse<Content>(ResponseStatus.Success, 'Content created', newContent, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error creating content: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
  // Retrieves a single content by its ID
  findById: async (id: string): Promise<ServiceResponse<Content | null>> => {
    try {
      const content = await contentRepository.findByIdAsync(id);
      if (!content) {
        return new ServiceResponse(ResponseStatus.Failed, 'Content not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Content>(ResponseStatus.Success, 'Content found', content, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding content with id ${id}: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
