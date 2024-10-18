import {Inject, Injectable} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {OrderDto} from "../entities/dtos/order.dto";
import {InventoryDto} from "../entities/dtos/inventory.dto";

@Injectable()
export class InventoryService {
  constructor(@Inject('GATEWAY_SERVICE') private readonly gatewayService:ClientKafka) {
  }
  async createInventory(req:InventoryDto) {
    return  this.gatewayService.send('inventory_create', req)
  }
}
