import {ApiProperty} from "@nestjs/swagger";
import {IInventory} from "../interfaces/inventory.interface";


export class InventoryDto implements IInventory{
    id: number;
    @ApiProperty()
    product: number;
    @ApiProperty()
    quantity: number;

}