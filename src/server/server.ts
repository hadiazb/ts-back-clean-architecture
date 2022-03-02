import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import http from 'http';
import socketIO from 'socket.io';

import { config } from '../config/index';

import { IServer } from './IServer';

import { sequelize } from '../database/connection';
import { initModels } from '../database/init-model';

import routes from '../routes';
import userRoutes from '../services/user/infrastructure/UserRoutes';
import authRoutes from '../services/auth/infrastructure/AuthRoutes';

import { ErrorsHandler } from '../utils/error.handler';

import { AuthLogin } from '../utils/auth';

export class Server extends AuthLogin implements IServer {
  public application!: express.Application;
  public configuration = config;
  public database = sequelize;
  public path = this.configuration.path;
  public errorHandler: ErrorsHandler = new ErrorsHandler();
  public io: socketIO.Server;
  public server;
  public whitelist: string[] = ['http://localhost:3000', 'https://myapp.co'];

  constructor() {
    super();
    this.application = express();
    this.server = new http.Server(this.application);
    this.io = new socketIO.Server(this.server, {
      cors: {
        origin: true,
        credentials: true
      }
    });
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
    this.server.listen(this.application.get('port'), () => {
      console.log(
        `This is a ${this.configuration.env} enviroment, Running on ${
          this.configuration.enviroment.app.host
        }${this.configuration.env === 'develop' ? ':' + this.application.get('port') : ''}`
      );
      this.connectionDB();
      this.initModels();
    });
  }

  public async connectionDB() {
    try {
      this.database.sync({ force: true });
      console.log(
        `Database connected on ${this.configuration.env} enviroment Database Name: ${this.configuration.enviroment.database.dbName}`
      );
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
}
