import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Roles, RolesId } from './Roles';

export interface UsersAttributes {
  id: number;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export type UsersPk = 'id';
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = 'id' | 'name' | 'lastName' | 'email' | 'phone';
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;

  name?: string;

  lastName?: string;

  email?: string;

  phone?: string;

  // Users hasOne Roles via idUser
  idRoles_Roles!: Roles;

  getIdRoles!: Sequelize.BelongsToGetAssociationMixin<Roles>;

  setIdRoles!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;

  createIdRoles!: Sequelize.BelongsToCreateAssociationMixin<Roles>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
          unique: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Users',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'Users_pkey',
            unique: true,
            fields: [{ name: 'id' }]
          }
        ]
      }
    );
  }
}
