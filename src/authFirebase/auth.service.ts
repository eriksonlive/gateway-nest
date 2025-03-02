import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { FirebaseAdminService } from './firebase-admin.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseAdminService: FirebaseAdminService) {}

  async loginWithFirebase(firebaseToken: string) {
    // Verifica el token de Firebase
    let decodedToken;
    try {
      decodedToken = await this.firebaseAdminService.verifyToken(firebaseToken);
    } catch (error) {
      throw new UnauthorizedException('Token de Firebase inválido');
    }

    // Extrae la información del usuario desde el token de Firebase
    const payload = {
      sub: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
    };

    // Genera un JWT personalizado firmado con tu clave ("lorem-ipsum")
    const jwtToken = sign(payload, 'lorem-ipsum', {
      expiresIn: '1h',
      algorithm: 'HS512',
    });

    return { token: jwtToken, user: payload };
  }
}
