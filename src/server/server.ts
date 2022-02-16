import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { config } from '../config/index';
import { Config } from '../config/interface';
import { IServer } from './IServer';
import routes from '../routes';
import { sequelize } from '../database/connection';

export class Server implements IServer {
  public application!: express.Application;
  public configuration: Config = config;
  public database = sequelize;

  constructor() {
    this.application = express();
    this.middlewares();
    this.routes();
  }

  public middlewares() {
    this.application.set('port', this.configuration.app.port);
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
  }

  public start() {
    this.application.listen(this.application.get('port'), () => {
      console.log(`Escuchando aplicación en el puerto ${this.application.get('port')}`);
      this.connectionDB();
    });
  }

  public async connectionDB() {
    try {
      this.database.authenticate();
      console.log('Base de datos conectada');
    } catch (error) {
      console.log(error);
    }
  }
}
