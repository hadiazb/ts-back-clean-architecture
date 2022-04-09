import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

import { IAuthController } from './IAuthController';
import { AuthRetriever } from '../application/implementation/AuthRetriever';
import { AuthValidator } from '../application/implementation/AuthValidator';
import { IUserCreator } from '../application/interface/IAuthCreator';
import { config } from '../../../config';
import { Options } from '../domain/interface/options';

@Service()
export class AuthController implements IAuthController {
  constructor(
    private readonly authRetriever: AuthRetriever,
    private readonly authValidator: AuthValidator
  ) {}

  public async register(body: IUserCreator) {
    return await this.authRetriever.register(body);
  }

  public async recoveryPassword() {
    try {
      return await this.authRetriever.recoveryPassword();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async generateToken(req: Request, res: Response, next: NextFunction) {
    const secret = config.enviroment.auth.secret || '';
    try {
      if (req.user) {
        return await this.authValidator.generateToken(req.user, secret);
      }
      throw boom.unauthorized();
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  public async refreshToken(req: Request) {
    try {
      const refreshToken = await this.authRetriever.refreshToken(req.headers.token!.toString());
      return refreshToken;
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  public checkRole(req: Request, res: Response, next: NextFunction) {
    this.authValidator.checkRole(req, res, next);
  }

  public async sendMail(options: Options) {
    return await this.authValidator.sendMail(options);
  }
}
