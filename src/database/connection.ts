import { Sequelize } from 'sequelize';
import { config } from '../config';

export const sequelize: Sequelize = new Sequelize(
  config.enviroment.database.dbName,
  config.enviroment.database.dbUser,
  config.enviroment.database.dbPassword,
  {
    host: config.enviroment.database.dbHost,
    dialect: 'postgres',
    minifyAliases: true
  }
);
