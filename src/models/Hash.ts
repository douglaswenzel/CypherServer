import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';

import sequelize from '../config/database';

interface HashAttributes {
  id: number;
  hash: string;
  step: number;
  used: boolean;
  userId?: number;
}

interface HashCreationAttributes
  extends Optional<
    HashAttributes,
    'id' | 'used'
  > {}

class Hash
  extends Model<
    HashAttributes,
    HashCreationAttributes
  >
  implements HashAttributes
{
  public id!: number;

  public hash!: string;

  public step!: number;

  public used!: boolean;

  public userId?: number;
}

Hash.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    hash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    step: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize,
    modelName: 'Hash',
  }
);

export default Hash;