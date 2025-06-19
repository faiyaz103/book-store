import { NestFactory } from '@nestjs/core';
import { BooksAppModule } from './books-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        BooksAppModule,
        {
            transport:Transport.TCP,
            options:{
                port:3001
            }
        }
    );

    await app.listen();
}
bootstrap();
