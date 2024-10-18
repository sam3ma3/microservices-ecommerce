import {Controller, Inject} from '@nestjs/common';
import {OrderService} from '../service/app.service';
import {ClientKafka, EventPattern, MessagePattern} from "@nestjs/microservices";
import {Order} from "../entities/order.entities";

@Controller()
export class AppController {
    constructor(private readonly appService: OrderService,@Inject('ORDER_SERVICE') private client: ClientKafka) {
    }

    @MessagePattern('order_create')
    createOrder(req: Order) {
        console.log('order_create received', req)
        return this.appService.createOrder(req);
    }

    @EventPattern('order_payment')
    onOrderInventoryReservation(req: {orderId:number, amount:number}) {
        console.log('order_payment received', req)
        return this.appService.onOrderPayment(req.orderId,req.amount);
    }

    @EventPattern('order_failed')
    onOrderFailure(req: {orderId:number,}) {
        console.log('order_failed received', req)
        return this.appService.onOrderFailure(req.orderId);
    }

    async onModuleInit(){
        this.client.subscribeToResponseOf('payment_inquiry');
        this.client.subscribeToResponseOf('payment_create');}

}
