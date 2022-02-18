import type { Sequelize } from 'sequelize';
import { Users as _Users } from '../services/user/domain/models/Users';
import { Roles as _Roles } from '../services/user/domain/models/Roles';
import type { UsersAttributes, UsersCreationAttributes } from '../services/user/domain/models/Users';
import type { RolessAttributes, RolesCreationAttributes } from '../services/user/domain/models/Roles';

export { _Users as Users };
export { _Roles as Roles };

export type { UsersAttributes, UsersCreationAttributes, RolessAttributes, RolesCreationAttributes };

export function initModels(sequelize: Sequelize) {
  const Users = _Users.initModel(sequelize);
  const Roles = _Roles.initModel(sequelize);

  Users.hasOne(Roles, { as: 'roles', foreignKey: 'idUser' });

  return {
    Users,
    Roles
  };
}
