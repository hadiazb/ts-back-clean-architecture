import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';
import { NextFunction, Response, Request } from 'express';
import nodemailer from 'nodemailer';

import { IAuthContext } from './IAuthContext';
import { Users } from '../../user/domain/models/Users';
import { config } from '../../../config';
import { Options } from './interface/options';

@Service()
export class AuthContext implements IAuthContext {
  public transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: config.enviroment.mail.user,
      pass: config.enviroment.mail.apiKey
    }
  });

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
      expiresIn: '30m'
    });
  }

  public async decodeToken(token: string, secret: string) {
    try {
      const user = jwt.verify(token, secret);
      return user;
    } catch (error) {
      throw new Error(`error ${error}`);
    }
  }

  public async sendMail(options: Options) {
    const info = await this.transporter.sendMail({
      from: config.enviroment.mail.user,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    });

    return info.response;
  }
}
