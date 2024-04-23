import type { Request } from 'express';

export const uploadService = {
  uploadFile: async (req: Request) => {
    try {
      if (!req.files) {
        return { message: 'No file uploaded' };
      }
      const file = req.files.file as any;
      const fileName = file.name;
      const uploadPath = `${__dirname}/uploads/${fileName}`;

      file.mv(uploadPath);

      return { message: 'File uploaded' };
    } catch (error) {
      return { message: 'Error uploading file' };
    }
  },
};
