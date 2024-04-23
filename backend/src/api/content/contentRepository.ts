import {
  Content,
  ContentType,
  createContent,
  deleteContent,
  getAllContents,
  getContentById,
  ParamsContent,
  updateContent,
} from './contentModel';

export const contents: Content[] = [
  {
    _id: '6626dd6dc2d0fff3d52960fc',
    title: 'string',
    type: ContentType.TEXT,
    url: 'string',
    text: 'string',
    slug: 'string',
    category: 'imagenes',
    themeId: '6626a6d3ab30f2ab4090259a',
    userId: '66269e4f919549bc73de2b5e',
    createdAt: new Date('2024-04-22T21:58:05.153Z'),
    updatedAt: new Date('2024-04-22T21:58:05.153Z'),
  },
];

export const contentRepository = {
  findAllAsync: async (params: ParamsContent): Promise<Content[]> => {
    return getAllContents(params);
  },

  findByIdAsync: async (id: string): Promise<Content | null> => {
    return getContentById(id);
  },

  createAsync: async (content: Content): Promise<Content> => {
    return createContent(content);
  },
  updateAsync: async (id: string, content: Content): Promise<Content | null> => {
    return updateContent(id, content);
  },
  deleteAsync: async (id: string): Promise<Content | null> => {
    return deleteContent(id);
  },
};
