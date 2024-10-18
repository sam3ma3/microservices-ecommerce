import {Body, Controller, Inject, Post} from "@nestjs/common";
import {ApiBody} from "@nestjs/swagger";
import {OrderService} from "../services/order.service";
import {OrderDto} from "../entities/dtos/order.dto";
import {ClientKafka} from "@nestjs/microservices";

@Controller('order')
export class OrderController {
    constructor(@Inject() private orderService: OrderService, @Inject('GATEWAY_SERVICE') private readonly client: ClientKafka) {
    }

    @Post()
    @ApiBody({
        type: OrderDto
    })
    async createProduct(@Body() req: OrderDto) {
        return await this.orderService.createOrder(req);
    }

    onModuleInit() {
        this.client.subscribeToResponseOf('order_create');

    }
}