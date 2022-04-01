import { Router, Request, NextFunction, Response } from 'express';
import Container from 'typedi';
import passport from 'passport';

import UserApi from './UserApi';
import { config } from '../../../config/index';

class UserRoutes {
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
    const userApi = Container.get(UserApi);

    this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.send({
        url: {
          baseUrl: this.baseUrl,
          options: [
            { authorization: true, path: '/findAll', method: ['GET'] },
            { authorization: true, path: '/findOne/:id', method: ['GET'] },
            { authorization: true, path: '/deleteOne/:id', method: ['DELETE'] },
            { authorization: true, path: '/createOne', method: ['POST'] },
            { authorization: true, path: '/updateOne/:id', method: ['PUT'] }
          ]
        }
      });
    });

    this.router.get(
      '/findAll',
      // passport.authenticate('jwt', { session: false }),
      // (req: Request, res: Response, next: NextFunction) =>
      //   userApi.checkRole(req, res, next, 'ADMIN'),
      (req: Request, res: Response, next: NextFunction) => userApi.findAll(req, res, next)
    );
    this.router.get(
      '/findOne/:id',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) =>
        userApi.checkRole(req, res, next, 'ADMIN', 'CUSTOMER', 'SELLER'),
      (req: Request, res: Response, next: NextFunction) => userApi.getValidator(req, res, next),
      (req: Request, res: Response, next: NextFunction) => userApi.findOne(req, res, next)
    );
    this.router.delete(
      '/deleteOne/:id',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) =>
        userApi.checkRole(req, res, next, 'ADMIN'),
      (req: Request, res: Response, next: NextFunction) => userApi.deleteValidator(req, res, next),
      (req: Request, res: Response, next: NextFunction) => userApi.deleteOne(req, res, next)
    );
    this.router.post(
      '/createOne',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) =>
        userApi.checkRole(req, res, next, 'ADMIN'),
      (req: Request, res: Response, next: NextFunction) =>
        userApi.createQueryUserSchema(req, res, next),
      (req: Request, res: Response, next: NextFunction) => userApi.createValidator(req, res, next),
      (req: Request, res: Response, next: NextFunction) => userApi.createOne(req, res, next)
    );
    this.router.put(
      '/updateOne/:id',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) =>
        userApi.checkRole(req, res, next, 'ADMIN', 'CUSTOMER', 'SELLER'),
      (req: Request, res: Response, next: NextFunction) => userApi.getValidator(req, res, next),
      (req: Request, res: Response, next: NextFunction) => userApi.updateValidator(req, res, next),
      (req: Request, res: Response, next: NextFunction) => userApi.updateOne(req, res, next)
    );
    this.router.post(
      '/createUserAdress/:id',
      passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) =>
        userApi.checkRole(req, res, next, 'ADMIN', 'CUSTOMER', 'SELLER'),
      (req: Request, res: Response, next: NextFunction) => userApi.getValidator(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        userApi.createUserAdressSchema(req, res, next),
      (req: Request, res: Response, next: NextFunction) => userApi.createUserAdress(req, res, next)
    );
  }
}

const userRoutes = new UserRoutes();
userRoutes.Routes();

export default userRoutes.router;
