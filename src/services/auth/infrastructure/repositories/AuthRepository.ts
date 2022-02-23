import { Service } from 'typedi';
import boom from '@hapi/boom';

import { Auth, Users, Roles } from '../../../../database/init-model';
import { IAuthRepository } from './IAuthRepository';

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
}
