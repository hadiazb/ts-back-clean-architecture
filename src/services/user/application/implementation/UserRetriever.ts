import { Service } from 'typedi';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Adress, Users } from '../../../../database/init-model';
import { IUserCreator } from '../interface/IUserCreator';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(): Promise<Users[] | string> {
    try {
      return await await this.userRepository.findAll();
    } catch (error) {
      throw new Error('UserRetriver findAll');
    }
  }

  public async findOne(id: string): Promise<Users | string> {
    try {
      return await this.userRepository.findOne(id);
    } catch (error) {
      throw new Error('UserRetriver findOne');
    }
  }

  public async deleteOne(id: string): Promise<number | string> {
    try {
      return await this.userRepository.deleteOne(id);
    } catch (error) {
      throw new Error('UserRetriver deleteOne');
    }
  }

  public async createOne(body: IUserCreator, role: string): Promise<Users | string> {
    try {
      return await this.userRepository.createOne(body, role);
    } catch (error) {
      throw new Error('UserRetriver createOne');
    }
  }

  public async createUserAdress(id: string, body: Adress[]): Promise<string> {
    try {
      return await this.userRepository.createUserAdress(id, body);
    } catch (error) {
      throw new Error('UserRetriver createUserAdress');
    }
  }

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    try {
      return await this.userRepository.updateOne(id, body);
    } catch (error) {
      throw new Error('UserRetriver updateOne');
    }
  }
}
