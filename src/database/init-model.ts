import type { Sequelize } from 'sequelize';
import { Users as _Users } from '../services/user/domain/models/Users';
import type { UsersAttributes, UsersCreationAttributes } from '../services/user/domain/models/Users';

export { _Users as Users };

export type { UsersAttributes, UsersCreationAttributes };

export function initModels(sequelize: Sequelize) {
  const Users = _Users.initModel(sequelize);

  return {
    Users: Users
  };
}
