import { Strategy as localStrategy } from 'passport-local';
import { ExtractJwt, Strategy as jwtStrategy, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';

import { Users, Roles, Auth } from '../database/init-model';
import { config } from '../config';

export class AuthLogin {
  public localStrategy = localStrategy;
  public jwtStrategy = jwtStrategy;
  public passport = passport;
  public extractJwt = ExtractJwt;
  public options: StrategyOptions = {
    jwtFromRequest: this.extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.develop.auth.secret
  };

  public jwtStrategyImplement() {
    const jwtStrategy = new this.jwtStrategy(this.options, (payload, done) => {
      return done(null, payload);
    });
    passport.use(jwtStrategy);
  }

  public localStrategyImplement() {
    const localStrategy = new this.localStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
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
      }
    );

    passport.use(localStrategy);
  }

  public async findOneByEmail(email: string): Promise<Users> {
    try {
      const response = await Users.findOne({
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

      if (!response) {
        throw boom.notFound(`The user with ${email} not found`);
      }

      return response;
    } catch (error: any) {
      throw boom.unauthorized();
    }
  }
}
