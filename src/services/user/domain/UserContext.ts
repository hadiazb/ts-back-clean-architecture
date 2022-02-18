import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';

import { IUserContext } from './IUserContext';
import { Users } from './models/Users';

@Service()
export class UserContext implements IUserContext {
  constructor() {}

  public validateAuth(req: Request, res: Response, next: NextFunction) {}

  public async usersResponseValidation(users: Users[]): Promise<Users[] | string> {
    if (!users.length) {
      return 'The Users table is emply';
    }

    return await users;
  }

  public async userResponseValidation(user: Users | null): Promise<Users | string> {
    if (user) {
      return await user;
    }

    return await 'El usuario no existe en la base de datos';
  }

  public async userDeleteResponseValidation(response: number | string, id: string): Promise<string | number> {
    if (typeof response === 'string') {
      return await response;
    }
    if (response === 1) {
      return await `Usuario con id=${id} eliminado`;
    }

    if (response === 0) {
      return await `El usuario con id=${id} no existe`;
    }

    return await response;
  }
}
