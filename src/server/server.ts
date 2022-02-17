import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { config } from '../config/index';
import { Config } from '../config/interface';
import { IServer } from './IServer';
import routes from '../routes';
import sequelize from '../database/connection';
import userRoutes from '../services/user/infrastructure/UserRoutes';

export class Server implements IServer {
  public application!: express.Application;
  public configuration: Config = config;
  public database = sequelize;
  public path = this.configuration.path;

  constructor() {
    this.application = express();
    this.middlewares();
    this.routes();
  }

  public middlewares() {
    this.application.set('port', this.configuration.port);
    this.application.use(morgan('dev'));
    this.application.use(helmet());
    this.application.use(express.json());
    this.application.use(
      express.urlencoded({
        extended: false
      })
    );
    this.application.use(cors());
  }

  public routes() {
    this.application.use(routes);
    this.application.use(`${this.path}/user`, userRoutes);
  }

  public start() {
    this.application.listen(this.application.get('port'), () => {
      if (this.configuration.env === 'develop') {
        console.log(`This is a Develop enviroment, Running on ${this.configuration.develop.app.host}:${this.application.get('port')}`);
      }
      if (this.configuration.env === 'stg') {
        console.log(`This is a Stg enviroment, Running on ${this.configuration.stg.app.host}`);
      }
      if (this.configuration.env === 'production') {
        console.log(`This is a Production enviroment, Running on ${this.configuration.production.app.host}`);
      }
      this.connectionDB();
    });
  }

  public async connectionDB() {
    try {
      this.database.authenticate();
      if (this.configuration.env === 'develop') {
        console.log(`Database connected on Develop enviroment Database Name: ${this.configuration.develop.database.dbName}`);
      }
      if (this.configuration.env === 'stg') {
        console.log(`Database connected on Stg enviroment Database Name: ${this.configuration.stg.database.dbName}`);
      }
      if (this.configuration.env === 'production') {
        console.log(`Database connected on Production enviroment Database Name: ${this.configuration.production.database.dbName}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
