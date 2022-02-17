import { Service } from 'typedi';

import { IUserRepository } from './IUserRepository';

@Service()
export class UserRepository implements IUserRepository {
  public async findAll(): Promise<string> {
    return await 'lista de usuarios';
  }

  public async findOne(id: string): Promise<string> {
    return await 'usuario';
  }

  public async deleteOne(id: string): Promise<string> {
    return await 'deleteOne';
  }

  public async createOne(): Promise<string> {
    return await 'createOne';
  }

  public async updateOne(id: string): Promise<string> {
    return await 'updateOne';
  }
}
