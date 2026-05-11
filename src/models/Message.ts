import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';

import sequelize from '../config/database';

interface MessageAttributes {
  id: number;

  encryptedText: string;

  hashId: number;
}

interface MessageCreationAttributes
  extends Optional<MessageAttributes, 'id'> {}

class Message
  extends Model<
    MessageAttributes,
    MessageCreationAttributes
  >
  implements MessageAttributes
{
  public id!: number;

  public encryptedText!: string;

  public hashId!: number;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,
    },

    encryptedText: {
      type: DataTypes.TEXT,

      allowNull: false,
    },

    hashId: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },
  },

  {
    sequelize,

    modelName: 'Message',
  }
);

export default Message;