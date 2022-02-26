export interface Config {
  path: string;
  port: string | number;
  env: string;
  develop: Develop;
  stg: Develop;
  production: Develop;
}

export interface Develop {
  app: App;
  database: Database;
  redis: Redis;
  auth: Auth;
  mail: Mail;
}

export interface App {
  host: string | undefined;
}

export interface Auth {
  secret: string | undefined;
}

export interface Mail {
  apiKey: string | undefined;
  user: string | undefined;
}

export interface Database {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbPort: string | number;
  dbHost: string;
}

export interface Redis {
  port: string | number | undefined;
  hostName: string | undefined;
  key: string | undefined;
}
