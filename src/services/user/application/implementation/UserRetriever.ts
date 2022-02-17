import { Service } from 'typedi';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserContext } from '../../domain/UserContext';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(private readonly userContext: UserContext, private readonly userRepository: UserRepository) {}
  public async findAll(): Promise<string> {
    return await this.userRepository.findAll();
  }

  public async findOne(id: string): Promise<string> {
    return await this.userRepository.findOne(id);
  }

  public async deleteOne(id: string): Promise<string> {
    return await this.userRepository.deleteOne(id);
  }

  public async createOne(): Promise<string> {
    return await this.userRepository.createOne();
  }

  public async updateOne(id: string): Promise<string> {
    return await this.userRepository.updateOne(id);
  }
}
