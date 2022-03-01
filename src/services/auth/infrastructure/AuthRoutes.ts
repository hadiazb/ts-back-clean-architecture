import { Router, Request, NextFunction, Response } from 'express';
import Container from 'typedi';

import AuthApi from './AuthApi';
import { config } from '../../../config/index';
import passport from 'passport';

class AuthRoutes {
  public router: Router;
  public configuration = config;
  public path = this.configuration.path;
  public baseUrl = `${this.configuration.enviroment.app.host}${
    this.configuration.env === 'develop' ? ':' + this.configuration.port : ''
  }${this.path}`;

  constructor() {
    this.router = Router();
    this.Routes();
  }

  public Routes() {
    const authApi = Container.get(AuthApi);

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send({
        url: {
          baseUrl: this.baseUrl,
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
