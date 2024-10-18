import {IProduct} from "../interfaces/product.interface";
import {ApiProperty} from "@nestjs/swagger";

export class ProductDto implements IProduct{
    @ApiProperty()
    description: string;
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;

}