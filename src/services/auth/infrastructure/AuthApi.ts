import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { AuthController } from '../interfaceAdapters/AuthController';
import { ApiResponse } from '../../../utils/response.handler';
import TemplateMails from '../../../utils/template.mail';

interface Options {
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Service()
export default class AuthApi {
  constructor(
    private readonly authController: AuthController,
    private readonly apiResponse: ApiResponse,
    private readonly templateMails: TemplateMails
  ) {}

  public async register(req: Request, res: Response, next: NextFunction) {
    await this.authController
      .register(req.body)
      .then(async (response) => {
        await this.sendMail(
          this.templateMails.createMailOptions({
            email: response.email,
            name: response.name!,
            lastName: response.lastName!,
            text: 'Texto de prueba para mi correo'
          })
        );
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public async recoveryPassword(req: Request, res: Response, next: NextFunction) {
    try {
      return this.authController.recoveryPassword();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authController.generateToken(req, res, next);
      await this.apiResponse.success(req, res, { token });
    } catch (error) {
      next(error);
    }
  }

  public async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = await this.authController.refreshToken(req);
      await this.apiResponse.success(req, res, { token: refreshToken });
    } catch (error) {
      next(error);
    }
  }

  public checkRole(req: Request, res: Response, next: NextFunction) {
    this.authController.checkRole(req, res, next);
  }

  public async sendMail(options: Options): Promise<string> {
    try {
      return await this.authController.sendMail(options);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
