'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    const douglasPassword =
      await bcrypt.hash('douglas123', 10);

    const fernandoPassword =
      await bcrypt.hash('fernando123', 10);

    const isabelPassword =
      await bcrypt.hash('isabel123', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'douglas',
          password: douglasPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          username: 'fernando',
          password: fernandoPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          username: 'isabel',
          password: isabelPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete(
      'Users',
      {
        username: [
          'douglas',
          'fernando',
          'isabel',
        ],
      },
      {}
    );
  },
};