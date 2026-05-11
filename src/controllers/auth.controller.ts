import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

export async function register(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Usuário e senha são obrigatórios',
      });
    }

    const existingUser = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'Usuário já cadastrado',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.log('REGISTER ERROR:', error);

    return res.status(500).json({
      error: 'Erro interno',
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    console.log('BODY:', req.body);

    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
    });

    console.log('USER:', user);

    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log('PASSWORD MATCH:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Senha inválida',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },

      process.env.JWT_SECRET || 'secret',

      {
        expiresIn: '1d',
      },
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
