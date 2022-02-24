import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import config from '../config/index';
import { Config } from '../config/interface';
import { IServer } from './IServer';
import routes from '../routes';
import sequelize from '../database/connection';
import userRoutes from '../services/user/infrastructure/UserRoutes';
import authRoutes from '../services/auth/infrastructure/AuthRoutes';
import { initModels } from '../database/init-model';
import { ErrorsHandler } from '../utils/error.handler';
import { AuthLogin } from '../utils/auth';

export class Server extends AuthLogin implements IServer {
  public application!: express.Application;
  public configuration: Config = config;
  public database = sequelize;
  public path = this.configuration.path;
  public errorHandler: ErrorsHandler = new ErrorsHandler();
  public whitelist: string[] = ['http://localhost:3000', 'https://myapp.co'];

  constructor() {
    super();
    this.application = express();
    this.middlewaresBefore();
    this.routes();
    this.middlewaresAfter();
  }

  public middlewaresAfter() {
    this.application.set('port', this.configuration.port);
    this.application.use(helmet());
    this.application.use(
      express.urlencoded({
        extended: false
      })
    );
    this.application.use(this.corsValidator);
    this.application.use(this.errorHandler.logErrors);
    this.application.use(this.errorHandler.boomErrorHandler);
    this.application.use(this.errorHandler.errorHandler);
    this.jwtStrategyImplement();
    this.localStrategyImplement();
  }

  public middlewaresBefore() {
    this.application.use(morgan('dev'));
    this.application.use(express.json());
  }

  public routes() {
    this.application.use(routes);
    this.application.use(`${this.path}/user`, userRoutes);
    this.application.use(`${this.path}/auth`, authRoutes);
  }

  public start() {
    this.application.listen(this.application.get('port'), () => {
      this.listenServer();
      this.connectionDB();
      this.initModels();
    });
  }

  public async connectionDB() {
    try {
      this.database.sync({ force: true });
      this.databaseLog();
    } catch (error) {
      console.log(error);
    }
  }

  public initModels() {
    initModels(this.database);
  }

  public corsValidator() {
    return cors({
      origin: (origin, callback) => {
        if (this.whitelist.includes(origin!)) {
          callback(null, true);
        } else {
          callback(new Error('no permitido'));
        }
      }
    });
  }

  public listenServer() {
    if (this.configuration.env === 'develop') {
      console.log(
        `This is a Develop enviroment, Running on ${
          this.configuration.develop.app.host
        }:${this.application.get('port')}`
      );
    }
    if (this.configuration.env === 'stg') {
      console.log(`This is a Stg enviroment, Running on ${this.configuration.stg.app.host}`);
    }
    if (this.configuration.env === 'production') {
      console.log(
        `This is a Production enviroment, Running on ${this.configuration.production.app.host}`
      );
    }
  }

  public databaseLog() {
    if (this.configuration.env === 'develop') {
      console.log(
        `Database connected on Develop enviroment Database Name: ${this.configuration.develop.database.dbName}`
      );
    }
    if (this.configuration.env === 'stg') {
      console.log(
        `Database connected on Stg enviroment Database Name: ${this.configuration.stg.database.dbName}`
      );
    }
    if (this.configuration.env === 'production') {
      console.log(
        `Database connected on Production enviroment Database Name: ${this.configuration.production.database.dbName}`
      );
    }
  }
}
