import { Adress, Users } from '../../../../database/init-model';
import { IUserCreator } from '../../application/interface/IUserCreator';

export interface IUserRepository {
  findAll(): Promise<Users[] | string>;
  findOne(id: string): Promise<Users | string>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: IUserCreator, role: string): Promise<Users | string>;
  updateOne(id: string, body: IUserCreator): Promise<string>;
  createUserAdress(id: string, body: Adress[]): Promise<string>;
}
