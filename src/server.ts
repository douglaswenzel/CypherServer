import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database';

import app from './app';

sequelize.authenticate()
  .then(() => {
    console.log('Banco conectado');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3333, () => {
  console.log('Servidor rodando em http://localhost:3333');
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Banco sincronizado');
  });