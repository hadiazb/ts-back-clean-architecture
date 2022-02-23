import { Service } from 'typedi';

import { IAuthController } from './IAuthController';
import { AuthRetriever } from '../application/implementation/AuthRetriever';
import { AuthValidator } from '../application/implementation/AuthValidator';

@Service()
export class AuthController implements IAuthController {
  constructor(
    private readonly authRetriever: AuthRetriever,
    private readonly authValidator: AuthValidator
  ) {}

  public login() {}
}
