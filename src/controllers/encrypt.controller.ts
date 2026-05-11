import { Request, Response } from 'express';
import  Hash from '../models/Hash';
import  Message from '../models/Message';

export const encryptMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { message, step } = req.body;

    console.log('BODY:', req.body);

    if (!message) {
      return res.status(400).json({
        error: 'Mensagem obrigatória',
      });
    }

    if (
      step === undefined ||
      step === null ||
      isNaN(Number(step))
    ) {
      return res.status(400).json({
        error: 'Step inválido',
      });
    }

    const parsedStep = Number(step);

    const alphabet =
      'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

    const encryptedText = message
      .toLowerCase()
      .split('')
      .map((char: string) => {
        const index = alphabet.indexOf(char);

        if (index === -1) return char;

        let newIndex =
          (index + parsedStep) % alphabet.length;

        if (newIndex < 0) {
          newIndex += alphabet.length;
        }

        return alphabet[newIndex];
      })
      .join('');

    const generatedHash = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();

    const hashCreated = await Hash.create({
      hash: generatedHash,
      step: parsedStep,
      used: false,
    });

    const messageCreated = await Message.create({
      encryptedText,
      hashId: hashCreated.id,
    });

    return res.status(201).json({
      encryptedText: messageCreated.encryptedText,
      hash: hashCreated.hash,
    });

  } catch (error) {
    console.log('ENCRYPT ERROR:', error);

    return res.status(500).json({
      error: 'Erro ao criptografar mensagem',
    });
  }
};