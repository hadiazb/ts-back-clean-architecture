import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT || '8080',
    env: process.env.NODE_ENV || 'development',
    host_dev: process.env.HOST_DEV,
    host_pro: process.env.HOST_PRO
  },
  database: {
    dbName: process.env.DB_NAME || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbPort: process.env.DB_PORT || '',
    dbHost: process.env.DB_HOST || ''
  },
  redis: {
    port: process.env.REDISCACHEHOSTNAME || 6380,
    hostName: process.env.REDISCACHEHOSTNAME || '',
    key: process.env.REDISCACHEKEY || ''
  },
  auth: {
    secret: process.env.SECRET
  }
};
