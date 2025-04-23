import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    // Fazer verificação de auth
    let success = false;

    // Fazendo verificação de auth
    if ( req.headers.authorization ) {
      
      // Separado em array o bearer do token
      const [authType, token] = req.headers.authorization.split(' ');
      // Verifica se o tipo é Bearer
      if (authType === 'Bearer') {
        try {
          JWT.verify(
            token,
            process.env.JWT_SECRET_KEY as string
          );
          success = true;
        } catch (err) {
          // catch vazio para pular para o else abaixo
        }
      }

    }

    if(success) {
      next();
    } else {
      res.status(403); // Not authorized
      res.json({ error: 'Não autorizado'});
    }
  }
}