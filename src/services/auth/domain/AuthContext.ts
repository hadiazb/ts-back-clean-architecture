import { Service } from 'typedi';
import jwt from 'jsonwebtoken';

import { IAuthContext } from './IAuthContext';
import { Users } from '../../user/domain/models/Users';

@Service()
export class AuthContext implements IAuthContext {
  public async generateToken(payload: Users, secret: string) {
    return await jwt.sign(payload.get({ plain: true }), secret);
  }
}
