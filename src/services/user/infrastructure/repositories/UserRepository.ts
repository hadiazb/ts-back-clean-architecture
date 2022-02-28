import { Service } from 'typedi';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

import { IUserRepository } from './IUserRepository';
import { Users, Roles, Auth, Adress } from '../../../../database/init-model';
import { IUserCreator } from '../../application/interface/IUserCreator';

@Service()
export class UserRepository implements IUserRepository {
  public async findAll(): Promise<Users[] | string> {
    try {
      let response: Users[];
      response = await Users.findAll({
        attributes: ['id', 'name', 'lastName', 'email', 'phone', 'isBlock'],
        include: [
          {
            model: Roles,
            as: 'roles',
            attributes: ['id', 'rolName', 'idUser']
          },
          {
            model: Adress,
            as: 'adress',
            attributes: ['id', 'city', 'country', 'state', 'postalCode', 'idUser']
          }
        ]
      });
      if (!response.length) {
        return 'The Users table is emply';
      }
      return response;
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  public async findOne(id: string): Promise<Users | string> {
    try {
      const response = await Users.findByPk(id, {
        attributes: ['id', 'name', 'lastName', 'email', 'phone', 'isBlock'],
        include: [
          {
            model: Roles,
            as: 'roles',
            attributes: ['id', 'rolName', 'idUser']
          },
          {
            model: Adress,
            as: 'adress',
            attributes: ['id', 'city', 'country', 'state', 'postalCode', 'idUser']
          }
        ]
      });

      if (!response) {
        throw boom.notFound(`The user with ${id} not found`);
      }

      return response;
    } catch (error: any) {
      throw boom.notFound(`The user with ${id} not found`);
    }
  }

  public async deleteOne(id: string): Promise<number | string> {
    try {
      const response = await Users.destroy({
        where: {
          id
        }
      });

      if (typeof response === 'string') {
        return await response;
      }

      if (response === 1) {
        return await `Usuario con id=${id} eliminado`;
      }

      if (response === 0) {
        throw boom.notFound(`User with id=${id} not found`);
      }

      return await response;
    } catch (error: any) {
      throw boom.notFound(`User with id=${id} not found`);
    }
  }

  public async createOne(body: IUserCreator, role: string = 'CUSTOMER'): Promise<Users | string> {
    let response;
    try {
      response = await Users.create({ ...body, isBlock: true });
      await Roles.create({ idUser: response.id, rolName: role.toUpperCase() });
      await Auth.create({ idUser: response.id, password: bcrypt.hashSync(body.password, 10) });
      return response;
    } catch (error: any) {
      return error.parent.detail;
    }
  }

  public async updateOne(id: string, body: IUserCreator): Promise<string> {
    let response;
    try {
      response = await Users.update(body, {
        where: {
          id
        }
      });

      if (response[0] === 1) {
        const user = await Users.findByPk(id);

        await Auth.update(body, {
          where: {
            idUser: user?.id
          }
        });
        return await `User with id=${id} was updated`;
      }

      throw boom.notFound(`User with id=${id} not found`);
    } catch (error: any) {
      throw boom.notFound(`User with id=${id} not found`);
    }
  }

  public async createUserAdress(id: string, body: Adress[]): Promise<string> {
    try {
      const user = await Users.findByPk(id);
      if (user) {
        body.forEach(async (adress) => {
          await Adress.create({
            idUser: parseInt(id),
            ...adress
          });
        });
        return `Adress User with id=${id} created`;
      }
      throw boom.notFound(`The user with ${id} not found`);
    } catch (error: any) {
      throw boom.notFound(`The user with ${id} not found`);
    }
  }
}
