import { Router } from 'express';
import { config } from '../config/index';

class Routes {
  public configuration = config;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public router: Router;
  public routes() {
    this.router.get('/', (req, res, next) => {
      res.send({
        baseUrl:
          process.env.NODE_ENV === 'develop'
            ? `${this.configuration.develop.app.host}:${this.configuration.port}`
            : this.configuration.stg.app.host
      });
    });
  }
}

const routes = new Routes();
routes.routes();

export default routes.router;
