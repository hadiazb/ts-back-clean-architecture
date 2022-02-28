import { Users } from '../../../../database/init-model';
import { IUserCreator } from './IUserCreator';

export interface IUserRetriever {
  findAll(): Promise<Users[] | string>;
  findOne(id: string): Promise<Users | string>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: IUserCreator, role: string): Promise<Users | string>;
  updateOne(id: string, body: IUserCreator): Promise<string>;
}
