import { Service } from 'typedi';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserContext } from '../../domain/UserContext';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Users, UsersAttributes } from '../../../../database/init-model';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(private readonly userContext: UserContext, private readonly userRepository: UserRepository) {}
  public async findAll(): Promise<Users[]> {
    return await this.userRepository.findAll();
  }

  public async findOne(id: string): Promise<Users | null> {
    return await this.userRepository.findOne(id);
  }

  public async deleteOne(id: string): Promise<number> {
    return await this.userRepository.deleteOne(id);
  }

  public async createOne(body: UsersAttributes): Promise<Users> {
    return await this.userRepository.createOne(body);
  }

  public async updateOne(id: string, body: UsersAttributes): Promise<[number, Users[]]> {
    return await this.userRepository.updateOne(id, body);
  }
}
