import { Service } from 'typedi';

import { IAuthRetriever } from '../interface/IAuthRetriever';
import { AuthRepository } from '../../infrastructure/repositories/AuthRepository';

@Service()
export class AuthRetriever implements IAuthRetriever {
  constructor(private readonly authRepository: AuthRepository) {}

  public login() {}

  public async findOneByEmail(email: string) {
    try {
      const user = await this.authRepository.findOneByEmail(email);
      return user;
    } catch (error) {
      console.log('Retriever Auth: ', error);
      throw new Error('Error');
    }
  }
}
