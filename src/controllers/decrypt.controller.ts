import { Request, Response } from 'express';

import Hash from '../models/Hash';
import Message from '../models/Message';

export const decryptMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      encryptedText,
      hash,
    } = req.body;

    console.log('BODY:', req.body);

    if (!encryptedText || !hash) {
      return res.status(400).json({
        error: 'Dados inválidos',
      });
    }

    const hashData =
      await Hash.findOne({
        where: {
          hash,
        },
      });

    console.log('HASH DATA:', hashData);

    if (!hashData) {
      return res.status(404).json({
        error: 'Hash não encontrado',
      });
    }

    if (hashData.used) {
      return res.status(400).json({
        error: 'Hash já utilizado',
      });
    }

    const message =
      await Message.findOne({
        where: {
          hashId: hashData.id,
        },
      });

    console.log('MESSAGE:', message);

    if (!message) {
      return res.status(404).json({
        error: 'Mensagem não encontrada',
      });
    }

    const alphabet =
      'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

    const shift =
      Number(hashData.step) * -1;

    console.log('SHIFT:', shift);

    const decryptedText =
      encryptedText
        .toLowerCase()
        .split('')
        .map((char: string) => {
          const index =
            alphabet.indexOf(char);

          if (index === -1)
            return char;

          let newIndex =
            (index + shift) %
            alphabet.length;

          if (newIndex < 0) {
            newIndex +=
              alphabet.length;
          }

          return alphabet[newIndex];
        })
        .join('');

    await hashData.update({
      used: true,
    });

    return res.status(200).json({
      decryptedText,
    });

  } catch (error) {
    console.log(
      'DECRYPT ERROR:',
      error
    );

    return res.status(500).json({
      error:
        'Erro ao descriptografar',
    });
  }
};