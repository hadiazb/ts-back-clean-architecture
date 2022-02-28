import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

import { UserContext } from '../../domain/UserContext';
import UserSchema from '../schema/UserSchema';
import { IUserValidator } from '../interface/IUserValidator';

@Service()
export class UserValidator implements IUserValidator {
  constructor(private readonly userContext: UserContext, private readonly userSchema: UserSchema) {}

  public createValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.createUserSchema(), 'body');
  }

  public createQueryUserSchema(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(
      req,
      res,
      next,
      this.userSchema.createQueryUserSchema(),
      'query'
    );
  }

  public getValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.getUserSchema(), 'params');
  }

  public deleteValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.deleteUserSchema(), 'params');
  }

  public updateValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.updateUserSchema(), 'body');
  }

  public createUserAdressSchema(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(
      req,
      res,
      next,
      this.userSchema.createUserAdressSchema(),
      'body'
    );
  }

  public checkRole(req: Request, res: Response, next: NextFunction, ...roles: string[]) {
    this.userContext.checkRole(req, res, next);
  }
}
