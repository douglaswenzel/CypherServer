import User from './User';
import Hash from './Hash';
import Message from './Message';

User.hasMany(Hash);

Hash.belongsTo(User);

Hash.hasOne(Message);

Message.belongsTo(Hash);

export {
  User,
  Hash,
  Message,
};