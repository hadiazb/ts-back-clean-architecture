import { Users, UsersAttributes } from '../../../database/init-model';

export interface IUserController {
  findAll(): Promise<Users[] | string>;
  findOne(id: string): Promise<Users | string>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: UsersAttributes): Promise<Users | string>;
  updateOne(id: string, body: UsersAttributes): Promise<[number, Users[]]>;
}
