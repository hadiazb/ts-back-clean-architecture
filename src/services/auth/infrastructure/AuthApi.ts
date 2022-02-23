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
        this.apiResponse.success(req, res, { status: 200, response });
      })
      .catch((err) => {
        next(err);
      });
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      await this.apiResponse.success(req, res, { status: 200, response: req.user });
    } catch (error) {
      next(error);
    }
  }
}
