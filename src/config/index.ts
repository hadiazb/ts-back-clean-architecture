import dotenv from 'dotenv';

dotenv.config();

const switchConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'develop':
      return {
        app: {
          host: process.env.HOST_DEVELOP
        },
        database: {
          dbName: process.env.DB_NAME_DEVELOP || '',
          dbUser: process.env.DB_USER_DEVELOP || '',
          dbPassword: process.env.DB_PASSWORD_DEVELOP || '',
          dbPort: process.env.DB_PORT_DEVELOP || '',
          dbHost: process.env.DB_HOST_DEVELOP || ''
        },
        redis: {
          port: process.env.REDISCACHEHOSTNAME_DEVELOP || 6380,
          hostName: process.env.REDISCACHEHOSTNAME_DEVELOP || '',
          key: process.env.REDISCACHEKEY_DEVELOP || ''
        },
        auth: {
          secret: process.env.JWT_SECRET_DEVELOP || ''
        },
        mail: {
          apiKey: process.env.KEY_MAIL_DEVELOP,
          user: process.env.USER_MAIL_DEVELOP
        }
      };
    case 'production':
      return {
        app: {
          host: process.env.HOST_PRODUCTION
        },
        database: {
          dbName: process.env.DB_NAME_PRODUCTION || '',
          dbUser: process.env.DB_USER_PRODUCTION || '',
          dbPassword: process.env.DB_PASSWORD_PRODUCTION || '',
          dbPort: process.env.DB_PORT_PRODUCTION || '',
          dbHost: process.env.DB_HOST_PRODUCTION || ''
        },
        redis: {
          port: process.env.REDISCACHEHOSTNAME_PRODUCTION || 6380,
          hostName: process.env.REDISCACHEHOSTNAME_PRODUCTION || '',
          key: process.env.REDISCACHEKEY_PRODUCTION || ''
        },
        auth: {
          secret: process.env.JWT_SECRET_PRODUCTION || ''
        },
        mail: {
          apiKey: process.env.KEY_MAIL_PRODUCTION,
          user: process.env.USER_MAIL_PRODUCTION
        }
      };

    case 'stg':
      return {
        app: {
          host: process.env.HOST_STG
        },
        database: {
          dbName: process.env.DB_NAME_STG || '',
          dbUser: process.env.DB_USER_STG || '',
          dbPassword: process.env.DB_PASSWORD_STG || '',
          dbPort: process.env.DB_PORT_STG || '',
          dbHost: process.env.DB_HOST_STG || ''
        },
        redis: {
          port: process.env.REDISCACHEHOSTNAME || 6380,
          hostName: process.env.REDISCACHEHOSTNAME || '',
          key: process.env.REDISCACHEKEY || ''
        },
        auth: {
          secret: process.env.JWT_SECRET_STG || ''
        },
        mail: {
          apiKey: process.env.KEY_MAIL_STG,
          user: process.env.USER_MAIL_STG
        }
      };

    default:
      return {
        app: {
          host: process.env.HOST_DEVELOP
        },
        database: {
          dbName: process.env.DB_NAME_DEVELOP || '',
          dbUser: process.env.DB_USER_DEVELOP || '',
          dbPassword: process.env.DB_PASSWORD_DEVELOP || '',
          dbPort: process.env.DB_PORT_DEVELOP || '',
          dbHost: process.env.DB_HOST_DEVELOP || ''
        },
        redis: {
          port: process.env.REDISCACHEHOSTNAME_DEVELOP || 6380,
          hostName: process.env.REDISCACHEHOSTNAME_DEVELOP || '',
          key: process.env.REDISCACHEKEY_DEVELOP || ''
        },
        auth: {
          secret: process.env.JWT_SECRET_DEVELOP || ''
        },
        mail: {
          apiKey: process.env.KEY_MAIL_DEVELOP,
          user: process.env.USER_MAIL_DEVELOP
        }
      };
  }
};

export const config = {
  env: process.env.NODE_ENV || 'develop',
  path: '/api/v1',
  port: process.env.PORT || 8080,
  enviroment: switchConfig()
};
