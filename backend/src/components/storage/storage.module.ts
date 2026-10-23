import LocalStorageService from '@src/components/storage/local-storage.service';
import S3StorageService from '@src/components/storage/s3-storage.service';
import { StorageService } from '@src/components/storage/storage.service';
import config from '@src/config';
import { Config } from '@src/types';
import { asFunction } from 'awilix';

export const LOCAL_UPLOADS_PUBLIC_PATH = '/.data/uploads';

export const createStorageService = (storageConfig: Config['storage']): StorageService =>
  storageConfig.type === 'aws' && storageConfig.aws
    ? new S3StorageService(storageConfig.aws)
    : new LocalStorageService(storageConfig.local.uploadsDir, LOCAL_UPLOADS_PUBLIC_PATH);

export const storageModule = {
  storageService: asFunction(() => createStorageService(config.storage)).singleton(),
};
