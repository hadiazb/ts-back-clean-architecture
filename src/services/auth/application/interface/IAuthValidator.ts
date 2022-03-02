import { NextFunction, Request, Response } from 'express';
import { Options } from '../../domain/interface/options';

export interface IAuthValidator {
  generateToken(payload: any, secret: string): Promise<string>;
  checkRole(req: Request, res: Response, next: NextFunction): void;
  sendMail(options: Options): Promise<string>;
}
