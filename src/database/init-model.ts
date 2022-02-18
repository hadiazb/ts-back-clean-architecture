import type { Sequelize } from 'sequelize';
import { Users as _Users } from '../services/user/domain/models/Users';
import { Roles as _Roles } from '../services/user/domain/models/Roles';
import { Auth as _Auth } from '../services/user/domain/models/Auth';
import type { UsersAttributes, UsersCreationAttributes } from '../services/user/domain/models/Users';
import type { RolesAttributes, RolesCreationAttributes } from '../services/user/domain/models/Roles';
import type { AuthAttributes, AuthCreationAttributes } from '../services/user/domain/models/Auth';

export { _Users as Users };
export { _Roles as Roles };
export { _Auth as Auth };

export type { UsersAttributes, UsersCreationAttributes, RolesAttributes, RolesCreationAttributes, AuthAttributes, AuthCreationAttributes };

export function initModels(sequelize: Sequelize) {
  const Users = _Users.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);
  const Auth = _Auth.initModel(sequelize);

  Users.hasOne(Roles, { as: 'roles', foreignKey: 'idUser' });
  Users.hasOne(Auth, { as: 'auth', foreignKey: 'idUser' });

  return {
    Users,
    Roles,
    Auth
  };
}
