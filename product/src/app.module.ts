import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { ProductService } from './services/app.service';
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ClientsModule, ClientsProviderAsyncOptions, Transport} from "@nestjs/microservices";
import {ClientsModuleAsyncOptions} from "@nestjs/microservices/module/interfaces";

@Module({
  imports: [
      ConfigModule.forRoot({
    // envFilePath: './config/.env.dev',
  }),
    TypeOrmModule.forRootAsync({imports:[ConfigModule],
    useFactory:(configService:ConfigService)=>({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: parseInt(configService.get<string>('DB_PORT')),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASS'),
      database: configService.get<string>('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //migrations:[__dirname + '/../db-migration/init/*{.ts,.js}'],
      synchronize: true,autoLoadEntities:true,
      options:{}
    }), inject:[ConfigService]} as TypeOrmModuleAsyncOptions),TypeOrmModule.forFeature([Product]),
    ClientsModule.registerAsync({clients:[{inject:[ConfigService], imports:[ConfigModule], name:"PRODUCT_SERVICE"
        ,useFactory:(configService: ConfigService)=>({name:"PRODUCT_SERVICE",
          transport:Transport.KAFKA,
          options:{client:{clientId:'product',
              brokers:[ configService.get<string>('KAFKA_HOST')],},consumer:{groupId:'product-group'},}})//producer:{createPartitioner()}
      }] as Array<ClientsProviderAsyncOptions>} as ClientsModuleAsyncOptions)

],
  controllers: [AppController],
  providers: [ProductService],
  exports:[ConfigModule]
})
export class AppModule {}

