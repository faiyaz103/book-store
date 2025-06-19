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

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist:true, //strips unknown properties
            forbidNonWhitelisted:true, //throws error if extra properties
            transform:true //auto transform payloads to dto instances
        })
    );
    await app.listen();
}
bootstrap();
