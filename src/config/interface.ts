export interface Config {
  app: { port: string | undefined; env: string | undefined };
  database: {
    dbName: string;
    dbUser: string;
    dbPassword: string;
    dbPort: string;
    dbHost: string;
  };
  redis: {
    port: string | number;
    hostName: string;
    key: string;
  };
  auth: { secret: string | undefined };
}
