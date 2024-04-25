import { createTheme, getAllThemes, getThemeById, Theme, updateTheme } from '@/api/theme/themeModel';

export const themes: Theme[] = [];

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
