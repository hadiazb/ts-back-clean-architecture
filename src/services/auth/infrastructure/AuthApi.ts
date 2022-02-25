import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { AuthController } from '../interfaceAdapters/AuthController';
import { ApiResponse } from '../../../utils/response.handler';

@Service()
export default class AuthApi {
  constructor(
    private readonly authController: AuthController,
    private readonly apiResponse: ApiResponse
  ) {}

  public async register(req: Request, res: Response, next: NextFunction) {
    await this.authController
      .register(req.body)
      .then((response) => {
        this.authController.sendMail(
          req.body.email,
          'Hola mundo',
          'hola mundo',
          '<h1>Hola mundo</h1>'
        );
        this.apiResponse.success(req, res, { status: 200, response });
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
}
