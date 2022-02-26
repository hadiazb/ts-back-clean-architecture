import { Sequelize } from 'sequelize';
import { config } from '../config';

let sequelize: Sequelize;

switch (config.env) {
  case 'develop':
    sequelize = new Sequelize(
      config.develop.database.dbName,
      config.develop.database.dbUser,
      config.develop.database.dbPassword,
      {
        host: config.develop.database.dbHost,
        dialect: 'postgres',
        minifyAliases: true
      }
    );

  case 'stg':
    sequelize = new Sequelize(
      config.stg.database.dbName,
      config.stg.database.dbUser,
      config.stg.database.dbPassword,
      {
        host: config.stg.database.dbHost,
        dialect: 'postgres',
        minifyAliases: true
      }
    );

  case 'production':
    sequelize = new Sequelize(
      config.production.database.dbName,
      config.production.database.dbUser,
      config.production.database.dbPassword,
      {
        host: config.production.database.dbHost,
        dialect: 'postgres',
        minifyAliases: true
      }
    );

  default:
    sequelize = new Sequelize(
      config.develop.database.dbName,
      config.develop.database.dbUser,
      config.develop.database.dbPassword,
      {
        host: config.develop.database.dbHost,
        dialect: 'postgres',
        minifyAliases: true
      }
    );
}

export default sequelize;
