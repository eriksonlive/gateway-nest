// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as JwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrae el token desde el encabezado Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No ignorar la expiración
      ignoreExpiration: false,
      // Usaremos JWKS para obtener la clave pública de Auth0
      secretOrKeyProvider: JwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // Reemplaza con tu dominio Auth0
        jwksUri:
          'https://dev-3hlihodxgyn2r8zl.us.auth0.com/.well-known/jwks.json',
      }),
      // Configura el issuer y audience de acuerdo a tu cuenta Auth0
      issuer: 'https://dev-3hlihodxgyn2r8zl.us.auth0.com/',
      audience: 'https://dev-3hlihodxgyn2r8zl.us.auth0.com/api/v2/',
    });
  }

  async validate(payload: any) {
    // Retorna el payload o un objeto con la información relevante del usuario
    return { userId: payload.sub, ...payload };
  }
}
