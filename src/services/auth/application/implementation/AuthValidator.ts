import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { AuthContext } from '../../domain/AuthContext';
import { IAuthValidator } from '../interface/IAuthValidator';

@Service()
export class AuthValidator implements IAuthValidator {
  constructor(private readonly authContext: AuthContext) {}

  public async generateToken(payload: any, secret: string) {
    return await this.authContext.generateToken(payload, secret);
  }

  public async sendMail(to: string, subject: string, text: string, html: string) {
    try {
      this.authContext.sendMail(to, subject, text, html);
    } catch (error) {
      throw new Error('AuthValidator');
    }
  }

  public checkRole(req: Request, res: Response, next: NextFunction) {
    this.authContext.checkRole(req, res, next);
  }
}
