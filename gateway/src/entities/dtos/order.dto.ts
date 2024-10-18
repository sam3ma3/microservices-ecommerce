import {ApiProperty} from "@nestjs/swagger";
import {IOrder, OrderStatus} from "../interfaces/order.interface";

export class OrderDto implements IOrder{
    // @ApiProperty()
    status: OrderStatus;
    // @ApiProperty()
    id: number;
    @ApiProperty()
    product: number;
    @ApiProperty()
    quantity: number;

}