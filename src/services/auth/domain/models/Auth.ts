import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AuthAttributes {
  id: number;
  password: string;
  idUser?: number;
}

export type AuthPk = 'id';
export type AuthId = Auth[AuthPk];
export type AuthOptionalAttributes = 'id' | 'password';
export type AuthCreationAttributes = Optional<AuthAttributes, AuthOptionalAttributes>;

export class Auth extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes {
  id!: number;
  password!: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Auth {
    return Auth.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        idUser: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'Auth',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'Auth_pkey',
            unique: true,
            fields: [{ name: 'id' }]
          }
        ]
      }
    );
  }
}
