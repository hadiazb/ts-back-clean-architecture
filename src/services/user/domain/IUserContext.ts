import { Request, Response, NextFunction } from 'express';

import { Users } from '../../../database/init-model';

export interface IUserContext {
  validateAuth(req: Request, res: Response, next: NextFunction): void;
  userResponseValidation(user: Users | null): Promise<Users | string>;
  usersResponseValidation(users: Users[]): Promise<Users[] | string>;
}
