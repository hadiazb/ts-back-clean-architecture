import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface RolesAttributes {
  id: number;
  rolName?: string;
  idUser?: number;
}

export type RolesPk = 'id';
export type RolesId = Roles[RolesPk];
export type RolesOptionalAttributes = 'id' | 'rolName';
export type RolesCreationAttributes = Optional<RolesAttributes, RolesOptionalAttributes>;

export class Roles
  extends Model<RolesAttributes, RolesCreationAttributes>
  implements RolesAttributes
{
  id!: number;

  rolName?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof Roles {
    return Roles.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        rolName: {
          type: DataTypes.ENUM('ADMIN', 'CUSTOMER', 'SELLER'),
          allowNull: true
        },
        idUser: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'Roles',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'Roles_pkey',
            unique: true,
            fields: [{ name: 'id' }]
          }
        ]
      }
    );
  }
}
