import { Service } from 'typedi';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

import { Auth, Users, Roles } from '../../../../database/init-model';
import { IAuthRepository } from './IAuthRepository';
import { IUserCreator } from '../../application/interface/IAuthCreator';

@Service()
export class AuthRepository implements IAuthRepository {
  public async register(body: IUserCreator): Promise<Users> {
    let response;
    try {
      response = await Users.create({ ...body, isBlock: true });
      await Roles.create({ idUser: response.id, rolName: 'CUSTOMER' });
      await Auth.create({ idUser: response.id, password: bcrypt.hashSync(body.password, 10) });
      return response;
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  public async recoveryPassword() {
    try {
      return 'reset password';
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  public async refreshToken(email: string) {
    try {
      const user = await Users.findOne({
        attributes: ['id', 'name', 'lastName', 'email'],
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

      if (!user) {
        throw boom.notFound();
      }

      return user;
    } catch (error: any) {
      console.log(error);
      throw Error(error.message);
    }
  }
}
