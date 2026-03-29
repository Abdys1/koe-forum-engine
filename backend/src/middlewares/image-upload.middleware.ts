import { S3Client } from '@aws-sdk/client-s3';
import { StorageUploadResult } from '@src/components/storage';
import config from '@src/config';
import { NextFunction, Request, Response } from 'express';
import { existsSync, mkdir, mkdirSync } from 'fs';
import multer, { FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

declare module 'express-serve-static-core' {
  interface Request {
    uploadedFile?: StorageUploadResult;
  }
}

interface MulterS3File extends Express.Multer.File {
  location: string;
  key: string;
}

type HttpError = Error & { status: number };

export interface ImageUploadOptions {
  maxFileSize?: number; // in bytes, default 5MB
  allowedMimeTypes?: string[];
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  if (lastDot === -1) return '';
  return filename.substring(lastDot);
}

function createFileFilter(allowedMimeTypes: string[]) {
  return (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      const error = new Error(
        `Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`,
      ) as HttpError;
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  };
}

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
      metadata: (_req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (_req, file, cb) => {
        const ext = getFileExtension(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        const key = `${directory}/${filename}`;
        cb(null, key);
      },
    });
  }

  // Local disk storage
  const baseDir = '.data/uploads';
  const fullPath = join(baseDir, directory);

  // Create directory synchronously at initialization
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: (_req, _file, cb) => {
      mkdir(fullPath, { recursive: true }, (err: NodeJS.ErrnoException | null) => {
        cb(err, fullPath);
      });
    },
    filename: (_req, file, cb) => {
      const ext = getFileExtension(file.originalname);
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  });
}

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
    uploadMiddleware.single('image')(req, res, async (err: unknown) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          const error = new Error(`File size exceeds maximum of ${maxFileSize / 1024 / 1024}MB`) as HttpError;
          error.status = 400;
          return next(error);
        }
        return next(err);
      }

      if (err) {
        const httpErr = err as HttpError;
        httpErr.status = 400;
        return next(httpErr);
      }

      if (!req.file) {
        const error = new Error('No file uploaded') as HttpError;
        error.status = 400;
        return next(error);
      }

      try {
        const { storage: storageConfig } = config;
        let uploadResult: StorageUploadResult;

        if (storageConfig.type === 'aws' && storageConfig.aws) {
          // S3 storage - multer-s3 provides location
          const s3File = req.file as MulterS3File;
          uploadResult = {
            filename: req.file.filename,
            path: s3File.key,
            url: s3File.location,
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
        const httpError = uploadError as HttpError;
        httpError.status = 500;
        next(httpError);
      }
    });
  };
}
