import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { OrderService } from './service/app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ClientsModuleAsyncOptions} from "@nestjs/microservices/module/interfaces";
import {ClientsProviderAsyncOptions} from "@nestjs/microservices/module/interfaces/clients-module.interface";
import {OrderLog} from "./entities/log.entity";
import {Order} from "./entities/order.entities";
import {Product} from "./entities/product.entity";
@Module({
  imports: [
  //     ConfigModule.forRoot({
  //   envFilePath: './config/.env.dev',
  // }),
    TypeOrmModule.forRootAsync({imports:[ConfigModule],
      useFactory:(configService:ConfigService)=>({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,autoLoadEntities:true,
        options:{}
      }), inject:[ConfigService]} as TypeOrmModuleAsyncOptions),TypeOrmModule.forFeature([OrderLog, Order, Product]),
    ClientsModule.registerAsync(<ClientsModuleAsyncOptions>{
      clients: [{
        inject: [ConfigService], imports: [ConfigModule], name: "ORDER_SERVICE"
        , useFactory: (configService: ConfigService) => ({
          name: "ORDER_SERVICE",
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'order',
              brokers: [configService.get<string>('KAFKA_HOST')],
            }, consumer: {groupId: 'order-group'},
          }
        })//producer:{createPartitioner()}
      }] as Array<ClientsProviderAsyncOptions>
    } as ClientsModuleAsyncOptions)

  ],
  controllers: [AppController],
  providers: [OrderService],
})
export class AppModule {}
