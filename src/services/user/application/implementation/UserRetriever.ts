import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserContext } from '../../domain/UserContext';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Users } from '../../../../database/init-model';
import { IUserCreator } from '../interface/IUserCreator';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(private readonly userContext: UserContext, private readonly userRepository: UserRepository) {}

  public async findAll(): Promise<Users[] | string> {
    const response = await this.userRepository.findAll();
    return await this.userContext.usersIsEmply(response);
  }

  public async findOne(id: string): Promise<Users | string> {
    const response = await this.userRepository.findOne(id);
    return this.userContext.userValidation(response);
  }

  public async deleteOne(id: string): Promise<number | string> {
    const response = await this.userRepository.deleteOne(id);
    return await this.userContext.userDeleteValidation(response, id);
  }

  public async createOne(body: IUserCreator): Promise<Users | string> {
    return await this.userRepository.createOne(body);
  }

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    const response = await this.userRepository.updateOne(id, body);
    return this.userContext.userUpdateValidation(response[0], id);
  }

  public validateAuth(req: Request, res: Response, next: NextFunction) {
    this.userContext.validateAuth(req, res, next);
  }
}
