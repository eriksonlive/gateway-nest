// firebase-admin.service.ts
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  constructor() {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);
    // Inicializa la app de Firebase Admin (puedes usar applicationDefault o cargar una credencial con cert())
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw error;
    }
  }
}
