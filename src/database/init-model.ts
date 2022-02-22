import type { Sequelize } from 'sequelize';
import { Users as _Users } from '../services/user/domain/models/Users';
import { Roles as _Roles } from '../services/user/domain/models/Roles';
import { Auth as _Auth } from '../services/user/domain/models/Auth';
import { Adress as _Adress } from '../services/user/domain/models/Adress';
import type { UsersAttributes, UsersCreationAttributes } from '../services/user/domain/models/Users';
import type { RolesAttributes, RolesCreationAttributes } from '../services/user/domain/models/Roles';
import type { AuthAttributes, AuthCreationAttributes } from '../services/user/domain/models/Auth';
import type { AdressAttributes, AdressCreationAttributes } from '../services/user/domain/models/Adress';

export { _Users as Users };
export { _Roles as Roles };
export { _Auth as Auth };
export { _Adress as Adress };

export type {
  UsersAttributes,
  UsersCreationAttributes,
  RolesAttributes,
  RolesCreationAttributes,
  AuthAttributes,
  AuthCreationAttributes,
  AdressAttributes,
  AdressCreationAttributes
};

export function initModels(sequelize: Sequelize) {
  const Users = _Users.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);
  const Auth = _Auth.initModel(sequelize);
  const Adress = _Adress.initModel(sequelize);

  Users.hasOne(Roles, { as: 'roles', foreignKey: 'idUser' });
  Users.hasOne(Auth, { as: 'auth', foreignKey: 'idUser' });
  Users.hasMany(Adress, { as: 'adress', foreignKey: 'idUser' });

  return {
    Users,
    Roles,
    Auth,
    Adress
  };
}
