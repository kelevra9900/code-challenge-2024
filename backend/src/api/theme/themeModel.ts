/**
 * This code snippet defines a TypeScript module that exports several functions and types related to a "Theme" entity.
 *
 * The module imports various dependencies, including "@asteasolutions/zod-to-openapi", "mongoose", and "zod".
 * It also imports two utility functions from "@/common/utils/commonValidation" and "@/common/utils/validId".
 *
 * The module extends the "zod" library with an OpenAPI function and defines a "Theme" type using a Zod schema.
 * It also defines a "ThemeCreateUpdateSchema" and a "GetThemeSchema" using the "Theme" schema.
 *
 * The module creates a Mongoose schema for the "Theme" entity and exports a Mongoose model based on that schema.
 *
 * Additionally, the module exports several functions for CRUD operations on the "Theme" entity, including "createTheme", "getThemeById", "getAllThemes", "updateTheme", and "deleteTheme".
 *
 * Note: The code snippet is not a complete TypeScript module and may require additional imports and setup to work properly.
 */
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { isValidObjectId } from '@/common/utils/validId';

extendZodWithOpenApi(z);

export type Theme = z.infer<typeof ThemeSchema>;

export const ThemeSchema = z.object({
  _id: z.unknown().refine(isValidObjectId, {
    message: 'Invalid ObjectId',
  }),
  name: z.string(),
  categoryId: z.custom<mongoose.Types.ObjectId>(),
  allowImages: z.boolean(),
  allowVideos: z.boolean(),
  allowTexts: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ThemeCreateUpdateSchema = ThemeSchema.omit({ _id: true, createdAt: true, updatedAt: true });

export const GetThemeSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

const schema = new Schema<Theme>(
  {
    name: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    allowImages: { type: Boolean, required: true },
    allowVideos: { type: Boolean, required: true },
    allowTexts: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const Theme = mongoose.model('Theme', schema);

export const createTheme = async (theme: Theme): Promise<Theme> => {
  return Theme.create(theme);
};

export const getThemeById = async (id: string): Promise<Theme | null> => {
  return Theme.findById(id);
};

export const getAllThemes = async (): Promise<Theme[]> => {
  return Theme.find();
};

export const updateTheme = async (id: string, theme: Theme): Promise<Theme | null> => {
  return Theme.findById(id).then((foundTheme) => {
    if (!foundTheme) {
      return null;
    }
    foundTheme.set(theme);
    return foundTheme.save();
  });
};

export const deleteTheme = async (id: number): Promise<Theme | null> => {
  return Theme.findByIdAndDelete(id);
};
