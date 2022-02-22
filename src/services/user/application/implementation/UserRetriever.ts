import { Service } from 'typedi';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Adress, Users } from '../../../../database/init-model';
import { IUserCreator } from '../interface/IUserCreator';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(): Promise<Users[] | string> {
    return await await this.userRepository.findAll();
  }

  public async findOne(id: string): Promise<Users | string> {
    return await this.userRepository.findOne(id);
  }

  public async deleteOne(id: string): Promise<number | string> {
    return await this.userRepository.deleteOne(id);
  }

  public async createOne(body: IUserCreator): Promise<Users | string> {
    return await this.userRepository.createOne(body);
  }

  public async createUserAdress(id: string, body: Adress[]): Promise<string> {
    return await this.userRepository.createUserAdress(id, body);
  }

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    return await this.userRepository.updateOne(id, body);
  }
}
