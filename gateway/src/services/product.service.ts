import {Inject, Injectable} from '@nestjs/common';
import {ClientKafka} from "@nestjs/microservices";
import {IProduct} from "../entities/interfaces/product.interface";

@Injectable()
export class ProductService {
  constructor(@Inject('GATEWAY_SERVICE') private readonly gatewayService:ClientKafka) {
  }
  async createProduct(req:IProduct) {
    return  this.gatewayService.send('product_create', req)
  }
  updateProduct(req:IProduct) {
    // if(!req.id){
    //   throw new Error('product id must be specified')
    // }
    return this.gatewayService.send('product_update', req)
  }
  async deleteProduct(req:IProduct) {
    // if(!req.id){
    //   throw new Error('product id must be specified')
    // }
    return  this.gatewayService.send('product_delete', req)
  }
}
