import { NextFunction, Request, Response } from 'express';

export interface IUserValidator {
  validateAuth(req: Request, res: Response, next: NextFunction): void;
  createValidator(req: any, res: Response, next: NextFunction): void;
  getValidator(req: any, res: Response, next: NextFunction): void;
  deleteValidator(req: any, res: Response, next: NextFunction): void;
  updateValidator(req: any, res: Response, next: NextFunction): void;
  createUserAdressSchema(req: any, res: Response, next: NextFunction): void;
}
