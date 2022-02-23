import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

import { AuthController } from '../interfaceAdapters/AuthController';
import { ApiResponse } from '../../../utils/response.handler';

@Service()
export default class AuthApi {
  constructor(private readonly authController: AuthController, private readonly apiResponse: ApiResponse) {}

  public login(req: Request, res: Response, next: NextFunction) {
    res.send({
      message: req.user
    });
  }
}
