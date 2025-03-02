// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleLogin(@Body('firebaseToken') firebaseToken: string) {
    // Aquí el cliente debe enviar el id_token de Firebase obtenido en el frontend
    return this.authService.loginWithFirebase(firebaseToken);
  }
}
