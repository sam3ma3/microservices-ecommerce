import {Body, Controller, Delete, Get, Inject, Post, Put} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import {IProduct} from "../entities/interfaces/product.interface";
import {ClientKafka} from "@nestjs/microservices";
import {ApiBody} from "@nestjs/swagger";
import {ProductDto} from "../entities/dtos/product.dto";
import {Kafka} from "kafkajs";

@Controller('product')
export class ProductController {
  admin
  constructor(private readonly appService: ProductService,
              @Inject('GATEWAY_SERVICE') private readonly client:ClientKafka) {}

  // async onApplicationBootstrap(){
  //   this.client.subscribeToResponseOf('product_create')
  //   await this.client.connect()
  // }

  async onModuleInit() {
    this.client.subscribeToResponseOf('product_create');
    this.client.subscribeToResponseOf('product_update');
    this.client.subscribeToResponseOf('product_delete');
    const kafka = new Kafka({
      clientId: 'gateway',
      brokers: [process.env.KAFKA_HOST],
    });
    this.admin = kafka.admin();
    // get list of topics
    const topics = await this.admin.listTopics();
    console.log("TOPICS: ", topics)
    // or create new topic
    await this.admin.createTopics({
      topics: [{
        topic: 'gateway-group',
        numPartitions: 1,
        replicationFactor: 1,
      },{
        topic: 'product-group',
        numPartitions: 1,
        replicationFactor: 1,
      },
        {
          topic: 'payment-group',
          numPartitions: 1,
          replicationFactor: 1,
        },
        {
          topic: 'inventory-group',
          numPartitions: 1,
          replicationFactor: 1,
        }, {
          topic: 'order-group',
          numPartitions: 1,
          replicationFactor: 1,
        }],
    });
    await this.client.connect()
  }


  @Post()
  @ApiBody({
    type:ProductDto })
  async createProduct(@Body() req: IProduct) {
    return await this.appService.createProduct(req);
  }
  @Put()
  @ApiBody({
    type:ProductDto })
  async updateProduct(@Body() req: IProduct) {
      const r = await this.appService.updateProduct(req);
      return r
  }
  @Delete()
  @ApiBody({
    type:ProductDto })
  async deleteProduct(@Body() req: IProduct) {
    return await this.appService.deleteProduct(req);
  }
}
