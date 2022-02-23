import { Service } from 'typedi';

import { IAuthController } from './IAuthController';
import { AuthRetriever } from '../application/implementation/AuthRetriever';
import { AuthValidator } from '../application/implementation/AuthValidator';
import { IUserCreator } from '../application/interface/IAuthCreator';

@Service()
export class AuthController implements IAuthController {
  constructor(
    private readonly authRetriever: AuthRetriever,
    private readonly authValidator: AuthValidator
  ) {}

  public async register(body: IUserCreator) {
    return await this.authRetriever.register(body);
  }
}
