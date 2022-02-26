import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { AuthController } from '../interfaceAdapters/AuthController';
import { ApiResponse } from '../../../utils/response.handler';

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
    private readonly apiResponse: ApiResponse
  ) {}

  public async register(req: Request, res: Response, next: NextFunction) {
    await this.authController
      .register(req.body)
      .then(async (response) => {
        const mail = await this.sendMail({
          to: response.email,
          subject: `Hola ${response.name} ${response.lastName}`,
          text: 'Texto de prueba para mi correo',
          html: `
            <p>Hola <strong>${response.name} ${response.lastName}</strong>, te has registrado a nuetra aplicación con exito!!!, nunca cambies</p>
            <p>Hemos recibido tus datos con exito, ahora haces parte de nuestra familia XXXX</p>
            `
        });
        this.apiResponse.success(req, res, { status: 200, response });
        console.log(mail);
      })
      .catch((err) => {
        next(err);
      });
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.authController.generateToken(req, res, next);
      await this.apiResponse.success(req, res, { status: 200, user: req.user, token });
    } catch (error) {
      next(error);
    }
  }

  public checkRole(req: Request, res: Response, next: NextFunction) {
    this.authController.checkRole(req, res, next);
  }

  public async sendMail(options: Options) {
    return await this.authController.sendMail(options);
  }
}
