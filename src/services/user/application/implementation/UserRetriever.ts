import { Service } from 'typedi';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserContext } from '../../domain/UserContext';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Users, UsersAttributes } from '../../../../database/init-model';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(private readonly userContext: UserContext, private readonly userRepository: UserRepository) {}

  public async findAll(): Promise<Users[] | string> {
    const response = await this.userRepository.findAll();
    return await this.userContext.usersResponseValidation(response);
  }

  public async findOne(id: string): Promise<Users | string> {
    const response = await this.userRepository.findOne(id);
    return this.userContext.userResponseValidation(response);
  }

  public async deleteOne(id: string): Promise<number | string> {
    const response = await this.userRepository.deleteOne(id);
    return await this.userContext.userDeleteResponseValidation(response, id);
  }

  public async createOne(body: UsersAttributes): Promise<Users | string> {
    return await this.userRepository.createOne(body);
  }

  public async updateOne(id: string, body: UsersAttributes): Promise<string> {
    const response = await this.userRepository.updateOne(id, body);
    return this.userContext.userUpdateResponseValidation(response[0], id);
  }
}
