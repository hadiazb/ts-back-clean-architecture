import { Service } from 'typedi';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

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
}
