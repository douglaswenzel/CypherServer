import bcrypt from 'bcryptjs';

import sequelize from '../config/database';

import User from '../models/User';

async function seed() {
  try {
    await sequelize.sync();

    const users = [
      {
        username: 'douglas',
        password: await bcrypt.hash(
          '123456',
          10
        ),
      },

      {
        username: 'admin',
        password: await bcrypt.hash(
          'admin123',
          10
        ),
      },
    ];

    for (const userData of users) {
      const userExists =
        await User.findOne({
          where: {
            username:
              userData.username,
          },
        });

      if (!userExists) {
        await User.create(userData);

        console.log(
          `Usuário ${userData.username} criado.`
        );
      } else {
        console.log(
          `Usuário ${userData.username} já existe.`
        );
      }
    }

    console.log('Seed finalizado.');

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seed();