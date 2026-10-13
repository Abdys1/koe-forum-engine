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

export interface Readable<T> {
  findAll: () => Promise<T[]>;
  findById: (id: number) => Promise<T | null>;
}

export interface Creatable<T> {
  create: (entity: T) => Promise<T>;
}

export interface Updatable<T, TUpdate> {
  update: (id: number, data: TUpdate) => Promise<T>;
}

export interface Deletable {
  delete: (id: number) => Promise<void>;
}

export interface CrudRepository<T, TUpdate> extends Readable<T>, Creatable<T>, Updatable<T, TUpdate>, Deletable {}

export type StorageType = 'local' | 'aws';