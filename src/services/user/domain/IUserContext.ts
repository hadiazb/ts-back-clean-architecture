import { Request, Response, NextFunction } from 'express';

import { Users } from '../../../database/init-model';

export interface IUserContext {
  validateAuth(req: Request, res: Response, next: NextFunction): void;
  userValidation(user: Users | null): Promise<Users | string>;
  usersIsEmply(users: Users[]): Promise<Users[] | string>;
  userDeleteValidation(response: number | string, id: string): Promise<string | number>;
  userUpdateValidation(response: number, id: string): Promise<string>;
}
