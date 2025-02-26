import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ProductsModule, OrdersModule, AuthModule],
  providers: [
    JwtStrategy,
    // Esto aplica el JwtAuthGuard a todas las rutas de la aplicación
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
