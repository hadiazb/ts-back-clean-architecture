import { Router, Request, NextFunction, Response } from 'express';
import Container from 'typedi';

import AuthApi from './AuthApi';
import { config } from '../../../config/index';
import passport from 'passport';

class AuthRoutes {
  public router: Router;

  public configuration = config;

  constructor() {
    this.router = Router();
    this.Routes();
  }

  public switchEndPoint(env: string) {
    switch (env) {
      case 'develop':
        return `${this.configuration.develop.app.host}:${this.configuration.port}${this.configuration.path}`;

      case 'stg':
        return `${this.configuration.stg.app.host}${this.configuration.path}`;

      case 'production':
        return `${this.configuration.production.app.host}${this.configuration.path}`;

      default:
        return `${this.configuration.develop.app.host}:${this.configuration.port}${this.configuration.path}`;
    }
  }

  public Routes() {
    const authApi = Container.get(AuthApi);

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send({
        url: {
          baseUrl: this.switchEndPoint(this.configuration.env),
          options: [
            { authorization: false, path: '/login', method: ['POST'] },
            { authorization: false, path: '/register', method: ['POST'] }
          ]
        }
      });
    });

    this.router.post('/register', (req: Request, res: Response, next: NextFunction) =>
      authApi.register(req, res, next)
    );

    this.router.post(
      '/login',
      passport.authenticate('local', { session: false }),
      (req: Request, res: Response, next: NextFunction) => authApi.login(req, res, next)
    );
  }
}

const authRoutes = new AuthRoutes();
authRoutes.Routes();

export default authRoutes.router;
