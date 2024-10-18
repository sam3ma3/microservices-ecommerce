import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {KafkaOptions, Transport} from "@nestjs/microservices";
//ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/ormconfig.ts
//typeorm migration:generate -d <path/to/datasource> path/to/migrations/<migration-name>
//npm run typeorm migration:generate db-migration/dataSource.ts db-migration/migrations/migrate-products.ts
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_HOST],
      },
      consumer: {
        groupId: 'product-group',  // unique group for producer
      },
    },
  }as KafkaOptions);
  await app.listen();
}
bootstrap();
