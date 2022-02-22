import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { IUserRetriever } from '../interface/IUserRetriever';
import { UserContext } from '../../domain/UserContext';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { Users } from '../../../../database/init-model';
import { IUserCreator } from '../interface/IUserCreator';
import UserSchema from '../schema/UserSchema';

@Service()
export class UserRetriever implements IUserRetriever {
  constructor(
    private readonly userContext: UserContext,
    private readonly userRepository: UserRepository,
    private readonly userSchema: UserSchema
  ) {}

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

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    return await this.userRepository.updateOne(id, body);
  }

  public validateAuth(req: Request, res: Response, next: NextFunction) {
    this.userContext.validateAuth(req, res, next);
  }

  public createValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.createUserSchema(), 'body');
  }

  public getValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.getUserSchema(), 'params');
  }

  public deleteValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.deleteUserSchema(), 'params');
  }

  public updateValidator(req: any, res: Response, next: NextFunction) {
    this.userContext.validatorHandler(req, res, next, this.userSchema.updateUserSchema(), 'body');
  }
}
