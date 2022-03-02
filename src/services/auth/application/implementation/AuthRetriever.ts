import { Service } from 'typedi';

import { IAuthRetriever } from '../interface/IAuthRetriever';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import { IUserCreator } from '../interface/IAuthCreator';
import { Users } from '../../../../database/init-model';

@Service()
export class AuthRetriever implements IAuthRetriever {
  constructor(private readonly authRepository: AuthRepository) {}

  public async register(body: IUserCreator): Promise<Users> {
    try {
      return await this.authRepository.register(body);
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
