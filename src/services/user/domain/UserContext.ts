import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import Joi from 'joi';

import { IUserContext } from './IUserContext';
import { Users } from './models/Users';

@Service()
export class UserContext implements IUserContext {
  public validateAuth(req: Request, res: Response, next: NextFunction) {
    if (1 < 0) {
      throw boom.unauthorized('No estas autorizado');
    }
    next();
  }

  public validatorHandler(req: any, res: Response, next: NextFunction, schema: Joi.AnySchema, property: any) {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.message));
    }
    next();
  }

  public async userValidation(user: Users | null): Promise<Users | string> {
    if (user) {
      if (user.isBlock) {
        throw boom.conflict('User is block');
      }
      return await user;
    }

    throw boom.notFound('User not found');
  }
}
