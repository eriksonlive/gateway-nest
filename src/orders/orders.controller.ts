import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICES } from 'src/config';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICES) private readonly orderClient: ClientProxy,
  ) {}

  // @Post()
  // create(@Body() createOrderDto: CreateOrderDto) {
  //   return this.orderClient.send('createOrder', createOrderDto).pipe(
  //     catchError((err) => {
  //       throw new RpcException(err);
  //     }),
  //   );
  // }

  @Get()
  findAll() {
    return this.orderClient.send({ cmd: 'findAllOrders' }, '').pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderClient.send({ cmd: 'findOneOrder' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
