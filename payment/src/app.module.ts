import { Module } from '@nestjs/common';
import { PaymentController } from './controller/app.controller';
import { PaymentService } from './service/app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from "@nestjs/typeorm";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ClientsModuleAsyncOptions} from "@nestjs/microservices/module/interfaces";
import {ClientsProviderAsyncOptions} from "@nestjs/microservices/module/interfaces/clients-module.interface";
import {Payment} from "./entities/payment.entities";


@Module({
  imports:[
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
        //migrations:[__dirname + '/../db-migration/init/*{.ts,.js}'],
        synchronize: true,autoLoadEntities:true,
        options:{}
      }), inject:[ConfigService]} as TypeOrmModuleAsyncOptions),TypeOrmModule.forFeature([Payment]),
    ClientsModule.registerAsync(<ClientsModuleAsyncOptions>{
      clients: [{
        inject: [ConfigService], imports: [ConfigModule], name: "PAYMENT_SERVICE"
        , useFactory: (configService: ConfigService) => ({
          name: "PAYMENT_SERVICE",
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'payment',
              brokers: [configService.get<string>('KAFKA_HOST')],
            }, consumer: {groupId: 'payment-group'},
          }
        })//producer:{createPartitioner()}
      }] as Array<ClientsProviderAsyncOptions>
    } as ClientsModuleAsyncOptions)

  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class AppModule {}
