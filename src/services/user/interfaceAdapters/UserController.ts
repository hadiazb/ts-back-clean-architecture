import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

import { IUserController } from './IUserController';
import { UserRetriever } from '../application/implementation/UserRetriever';
import { IUserCreator } from '../application/interface/IUserCreator';
import { Adress, Users } from '../../../database/init-model';
import { UserValidator } from '../application/implementation/UserValidator';

@Service()
export class UserController implements IUserController {
  constructor(
    private readonly userRetriever: UserRetriever,
    private readonly userValidator: UserValidator
  ) {}

  public async findAll(): Promise<Users[] | string> {
    return await this.userRetriever.findAll();
  }

  public async findOne(id: string): Promise<Users | string> {
    return await this.userRetriever.findOne(id);
  }

  public async deleteOne(id: string): Promise<number | string> {
    return await this.userRetriever.deleteOne(id);
  }

  public async createOne(body: IUserCreator): Promise<Users | string> {
    return await this.userRetriever.createOne(body);
  }

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    return await this.userRetriever.updateOne(id, body);
  }

  public async createUserAdress(id: string, body: Adress[]): Promise<string> {
    return await this.userRetriever.createUserAdress(id, body);
  }

  public createValidator(req: any, res: Response, next: NextFunction): void {
    this.userValidator.createValidator(req, res, next);
  }

  public getValidator(req: any, res: Response, next: NextFunction): void {
    this.userValidator.getValidator(req, res, next);
  }

  public deleteValidator(req: any, res: Response, next: NextFunction): void {
    this.userValidator.deleteValidator(req, res, next);
  }

  public updateValidator(req: any, res: Response, next: NextFunction): void {
    this.userValidator.updateValidator(req, res, next);
  }

  public createUserAdressSchema(req: any, res: Response, next: NextFunction): void {
    this.userValidator.createUserAdressSchema(req, res, next);
  }
}
