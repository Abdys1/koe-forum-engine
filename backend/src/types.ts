export interface Config {
  auth: { secrets: { accessToken: string; refreshToken: string } };
  storage: {
    type: 'local' | 'aws';
    aws?: {
      region: string;
      bucketName: string;
      accessKeyId: string;
      secretAccessKey: string;
    };
  };
}

export interface Repository<T> {
  create: (entity: T) => Promise<void>;
}

export type StorageType = 'local' | 'aws';