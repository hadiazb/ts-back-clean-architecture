import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

import { IUserController } from './IUserController';
import { UserRetriever } from '../application/implementation/UserRetriever';
import { Users } from '../domain/models/Users';
import { IUserCreator } from '../application/interface/IUserCreator';

@Service()
export class UserController implements IUserController {
  constructor(private readonly userRetriever: UserRetriever) {}

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

  public validateAuth(req: Request, res: Response, next: NextFunction) {
    this.userRetriever.validateAuth(req, res, next);
  }

  public createValidator(req: any, res: Response, next: NextFunction) {
    this.userRetriever.createValidator(req, res, next);
  }

  public getValidator(req: any, res: Response, next: NextFunction) {
    this.userRetriever.getValidator(req, res, next);
  }

  public deleteValidator(req: any, res: Response, next: NextFunction) {
    this.userRetriever.deleteValidator(req, res, next);
  }

  public updateValidator(req: any, res: Response, next: NextFunction) {
    this.userRetriever.updateValidator(req, res, next);
  }
}
