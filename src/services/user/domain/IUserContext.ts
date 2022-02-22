import { Request, Response, NextFunction } from 'express';

import { Users } from '../../../database/init-model';

export interface IUserContext {
  validateAuth(req: Request, res: Response, next: NextFunction): void;
  userValidation(user: Users | null): Promise<Users | string>;
}
