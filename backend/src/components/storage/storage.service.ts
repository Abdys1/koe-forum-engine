export interface UploadedFile {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export interface StorageUploadResult {
  filename: string;
  path: string;
  url: string;
  mimetype: string;
  size: number;
}

export interface StorageService {
  /**
   * Upload a file to storage
   * @param file The file to upload
   * @param directory The directory/folder where the file should be stored
   * @returns Upload result with file path and URL
   */
  upload(file: UploadedFile, directory: string): Promise<StorageUploadResult>;

  /**
   * Delete a file from storage
   * @param path The path of the file to delete (returned from upload)
   */
  delete(path: string): Promise<void>;
}
