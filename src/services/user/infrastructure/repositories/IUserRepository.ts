import { Users } from '../../../../database/init-model';
import { IUserCreator } from '../../application/interface/IUserCreator';

export interface IUserRepository {
  findAll(): Promise<Users[]>;
  findOne(id: string): Promise<Users | null>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: IUserCreator): Promise<Users | string>;
  updateOne(id: string, body: IUserCreator): Promise<[number, Users[]]>;
}
