import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';

import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  username: string;
  password: string;

  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    'id' | 'createdAt' | 'updatedAt'
  > {}

class User
  extends Model<
    UserAttributes,
    UserCreationAttributes
  >
  implements UserAttributes
{
  public id!: number;

  public username!: string;

  public password!: string;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 50],
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,

    modelName: 'User',

    tableName: 'Users',

    timestamps: true,
  }
);

export default User;