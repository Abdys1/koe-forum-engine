import { S3Client } from '@aws-sdk/client-s3';
import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

import config from '@src/config';
import { StorageUploadResult } from '@src/components/storage';

// Extend Express Request type to include uploaded file
declare global {
  namespace Express {
    interface Request {
      uploadedFile?: StorageUploadResult;
    }
  }
}

export interface ImageUploadOptions {
  maxFileSize?: number; // in bytes, default 5MB
  allowedMimeTypes?: string[];
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Get file extension from filename
 */
function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.substring(lastDot);
}

/**
 * File filter function for multer
 */
function createFileFilter(allowedMimeTypes: string[]) {
  return (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new Error(
        `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,
      );
      (error as any).status = 400;
      return cb(error);
    }
    cb(null, true);
  };
}

/**
 * Create multer storage engine (local disk or AWS S3)
 */
function createStorageEngine(directory: string) {
  const { storage } = config;

  if (storage.type === 'aws' && storage.aws) {
    // AWS S3 storage using multer-s3
    const s3Client = new S3Client({
      region: storage.aws.region,
      credentials: {
        accessKeyId: storage.aws.accessKeyId,
        secretAccessKey: storage.aws.secretAccessKey,
      },
    });

    return multerS3({
      s3: s3Client,
      bucket: storage.aws.bucketName,
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const ext = getFileExtension(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        const key = `${directory}/${filename}`;
        cb(null, key);
      },
    });
  }

  // Local disk storage
  const fs = require('fs');
  const { join } = require('path');

  const baseDir = '.data/uploads';
  const fullPath = join(baseDir, directory);

  // Create directory synchronously at initialization
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdir(fullPath, { recursive: true }, (err: any) => {
        cb(err, fullPath);
      });
    },
    filename: (req, file, cb) => {
      const ext = getFileExtension(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  });
}

/**
 * Create image upload middleware with automatic storage selection
 * @param directory The directory where files should be stored
 * @param options Upload options
 * @returns Express middleware function
 */
export function createImageUploadMiddleware(
  directory: string = 'general',
  options: ImageUploadOptions = {},
) {
  const maxFileSize = options.maxFileSize || DEFAULT_MAX_FILE_SIZE;
  const allowedMimeTypes = options.allowedMimeTypes || DEFAULT_ALLOWED_MIME_TYPES;

  const storage = createStorageEngine(directory);

  const uploadMiddleware = multer({
    storage,
    fileFilter: createFileFilter(allowedMimeTypes),
    limits: {
      fileSize: maxFileSize,
    },
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware.single('image')(req, res, async (err: any) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          const error = new Error(`File size exceeds maximum of ${maxFileSize / 1024 / 1024}MB`);
          (error as any).status = 400;
          return next(error);
        }
        return next(err);
      }

      if (err) {
        (err as any).status = 400;
        return next(err);
      }

      if (!req.file) {
        const error = new Error('No file uploaded');
        (error as any).status = 400;
        return next(error);
      }

      try {
        const { storage: storageConfig } = config;
        let uploadResult: StorageUploadResult;

        if (storageConfig.type === 'aws' && storageConfig.aws) {
          // S3 storage - multer-s3 provides location
          const location = (req.file as any).location;
          uploadResult = {
            filename: req.file.filename,
            path: (req.file as any).key,
            url: location,
            mimetype: req.file.mimetype,
            size: req.file.size,
          };
        } else {
          // Local storage
          uploadResult = {
            filename: req.file.filename,
            path: `${directory}/${req.file.filename}`,
            url: `/.data/uploads/${directory}/${req.file.filename}`,
            mimetype: req.file.mimetype,
            size: req.file.size,
          };
        }

        req.uploadedFile = uploadResult;
        next();
      } catch (uploadError) {
        (uploadError as any).status = 500;
        next(uploadError);
      }
    });
  };
}
