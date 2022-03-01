import { Router } from 'express';
import { config } from '../config/index';

class Routes {
  public configuration = config;

  public path = this.configuration.path;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public router: Router;
  public baseUrl = `${this.configuration.enviroment.app.host}${
    this.configuration.env === 'develop' ? ':' + this.configuration.port : ''
  }${this.path}`;

  public routes() {
    this.router.get(this.path, (req, res, next) => {
      res.send({
        baseUrl: this.baseUrl,
        userEndPoint: `${this.baseUrl}/user`,
        authEndPoint: `${this.baseUrl}/auth`,
        adminEndPoint: `${this.baseUrl}}/admin`
      });
    });
  }
}

const routes = new Routes();
routes.routes();

export default routes.router;
