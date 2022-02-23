import { Service } from 'typedi';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Auth, Users, Roles } from '../../../../database/init-model';
import { IAuthRepository } from './IAuthRepository';
import { IUserCreator } from '../../application/interface/IAuthCreator';

@Service()
export class AuthRepository implements IAuthRepository {
  public async findOneByEmail(email: string): Promise<Users> {
    try {
      const response = await Users.findOne({
        attributes: ['id', 'name', 'lastName', 'email', 'phone', 'isBlock'],
        include: [
          {
            model: Roles,
            as: 'roles',
            attributes: ['id', 'rolName', 'idUser']
          },
          {
            model: Auth,
            as: 'auth',
            attributes: ['id', 'idUser']
          }
        ],
        where: {
          email
        }
      });

      if (!response) {
        throw boom.notFound(`The user with ${email} not found`);
      }

      return response;
    } catch (error: any) {
      throw boom.unauthorized();
    }
  }

  public async register(body: IUserCreator): Promise<Users> {
    let response;
    try {
      response = await Users.create({ ...body, isBlock: true });
      await Roles.create({ idUser: response.id, rolName: 'usuario regular' });
      await Auth.create({ idUser: response.id, password: bcrypt.hashSync(body.password, 10) });
      return response;
    } catch (error: any) {
      throw new Error('Error createone');
    }
  }

  public async login(body: any) {
    try {
    } catch (error) {}
  }
}
