import { Service } from 'typedi';
import jwt from 'jsonwebtoken';

import { IAuthRetriever } from '../interface/IAuthRetriever';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import { IUserCreator } from '../interface/IAuthCreator';
import { Users } from '../../../../database/init-model';
import { config } from '../../../../config';
import { AuthContext } from '../../domain/AuthContext';

@Service()
export class AuthRetriever implements IAuthRetriever {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authContext: AuthContext
  ) {}

  public async register(body: IUserCreator): Promise<Users> {
    try {
      return await this.authRepository.register(body);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async refreshToken(token: string) {
    const secret = config.enviroment.auth.secret || '';
    try {
      const payload: any = await jwt.verify(token, secret);
      if (payload) {
        const user = await this.authRepository.refreshToken(payload.email);
        const newToken = await this.authContext.generateToken(user, secret);
        return newToken;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async recoveryPassword() {
    try {
      return await this.authRepository.recoveryPassword();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
