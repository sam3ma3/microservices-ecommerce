import { Controller } from '@nestjs/common';
import { InventoryService } from '../services/app.service';
import {EventPattern, MessagePattern,} from "@nestjs/microservices";
import {IOrder} from "../entities/interface/order.interface";
import {Inventory} from "../entities/inventory.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: InventoryService) {}
//this service needs to be on eventPattern and also it should have a retry mechanism, once the inventory reserved it should emit an event to the order service to continue the payment
  @EventPattern('inventory_new_order')
  reserveInventory(req:{order:IOrder}) {
    return this.appService.reserveInventory(req.order);
  }
  @MessagePattern('inventory_create')
  createInventory(req:Inventory) {
    return this.appService.createInventory(req);
  }
  @MessagePattern('inventory_release')
  releaseProduct(req:{productId:number, quantity:number}) {
    console.log(`inventory_release req:`, req)
    return this.appService.releaseInventory(req.productId, req.quantity);
  }

}
