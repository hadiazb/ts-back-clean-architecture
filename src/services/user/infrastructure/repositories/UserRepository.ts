import { Service } from 'typedi';

import { IUserRepository } from './IUserRepository';
import { Users, UsersAttributes, Roles } from '../../../../database/init-model';

@Service()
export class UserRepository implements IUserRepository {
  public async findAll(): Promise<Users[]> {
    let response: Users[];
    try {
      response = await Users.findAll({
        attributes: ['id', 'name', 'lastName', 'email', 'phone'],
        include: [
          {
            model: Roles,
            as: 'roles',
            attributes: ['id', 'rolName', 'idUser']
          }
        ]
      });
    } catch (error) {
      throw new Error('Error en la peticion');
    }
    return response;
  }

  public async findOne(id: string): Promise<Users | null> {
    try {
      return await Users.findByPk(id);
    } catch (error: any) {
      return await error.parent.detail;
    }
  }

  public async deleteOne(id: string): Promise<number | string> {
    try {
      return await Users.destroy({
        where: {
          id
        }
      });
    } catch (error: any) {
      return error.message;
    }
  }

  public async createOne(body: UsersAttributes): Promise<Users | string> {
    let response;
    try {
      response = await Users.create(body);
      await Roles.create({ idUser: response.id, rolName: 'usuario regular' });
      return response;
    } catch (error: any) {
      return await error.parent.detail;
    }
  }

  public async updateOne(id: string, body: UsersAttributes): Promise<[number, Users[]]> {
    let response;
    try {
      const user = await Users.findByPk(id);
      response = await Users.update(body, {
        where: {
          id
        }
      });

      await Roles.update(body, {
        where: {
          idUser: user?.id
        }
      });

      return response;
    } catch (error) {
      throw new Error('Error en la peticion');
    }
  }
}
