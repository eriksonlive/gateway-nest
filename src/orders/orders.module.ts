import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICES } from 'src/config';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICES,
        transport: Transport.TCP,
        options: {
          host: envs.orderMicroservicesHost,
          port: envs.orderMicroservicesPort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
