import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';

declare module 'express-serve-static-core' {
  interface Request {
    imageUploadError?: ImageUploadError;
  }
}

export const ImageUploadError = {
  INVALID_TYPE: 'INVALID_TYPE',
  TOO_LARGE: 'TOO_LARGE',
} as const;

export type ImageUploadError = keyof typeof ImageUploadError;

export interface ImageUploadOptions {
  fieldName?: string;
  maxFileSize?: number;
  allowedMimeTypes?: string[];
}

export const DEFAULT_MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const DEFAULT_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function createImageUploadMiddleware(options: ImageUploadOptions = {}) {
  const fieldName = options.fieldName ?? 'image';
  const allowedMimeTypes = options.allowedMimeTypes ?? DEFAULT_ALLOWED_MIME_TYPES;

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: options.maxFileSize ?? DEFAULT_MAX_IMAGE_SIZE, files: 1 },
    fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        req.imageUploadError = ImageUploadError.INVALID_TYPE;
        return cb(null, false);
      }
      cb(null, true);
    },
  }).single(fieldName);

  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: unknown) => {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        req.imageUploadError = ImageUploadError.TOO_LARGE;
        return next();
      }
      if (err instanceof multer.MulterError) {
        return next(Object.assign(err, { status: 400 }));
      }
      next(err);
    });
  };
}
