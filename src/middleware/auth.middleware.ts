import {
  NextFunction,
  Request,
  Response,
} from 'express';

import jwt from 'jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken =
    req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: 'Token não enviado.',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    next();
  } catch {
    return res.status(401).json({
      error: 'Token inválido.',
    });
  }
}