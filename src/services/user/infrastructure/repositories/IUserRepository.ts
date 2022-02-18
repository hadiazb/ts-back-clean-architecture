import { Users, UsersAttributes } from '../../../../database/init-model';

export interface IUserRepository {
  findAll(): Promise<Users[]>;
  findOne(id: string): Promise<Users | null>;
  deleteOne(id: string): Promise<number | string>;
  createOne(body: UsersAttributes): Promise<Users | string>;
  updateOne(id: string, body: UsersAttributes): Promise<[number, Users[]]>;
}
