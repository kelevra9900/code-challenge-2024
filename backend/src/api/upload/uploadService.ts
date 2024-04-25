import type { Request } from 'express';

export const uploadService = {
  uploadFile: async (req: Request) => {
    try {
      if (!req.files) {
        return { message: 'No file uploaded' };
      }
      const file = req.files.file as any;
      const fileName = file.name;
      const uploadPath = `${__dirname}/../../../uploads/${fileName}`;
      // doc file upload path for access in browser
      const path = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;

      file.mv(uploadPath);

      return { message: 'File uploaded', path };
    } catch (error) {
      return { message: 'Error uploading file' };
    }
  },
};
