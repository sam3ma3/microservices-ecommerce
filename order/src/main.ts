import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {KafkaOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOST],
      },
      consumer: {
        groupId: 'order-group',
      },
    },
  }as KafkaOptions);
  await app.listen();
}
bootstrap();
