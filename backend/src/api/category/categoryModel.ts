import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { isValidObjectId } from '@/common/utils/validId';

extendZodWithOpenApi(z);

export type Category = z.infer<typeof CategorySchema>;

export const CategorySchema = z.object({
  _id: z.unknown().refine(isValidObjectId, {
    message: 'Invalid ObjectId',
  }),
  name: z.string(),
  slug: z.string(),
  icon: z.string().optional(),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// update categorySchema
export const CategoryCreateUpdateSchema = CategorySchema.omit({ _id: true, createdAt: true, updatedAt: true });
export const GetCategorySchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

const schema = new Schema<Category>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Category = mongoose.model('Category', schema);

export const createCategory = async (category: Category): Promise<Category> => {
  return Category.create(category);
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  return Category.findById(id);
};

export const getAllCategories = async (): Promise<Category[]> => {
  return Category.find();
};

export const updateCategory = async (id: string, category: Category): Promise<Category | null> => {
  return Category.findById(id).then((foundCategory) => {
    if (!foundCategory) {
      return null;
    }
    foundCategory.set(category);
    return foundCategory.save();
  });
};

export const deleteCategory = async (id: string): Promise<Category | null> => {
  return Category.findByIdAndDelete(id);
};
