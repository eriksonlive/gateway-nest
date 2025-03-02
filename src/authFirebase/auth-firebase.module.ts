import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAdminService } from './firebase-admin.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseAdminService],
  exports: [AuthService],
})
export class AuthFirebaseModule {}
