import { Router, Request, NextFunction, Response } from 'express';
import Container from 'typedi';

import UserApi from './UserApi';
import { config } from '../../../config/index';

class UserRoutes {
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
    const userApi = Container.get(UserApi);

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send({
        url: {
          baseUrl: this.switchEndPoint(this.configuration.env),
          options: [
            { authorization: true, path: '/findAll', method: ['GET'] },
            { authorization: true, path: '/findOne/:id', method: ['GET'] },
            { authorization: true, path: '/deleteOne/:id', method: ['DELETE'] },
            { authorization: true, path: '/createOne', method: ['POST'] },
            { authorization: true, path: '/updateOne', method: ['PUT'] }
          ]
        }
      });
    });

    this.router.get('/findAll', (req: Request, res: Response, next: NextFunction) => userApi.findAll(req, res, next));
    this.router.get('/findOne/:id', (req: Request, res: Response, next: NextFunction) => userApi.findOne(req, res, next));
    this.router.delete('/deleteOne/:id', (req: Request, res: Response, next: NextFunction) => userApi.deleteOne(req, res, next));
    this.router.post('/createOne', (req: Request, res: Response, next: NextFunction) => userApi.createOne(req, res, next));
    this.router.put('/updateOne', (req: Request, res: Response, next: NextFunction) => userApi.updateOne(req, res, next));
  }
}

const userRoutes = new UserRoutes();
userRoutes.Routes();

export default userRoutes.router;