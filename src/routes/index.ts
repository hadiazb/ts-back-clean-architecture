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

  public routes() {
    this.router.get(this.path, (req, res, next) => {
      res.send(this.switchEnvRoutes(this.configuration.env));
    });
  }

  public switchEnvRoutes(env: string) {
    switch (env) {
      case 'develop':
        console.log(this.path);
        return {
          baseUrl: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}`,
          userEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/user`,
          authEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/auth`,
          adminEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/admin`
        };

      case 'stg':
        return {
          baseUrl: `${this.configuration.stg.app.host}${this.path}`,
          userEndPoint: `${this.configuration.stg.app.host}${this.path}/user`,
          authEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/auth`,
          adminEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/admin`
        };

      case 'production':
        return {
          baseUrl: `${this.configuration.production.app.host}${this.path}`,
          userEndPoint: `${this.configuration.production.app.host}${this.path}/user`,
          authEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/auth`,
          adminEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/admin`
        };

      default:
        return {
          baseUrl: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}`,
          userEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/user`,
          authEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/auth`,
          adminEndPoint: `${this.configuration.develop.app.host}:${this.configuration.port}${this.path}/admin`
        };
    }
  }
}

const routes = new Routes();
routes.routes();

export default routes.router;
