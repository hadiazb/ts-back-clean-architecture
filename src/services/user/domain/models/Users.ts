import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Auth, AuthId } from './Auth';
import { Roles, RolesId } from './Roles';

export interface UsersAttributes {
  id: number;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  isBlock?: boolean;
}

export type UsersPk = 'id';
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = 'id' | 'name' | 'lastName' | 'email' | 'phone' | 'isBlock';
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  isBlock?: boolean;

  // Users hasOne Roles via idUser
  idRoles_Roles!: Roles;
  getIdRoles!: Sequelize.BelongsToGetAssociationMixin<Roles>;
  setIdRoles!: Sequelize.BelongsToSetAssociationMixin<Roles, RolesId>;
  createIdRoles!: Sequelize.BelongsToCreateAssociationMixin<Roles>;

  // Auth hasOne Roles via idUser
  idAuth_Auth!: Auth;
  getIdAuth!: Sequelize.BelongsToGetAssociationMixin<Auth>;
  setIdAuth!: Sequelize.BelongsToSetAssociationMixin<Auth, AuthId>;
  createIdAuth!: Sequelize.BelongsToCreateAssociationMixin<Auth>;

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
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true
        },
        isBlock: {
          type: DataTypes.BOOLEAN,
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
