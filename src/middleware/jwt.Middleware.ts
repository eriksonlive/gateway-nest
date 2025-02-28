import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Si la ruta comienza con /api/public, no requiere token
    if (req.path.startsWith('/api/public')) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No se proporcionó token');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'lorem-ipsum',
        {
          algorithms: ['HS512'], // Usa HS512 en lugar de HS256
        },
      );

      console.log(decoded);
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
