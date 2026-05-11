import express from 'express';

import cors from 'cors';

import authRoutes from './routes/auth.routes';

import encryptRoutes from './routes/encrypt.routes';

import decryptRoutes from './routes/decrypt.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/encrypt', encryptRoutes);

app.use('/decrypt', decryptRoutes);

app.get('/', (req, res) => {
  res.send('API ONLINE');
});

export default app;