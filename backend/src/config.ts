import 'dotenv/config';

import { Config } from '@src/types';

export default {
  auth: {
    secrets: {
      accessToken: process.env.ACCESS_TOKEN_SECRET || '',
      refreshToken: process.env.REFRESH_TOKEN_SECRET || '',
    },
  },
} as Config;
