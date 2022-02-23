import { Strategy } from 'passport-local';
import passport from 'passport';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Users, Roles, Auth } from '../database/init-model';

export class AuthLogin {
  public localStrategy = Strategy;
  public passport = passport;

  public localStrategyImplement() {
    this.passport.use(
      new this.localStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
        try {
          const user = await this.findOneByEmail(email);
          let passwordDB!: string;
          if (!user) {
            done(boom.unauthorized(), false);
          }
          if (typeof user !== 'string') {
            const userAuth = await Auth.findOne({
              where: {
                idUser: user.id
              }
            });

            passwordDB = userAuth ? userAuth?.password : '';
          }
          const isMatch = await bcrypt.compare(password, passwordDB);

          if (!isMatch) {
            done(boom.unauthorized(), false);
          }

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      })
    );
  }

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
