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
          this.configuration.app.env === 'develop'
            ? `${this.configuration.app.host_dev}${this.configuration.app.port}`
            : this.configuration.app.host_pro
      });
    });
  }
}

const routes = new Routes();
routes.routes();

export default routes.router;
