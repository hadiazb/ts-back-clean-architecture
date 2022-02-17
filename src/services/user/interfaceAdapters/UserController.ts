import { Service } from 'typedi';

import { IUserController } from './IUserController';
import { UserRetriever } from '../application/implementation/UserRetriever';

@Service()
export class UserController implements IUserController {
  constructor(private readonly userRetriever: UserRetriever) {}

  public async findAll(): Promise<string> {
    return await this.userRetriever.findAll();
  }

  public async findOne(id: string): Promise<string> {
    return await this.userRetriever.findOne(id);
  }

  public async deleteOne(id: string): Promise<string> {
    return await this.userRetriever.deleteOne(id);
  }

  public async createOne(): Promise<string> {
    return await this.userRetriever.createOne();
  }

  public async updateOne(id: string): Promise<string> {
    return await this.userRetriever.updateOne(id);
  }
}
