import { Service } from 'typedi';

import { IUserRepository } from './IUserRepository';
import { Users, UsersAttributes } from '../../../../database/init-model';

@Service()
export class UserRepository implements IUserRepository {
  public async findAll(): Promise<Users[]> {
    try {
      return await Users.findAll();
    } catch (error) {
      throw new Error('Error en la peticion');
    }
  }

  public async findOne(id: string): Promise<Users | null> {
    try {
      return await Users.findByPk(id);
    } catch (error) {
      throw new Error('Error en la peticion');
    }
  }

  public async deleteOne(id: string): Promise<number> {
    try {
      return await Users.destroy({
        where: {
          id
        }
      });
    } catch (error) {
      throw new Error('Error en la peticion');
    }
  }

  public async createOne(body: UsersAttributes): Promise<Users> {
    try {
      return await Users.create(body);
    } catch (error) {
      throw new Error('Error en la peticion');
    }
  }

  public async updateOne(id: string, body: UsersAttributes): Promise<[number, Users[]]> {
    try {
      return await Users.update(body, {
        where: {
          id
        }
      });
    } catch (error) {
      throw new Error('Error en la peticion');
    }
  }
}
