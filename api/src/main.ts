import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { env } from 'process';
import { DomainErrorFilter } from './filter/domain-error/domain-error.filter';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: env.CLIENT_WEB_URL,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    },
  });
  // DomainErrorFilter

  app.useGlobalFilters(new DomainErrorFilter());

  //Swagger Config
  const config = new DocumentBuilder()
    .setTitle('e-Quali API')
    .setDescription('API para utilização do sistema e-Quali')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
