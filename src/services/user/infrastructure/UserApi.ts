import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { UserController } from '../interfaceAdapters/UserController';

@Service()
export default class UserApi {
  constructor(private readonly userController: UserController) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .findAll()
      .then((response) => {
        res.send({
          response
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .findOne(req.params.id)
      .then((response) => {
        res.send({
          response
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .deleteOne(req.params.id)
      .then((response) => {
        res.send({
          response
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  public async createOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .createOne()
      .then((response) => {
        res.send({
          response
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .updateOne(req.params.id)
      .then((response) => {
        res.send({
          response
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}
