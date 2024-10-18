import {Inject, Injectable} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {OrderDto} from "../entities/dtos/order.dto";

@Injectable()
export class OrderService {
  constructor(@Inject('GATEWAY_SERVICE') private readonly gatewayService:ClientKafka) {
  }
  async createOrder(req:OrderDto) {
    return  this.gatewayService.send('order_create', req)
  }
}
