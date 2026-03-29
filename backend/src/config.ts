import 'dotenv/config';

import { Config, StorageType } from '@src/types';

const storageType: StorageType = (process.env.STORAGE_TYPE || 'local') as StorageType;

if (!['local', 'aws'].includes(storageType)) {
  throw new Error(`Invalid STORAGE_TYPE: ${storageType}. Must be 'local' or 'aws'`);
}

const config: Config = {
  auth: {
    secrets: {
      accessToken: process.env.ACCESS_TOKEN_SECRET || '',
      refreshToken: process.env.REFRESH_TOKEN_SECRET || '',
    },
  },
  storage: {
    type: storageType,
  },
};

if (storageType === 'aws') {
  if (!process.env.AWS_REGION || !process.env.AWS_BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS storage requires AWS_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY environment variables');
  }

  config.storage.aws = {
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

export default config;
