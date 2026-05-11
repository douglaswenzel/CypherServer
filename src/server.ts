import 'dotenv/config';

import sequelize from './config/database';

import './models';

import app from './app';

const PORT = process.env.PORT || 3333;

sequelize.sync().then(() => {
  console.log('Banco de dados conectado.');

  app.listen(PORT, () => {
    console.log(
      `Servidor rodando na porta ${PORT}`
    );
  });
});