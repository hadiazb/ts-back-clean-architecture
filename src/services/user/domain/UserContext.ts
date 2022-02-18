import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

import { IUserContext } from './IUserContext';
import { Users } from './models/Users';

@Service()
export class UserContext implements IUserContext {
  constructor() {}

  public validateAuth(req: Request, res: Response, next: NextFunction) {
    boom.unauthorized('No estas autorizado');
  }

  public async usersValidation(users: Users[]): Promise<Users[] | string> {
    if (!users.length) {
      return 'The Users table is emply';
    }

    return await users;
  }

  public async userValidation(user: Users | null): Promise<Users | string> {
    if (user) {
      return await user;
    }

    throw boom.notFound('User not found');
  }

  public async userDeleteValidation(response: number | string, id: string): Promise<string | number> {
    if (typeof response === 'string') {
      return await response;
    }
    if (response === 1) {
      return await `Usuario con id=${id} eliminado`;
    }

    if (response === 0) {
      throw boom.notFound(`User with id=${id} not found`);
    }

    return await response;
  }

  public async userUpdateValidation(response: number, id: string): Promise<string> {
    if (response === 0) {
      throw boom.notFound(`User with id=${id} not found`);
    }
    return `User with id=${id} was updated`;
  }
}
