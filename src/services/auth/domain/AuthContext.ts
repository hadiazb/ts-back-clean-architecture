import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import sgMail, { MailService } from '@sendgrid/mail';
import boom from '@hapi/boom';
import { NextFunction, Response, Request } from 'express';

import { IAuthContext } from './IAuthContext';
import { Users } from '../../user/domain/models/Users';
import config from '../../../config';

@Service()
export class AuthContext implements IAuthContext {
  public sendGrid: MailService = sgMail;

  constructor() {
    this.sendSet();
  }

  public checkRole(req: Request, res: Response, next: NextFunction, ...roles: string[]) {
    const user: any = req.user;

    if (roles.includes(user.roles.rolName)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }

  public async generateToken(payload: Users, secret: string) {
    return await jwt.sign(payload.get({ plain: true }), secret, {
      expiresIn: 60 * 30
    });
  }

  public sendSet() {
    if (config.develop.mail.apiKey) {
      this.sendGrid.setApiKey(config.develop.mail.apiKey);
    }
  }

  public async sendMail(to: string, subject: string, text: string, html: string) {
    const msg = {
      to,
      from: 'hugoandresdiazbernal@gmail.com',
      subject,
      text,
      html
    };

    try {
      const response = await this.sendGrid.send(msg);
    } catch (error) {
      throw boom.badGateway();
    }
  }
}
