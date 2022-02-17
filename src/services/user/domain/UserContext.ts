import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';

import { IUserContext } from './IUserContext';

@Service()
export class UserContext implements IUserContext {
  constructor() {}

  public validateAuth(req: Request, res: Response, next: NextFunction) {}
}
