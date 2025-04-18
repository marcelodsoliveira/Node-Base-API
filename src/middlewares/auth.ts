import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';


export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    // Fazer verificação de auth
    let success = false;

    // Fazendo verificação de auth
    if ( req.headers.authorization ) {
      let hash:string = req.headers.authorization.substring(6);
      let decoded = Buffer.from(hash, 'base64').toString();
      let data:string[] = decoded.split(':');

      // Verificação para saber se o usuário tentando login tem um usuário e senha no database
      if(data.length == 2){
        let hasUser = await User.findOne({
          where: {
            email: data[0],
            password: data[1]
          }
        });
        if(hasUser) {
          success = true;
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