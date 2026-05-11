import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/database';

const app = express();

sequelize.authenticate()
  .then(() => {
    console.log('Banco conectado');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3333, () => {
  console.log('Servidor rodando');
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Banco sincronizado');
  });