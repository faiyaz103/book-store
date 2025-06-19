import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalPipes(
    new ValidationPipe({
        whitelist:true, //strips unknown properties
        forbidNonWhitelisted:true, //throws error if extra properties
        transform:true //auto transform payloads to dto instances
    })
  );
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
