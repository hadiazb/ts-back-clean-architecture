import { NextFunction, Request, Response } from 'express';

export interface IUserValidator {
  createValidator(req: any, res: Response, next: NextFunction): void;
  getValidator(req: any, res: Response, next: NextFunction, property: string): void;
  deleteValidator(req: any, res: Response, next: NextFunction): void;
  updateValidator(req: any, res: Response, next: NextFunction): void;
  createUserAdressSchema(req: any, res: Response, next: NextFunction): void;
}
