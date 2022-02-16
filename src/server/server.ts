import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { config } from '../config/index';
import { Config } from '../config/interface';
import { IServer } from './IServer';
import routes from '../routes';

export class Server implements IServer {
  public application!: express.Application;
  public configuration: Config = config;

  constructor() {
    this.application = express();
    this.config();
    this.routes();
  }

  public config() {
    this.application.set('port', this.configuration.app.port);
    this.application.use(morgan('dev'));
    this.application.use(helmet());
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
    });
  }
}
