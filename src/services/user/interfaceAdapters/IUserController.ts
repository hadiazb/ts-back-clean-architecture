import { Users, Adress } from '../../../database/init-model';
import { IUserCreator } from '../application/interface/IUserCreator';

export interface IUserController {
  findAll(): Promise<Users[] | string>;
  findOne(id: string): Promise<Users | string>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: IUserCreator): Promise<Users | string>;
  updateOne(id: string, body: IUserCreator): Promise<string>;
  createUserAdress(id: string, body: Adress[]): Promise<string>;
}
