import { Service } from 'typedi';
import bcrypt from 'bcrypt';

import { IUserRepository } from './IUserRepository';
import { Users, Roles, Auth } from '../../../../database/init-model';
import { IUserCreator } from '../../application/interface/IUserCreator';

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
      return await Users.findByPk(id, {
        attributes: ['id', 'name', 'lastName', 'email', 'phone'],
        include: [
          {
            model: Roles,
            as: 'roles',
            attributes: ['id', 'rolName', 'idUser']
          }
        ]
      });
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

  public async createOne(body: IUserCreator): Promise<Users | string> {
    let response;
    try {
      response = await Users.create(body);
      await Roles.create({ idUser: response.id, rolName: 'usuario regular' });
      await Auth.create({ idUser: response.id, password: bcrypt.hashSync(body.password, 10) });
      return response;
    } catch (error: any) {
      return error.parent.detail;
    }
  }

  public async updateOne(id: string, body: IUserCreator): Promise<[number, Users[]]> {
    let response;
    try {
      response = await Users.update(body, {
        where: {
          id
        }
      });

      if (response[0] === 1) {
        const user = await Users.findByPk(id);
        await Roles.update(body, {
          where: {
            idUser: user?.id
          }
        });

        await Auth.update(body, {
          where: {
            idUser: user?.id
          }
        });
      }

      return response;
    } catch (error: any) {
      return error.message;
    }
  }
}
