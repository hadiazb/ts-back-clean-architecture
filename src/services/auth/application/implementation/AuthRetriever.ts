import { Service } from 'typedi';

import { IAuthRetriever } from '../interface/IAuthRetriever';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';
import { IUserCreator } from '../interface/IAuthCreator';
import { Users } from '../../../../database/init-model';

@Service()
export class AuthRetriever implements IAuthRetriever {
  constructor(private readonly authRepository: AuthRepository) {}

  public async findOneByEmail(email: string) {
    try {
      const user = await this.authRepository.findOneByEmail(email);
      return user;
    } catch (error) {
      throw new Error('Error ***************');
    }
  }

  public async register(body: IUserCreator): Promise<Users> {
    return await this.authRepository.register(body);
  }
}
