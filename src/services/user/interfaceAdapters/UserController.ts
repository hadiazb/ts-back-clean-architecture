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
    try {
      return await this.userRetriever.findAll();
    } catch (error) {
      throw new Error('findAll UserController');
    }
  }

  public async findOne(id: string): Promise<Users | string> {
    try {
      return await this.userRetriever.findOne(id);
    } catch (error) {
      throw new Error('findOne UserController');
    }
  }

  public async deleteOne(id: string): Promise<number | string> {
    try {
      return await this.userRetriever.deleteOne(id);
    } catch (error) {
      throw new Error('delete userCotroller');
    }
  }

  public async createOne(body: IUserCreator, role: string): Promise<Users | string> {
    try {
      return await this.userRetriever.createOne(body, role);
    } catch (error) {
      throw new Error('createOne userController');
    }
  }

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    try {
      return await this.userRetriever.updateOne(id, body);
    } catch (error) {
      throw new Error('updateOne userController');
    }
  }

  public async createUserAdress(id: string, body: Adress[]): Promise<string> {
    try {
      return await this.userRetriever.createUserAdress(id, body);
    } catch (error) {
      throw new Error('createUserAdress userController');
    }
  }

  public createValidator(req: any, res: Response, next: NextFunction): void {
    this.userValidator.createValidator(req, res, next);
  }

  public createQueryUserSchema(req: any, res: Response, next: NextFunction): void {
    this.userValidator.createQueryUserSchema(req, res, next);
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

  public checkRole(req: Request, res: Response, next: NextFunction, ...roles: string[]) {
    this.userValidator.checkRole(req, res, next, ...roles);
  }
}
