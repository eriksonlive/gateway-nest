// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configura el defaultStrategy
  ],
  providers: [
    JwtStrategy, // Registra la estrategia
    JwtAuthGuard, // Registra el guard
  ],
  exports: [JwtAuthGuard], // Exporta el guard para usarlo en otros módulos si es necesario
})
export class AuthModule {}
