import { Service } from 'typedi';

import { AuthContext } from '../../domain/AuthContext';
import { IAuthValidator } from '../interface/IAuthValidator';

@Service()
export class AuthValidator implements IAuthValidator {
  constructor(private readonly authContext: AuthContext) {}

  public async generateToken(payload: any, secret: string) {
    return await this.authContext.generateToken(payload, secret);
  }
}
