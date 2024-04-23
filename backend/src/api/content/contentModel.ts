import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';
import { isValidObjectId } from '@/common/utils/validId';

extendZodWithOpenApi(z);

export enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export type Content = z.infer<typeof ContentSchema>;

export const ContentSchema = z.object({
  _id: z.unknown().refine(isValidObjectId, {
    message: 'Invalid ObjectId',
  }),
  title: z.string(),
  type: z.nativeEnum(ContentType),
  url: z.string(),
  text: z.string().optional(),
  slug: z.string(),
  category: z.string(),
  themeId: z.unknown().refine(isValidObjectId, {
    message: 'Theme ObjectId is invalid',
  }),
  userId: z.unknown().refine(isValidObjectId, {
    message: 'User ID id invalid',
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ContentCreateUpdateSchema = ContentSchema.omit({ _id: true, createdAt: true, updatedAt: true });

export const GetContentSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const ParamsContentSchema = z.object({
  params: z.object({
    category: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
  }),
});

export type ParamsContent = z.infer<typeof ParamsContentSchema>;

const schema = new Schema<Content>(
  {
    title: { type: String, required: true },
    type: { type: String, enum: Object.values(ContentType), required: true },
    slug: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    text: { type: String },
    themeId: { type: Schema.Types.ObjectId, ref: 'Theme', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Content = mongoose.model('Content', schema);

export const createContent = async (content: Content): Promise<Content> => {
  return Content.create(content);
};

export const getContentById = async (id: string): Promise<Content | null> => {
  return Content.findById(id);
};

export const getAllContents = async ({ params }: ParamsContent): Promise<Content[]> => {
  const { category, page = 1, limit = 10 } = params;
  const query = category ? { category } : {};
  return Content.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
};

export const updateContent = async (id: string, content: Content): Promise<Content | null> => {
  return Content.findById(id).then((foundContent) => {
    if (!foundContent) {
      return null;
    }
    foundContent.set(content);
    return foundContent.save();
  });
};

export const deleteContent = async (id: string): Promise<Content | null> => {
  return Content.findByIdAndDelete(id);
};
