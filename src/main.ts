import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder().addBearerAuth()
    .setTitle('Digito')
    .setDescription('The Digito API description')
    .setVersion('0.1')
    .addTag('digito')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  
  
  await app.listen(3000,'0.0.0.0');
}
bootstrap();
