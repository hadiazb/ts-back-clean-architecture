import { Sequelize } from 'sequelize';
import { config } from '../config';

export const sequelize = new Sequelize(config.database.dbName, config.database.dbUser, config.database.dbPassword, {
  host: config.database.dbHost,
  dialect: 'postgres',
  minifyAliases: true
});
