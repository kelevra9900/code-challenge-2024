import { ObjectId } from 'mongodb';

import { createTheme, getAllThemes, getThemeById, Theme, updateTheme } from '@/api/theme/themeModel';

export const themes: Theme[] = [
  {
    _id: '6626a9f95d4487f169a81b59',
    name: 'Ciencias',
    categoryId: new ObjectId('6626a6d3ab30f2ab4090259a'),
    allowImages: true,
    allowVideos: true,
    allowTexts: true,
    createdAt: new Date('2024-04-22T18:18:33.162Z'),
    updatedAt: new Date('2024-04-22T18:18:33.162Z'),
  },
];

export const themeRepository = {
  findAllAsync: async (): Promise<Theme[]> => {
    return getAllThemes();
  },

  findByIdAsync: async (id: string): Promise<Theme | null> => {
    return getThemeById(id);
  },
  createAsync: async (theme: Theme): Promise<Theme> => {
    return createTheme(theme);
  },
  updateAsync: async (id: string, theme: Theme): Promise<Theme | null> => {
    return updateTheme(id, theme);
  },
};
