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
    try {
      const response = await this.userController.findAll();
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.findOne(req.params.id);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.deleteOne(req.params.id);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async createOne(req: Request, res: Response, next: NextFunction) {
    const role = req.query.role!.toString();
    try {
      const response = await this.userController.createOne(req.body, role);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async updateOne(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.updateOne(req.params.id, req.body);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public async createUserAdress(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userController.createUserAdress(req.params.id, req.body);
      this.apiResponse.success(req, res, { status: 200, response });
    } catch (error) {
      next(error);
    }
  }

  public createValidator(req: any, res: Response, next: NextFunction): void {
    this.userController.createValidator(req, res, next);
  }

  public getValidator(req: any, res: Response, next: NextFunction): void {
    this.userController.getValidator(req, res, next);
  }

  public createQueryUserSchema(req: any, res: Response, next: NextFunction): void {
    this.userController.createQueryUserSchema(req, res, next);
  }

  public deleteValidator(req: any, res: Response, next: NextFunction): void {
    this.userController.deleteValidator(req, res, next);
  }

  public updateValidator(req: any, res: Response, next: NextFunction): void {
    this.userController.updateValidator(req, res, next);
  }

  public createUserAdressSchema(req: any, res: Response, next: NextFunction): void {
    this.userController.createUserAdressSchema(req, res, next);
  }

  public checkRole(req: Request, res: Response, next: NextFunction, ...roles: string[]): void {
    this.userController.checkRole(req, res, next, ...roles);
  }
}
