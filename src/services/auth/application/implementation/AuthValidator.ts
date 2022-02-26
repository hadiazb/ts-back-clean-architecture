import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { AuthContext } from '../../domain/AuthContext';
import { IAuthValidator } from '../interface/IAuthValidator';

interface Options {
  to: string;
  subject: string;
  text: string;
  html: string;
}
@Service()
export class AuthValidator implements IAuthValidator {
  constructor(private readonly authContext: AuthContext) {}

  public async generateToken(payload: any, secret: string) {
    return await this.authContext.generateToken(payload, secret);
  }

  public checkRole(req: Request, res: Response, next: NextFunction) {
    this.authContext.checkRole(req, res, next);
  }

  public async sendMail(options: Options) {
    return await this.authContext.sendMail(options);
  }
}
