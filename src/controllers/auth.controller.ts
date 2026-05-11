import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export async function login(
  req: Request,
  res: Response
) {
  try {
    console.log('BODY:', req.body);

    const { username, password } =
      req.body;

    const user = await User.findOne({
      where: { username },
    });

    console.log('USER:', user);

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log(
      'PASSWORD MATCH:',
      passwordMatch
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Senha inválida',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },

      process.env.JWT_SECRET ||
        'secret',

      {
        expiresIn: '1d',
      }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log('LOGIN ERROR:', error);

    return res.status(500).json({
      error: 'Erro interno',
    });
  }
}