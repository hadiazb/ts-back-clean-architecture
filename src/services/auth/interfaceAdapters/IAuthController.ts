import { NextFunction, Request, Response } from 'express';

import { Users } from '../../../database/init-model';
import { IUserCreator } from '../application/interface/IAuthCreator';
import { Options } from '../domain/interface/options';

export interface IAuthController {
  register(body: IUserCreator): Promise<Users>;
  generateToken(req: Request, res: Response, next: NextFunction): Promise<string>;
  checkRole(req: Request, res: Response, next: NextFunction): void;
  sendMail(options: Options): Promise<string>;
}
