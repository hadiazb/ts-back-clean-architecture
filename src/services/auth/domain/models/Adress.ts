import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface AdressAttributes {
  id: number;
  city?: string;
  country?: string;
  state?: string;
  postalCode?: number;
  idUser?: number;
}

export type AdressPk = 'id';
export type AdressId = Adress[AdressPk];
export type AdressOptionalAttributes = 'id' | 'city' | 'country' | 'state' | 'postalCode';
export type AdressCreationAttributes = Optional<AdressAttributes, AdressOptionalAttributes>;

export class Adress extends Model<AdressAttributes, AdressCreationAttributes> implements AdressAttributes {
  id!: number;
  city?: string;
  country?: string;
  state?: string;
  postalCode?: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof Adress {
    return Adress.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true
        },
        country: {
          type: DataTypes.STRING,
          allowNull: true
        },
        state: {
          type: DataTypes.STRING,
          allowNull: true
        },
        postalCode: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        idUser: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'Adress',
        schema: 'public',
        timestamps: true,
        indexes: [
          {
            name: 'Adress_pkey',
            unique: true,
            fields: [{ name: 'id' }]
          }
        ]
      }
    );
  }
}
