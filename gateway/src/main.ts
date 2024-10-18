import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('ecommerce gateway')
      .addBearerAuth({
        bearerFormat: "Bearer", in: "header", type: 'http', name: 'authorization'
      }, 'authorization')
      .setDescription('')
      .setVersion('1.0')
      .addTag('')
      .build();
  app.setGlobalPrefix('api')
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
