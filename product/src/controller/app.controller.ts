import {Controller,} from '@nestjs/common';
import { ProductService } from '../services/app.service';
import {Product} from "../entities/product.entity";
import {MessagePattern,} from "@nestjs/microservices";
@Controller('product')
export class AppController {
  constructor(private readonly appService: ProductService) {}

  @MessagePattern('product_create')
  createProduct(newProduct:Product) {
    console.log("received request: ",newProduct )
    return this.appService.createProduct(newProduct);
  }
  @MessagePattern('product_update')
  updateProduct(newProduct:Product) {
    console.log("received request: ",newProduct )
    return this.appService.updateProduct(newProduct);
  }
  @MessagePattern('product_delete')
  deleteProduct(newProduct:Product) {
    console.log("received request: ",newProduct )
    return this.appService.deleteProduct(newProduct);
  }
}
