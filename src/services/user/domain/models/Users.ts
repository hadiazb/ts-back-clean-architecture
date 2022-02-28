import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Auth, AuthId } from '../../../auth/domain/models/Auth';
import { Roles, RolesId } from './Roles';
import { Adress, AdressId } from './Adress';

export interface UsersAttributes {
  id: number;
  name?: string;
  lastName?: string;
  email: string;
  phone?: string;
  isBlock?: boolean;
  isDelete?: boolean;
  age?: number;
  identification?: number;
}

export type UsersPk = 'id';
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes =
  | 'id'
  | 'name'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'isBlock'
  | 'isDelete'
  | 'age'
  | 'identification';
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users
  extends Model<UsersAttributes, UsersCreationAttributes>
  implements UsersAttributes
{
  id!: number;
  name?: string;
  lastName?: string;
  email!: string;
  phone?: string;
  isBlock?: boolean;
  isDelete?: boolean;
  age?: number;
  identification?: number;

  // Users hasOne Roles via idUser
  idRoles_Roles!: Roles;
  getIdRoles!: Sequelize.HasOneGetAssociationMixin<Roles>;
  setIdRoles!: Sequelize.HasOneSetAssociationMixin<Roles, RolesId>;
  createIdRoles!: Sequelize.HasOneCreateAssociationMixin<Roles>;

  // Auth hasOne Roles via idUser
  idAuth_Auth!: Auth;
  getIdAuth!: Sequelize.HasOneGetAssociationMixin<Auth>;
  setIdAuth!: Sequelize.HasOneSetAssociationMixin<Auth, AuthId>;
  createIdAuth!: Sequelize.HasOneCreateAssociationMixin<Auth>;

  // Adress hasMany Roles via idUser
  Adress!: Adress[];
  getAdress!: Sequelize.HasManyGetAssociationsMixin<Adress>;
  setAdress!: Sequelize.HasManySetAssociationsMixin<Adress, AdressId>;
  addAdres!: Sequelize.HasManyAddAssociationMixin<Adress, AdressId>;
  addAdress!: Sequelize.HasManyAddAssociationsMixin<Adress, AdressId>;
  createAdress!: Sequelize.HasManyCreateAssociationMixin<Adress>;
  removeAdres!: Sequelize.HasManyRemoveAssociationMixin<Adress, AdressId>;
  removeAdress!: Sequelize.HasManyRemoveAssociationsMixin<Adress, AdressId>;
  hasAdres!: Sequelize.HasManyRemoveAssociationMixin<Adress, AdressId>;
  hasAdress!: Sequelize.HasManyRemoveAssociationsMixin<Adress, AdressId>;
  countAdress!: Sequelize.HasManyCountAssociationsMixin;

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
        },
        isDelete: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        identification: {
          type: DataTypes.INTEGER,
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
