import { Service } from 'typedi';

import { IUserController } from './IUserController';
import { UserRetriever } from '../application/implementation/UserRetriever';
import { Users, UsersAttributes } from '../domain/models/Users';

@Service()
export class UserController implements IUserController {
  constructor(private readonly userRetriever: UserRetriever) {}

  public async findAll(): Promise<Users[]> {
    return await this.userRetriever.findAll();
  }

  public async findOne(id: string): Promise<Users | null> {
    return await this.userRetriever.findOne(id);
  }

  public async deleteOne(id: string): Promise<number> {
    return await this.userRetriever.deleteOne(id);
  }

  public async createOne(body: UsersAttributes): Promise<Users> {
    return await this.userRetriever.createOne(body);
  }

  public async updateOne(id: string, body: UsersAttributes): Promise<[number, Users[]]> {
    return await this.userRetriever.updateOne(id, body);
  }
}
