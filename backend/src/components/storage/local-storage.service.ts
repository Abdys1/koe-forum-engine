import { generateFileName } from '@src/components/storage/file-name';
import { StorageService, StorageUploadResult, UploadedFile } from '@src/components/storage/storage.service';
import { mkdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';

export default class LocalStorageService implements StorageService {
  constructor(
    private readonly baseDir: string,
    private readonly publicPath: string,
  ) {}

  public upload = async (file: UploadedFile, directory: string): Promise<StorageUploadResult> => {
    const filename = generateFileName(file.mimetype);
    const path = `${directory}/${filename}`;
    await mkdir(join(this.baseDir, directory), { recursive: true });
    await writeFile(join(this.baseDir, path), new Uint8Array(file.buffer.buffer, file.buffer.byteOffset, file.buffer.byteLength));
    return { filename, path, url: `${this.publicPath}/${path}`, mimetype: file.mimetype, size: file.size };
  };

  public delete = async (path: string): Promise<void> => {
    await rm(join(this.baseDir, path), { force: true });
  };
}
