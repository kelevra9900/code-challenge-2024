import {
  Category,
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '@/api/category/categoryModel';
export const categories: Category[] = [
  {
    _id: '6626a6d3ab30f2ab4090259a',
    name: 'category',
    slug: 'category-1',
    icon: 'https://localhost',
    image: 'https://localhost',
    createdAt: new Date('2024-04-22T18:05:07.867Z'),
    updatedAt: new Date('2024-04-22T18:05:07.867Z'),
  },
];

export const categoryRepository = {
  findAllAsync: async (): Promise<Category[]> => {
    return getAllCategories();
  },

  findByIdAsync: async (id: string): Promise<Category | null> => {
    return getCategoryById(id);
  },
  createAsync: async (category: Category): Promise<Category> => {
    return createCategory(category);
  },
  updateAsync: async (id: string, category: Category): Promise<Category | null> => {
    return updateCategory(id, category);
  },
  deleteAsync: async (id: string): Promise<Category | null> => {
    return deleteCategory(id);
  },
};
