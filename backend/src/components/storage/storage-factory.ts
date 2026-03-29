import { createImageUploadMiddleware } from '@src/middlewares/image-upload.middleware';

/**
 * Storage factory for image uploads
 * Automatically selects between local and AWS S3 based on configuration
 */
export class StorageFactory {
  /**
   * Create image upload middleware for a specific directory
   * Storage type is automatically selected based on STORAGE_TYPE environment variable
   *
   * @param directory The directory where files should be stored
   * @param maxFileSize Optional max file size in bytes (default 5MB)
   * @returns Express middleware function
   *
   * @example
   * ```
   * // Use in routes
   * router.post('/upload', StorageFactory.createUploadMiddleware('characters'), controller)
   * ```
   */
  static createUploadMiddleware(directory: string, maxFileSize?: number) {
    const options = maxFileSize ? { maxFileSize } : undefined;
    return createImageUploadMiddleware(directory, options);
  }
}

/**
 * Shorthand for creating upload middleware
 */
export const uploadMiddleware = {
  forDirectory: (directory: string, maxFileSize?: number) =>
    StorageFactory.createUploadMiddleware(directory, maxFileSize),
};
