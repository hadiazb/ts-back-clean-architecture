import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { UserController } from '../interfaceAdapters/UserController';
import { ApiResponse } from '../../../utils/response.handler';

@Service()
export default class UserApi {
  constructor(
    private readonly userController: UserController,
    private readonly apiResponse: ApiResponse
  ) {}

  public async findAll(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .findAll()
      .then((response) => {
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .findOne(req.params.id)
      .then((response) => {
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .deleteOne(req.params.id)
      .then((response) => {
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public async createOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .createOne(req.body)
      .then((response) => {
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .updateOne(req.params.id, req.body)
      .then((response) => {
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public async createUserAdress(req: Request, res: Response, next: NextFunction) {
    await this.userController
      .createUserAdress(req.params.id, req.body)
      .then((response) => {
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public createValidator(req: any, res: Response, next: NextFunction) {
    this.userController.createValidator(req, res, next);
  }

  public getValidator(req: any, res: Response, next: NextFunction) {
    this.userController.getValidator(req, res, next);
  }

  public deleteValidator(req: any, res: Response, next: NextFunction) {
    this.userController.deleteValidator(req, res, next);
  }

  public updateValidator(req: any, res: Response, next: NextFunction) {
    this.userController.updateValidator(req, res, next);
  }

  public createUserAdressSchema(req: any, res: Response, next: NextFunction) {
    this.userController.createUserAdressSchema(req, res, next);
  }
}
