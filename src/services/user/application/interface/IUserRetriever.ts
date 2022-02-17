import { Users, UsersAttributes } from '../../../../database/init-model';

export interface IUserRetriever {
  findAll(): Promise<Users[]>;
  findOne(id: string): Promise<Users | null>;
  deleteOne(id: string): Promise<number>;
  createOne(body: UsersAttributes): Promise<Users>;
  updateOne(id: string, body: UsersAttributes): Promise<[number, Users[]]>;
}
