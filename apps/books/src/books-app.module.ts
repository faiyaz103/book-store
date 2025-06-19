import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        BooksModule,

        ConfigModule.forRoot({
            isGlobal:true,
            load:[configuration],
            envFilePath:'apps/books/.env'
        }),

        TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            useFactory:(configService:ConfigService)=>({
                type:'postgres',
                host:configService.get('database.host'),
                port:configService.get('database.port'),
                username:configService.get('database.username'),
                password:configService.get('database.password'),
                database:configService.get('database.name'),
                // entities:[__dirname + '/**/*.entity{.ts,.js}'],
                synchronize:true, //do not true this in production
                keepConnectionAlive:true,
                timezone:'UTC',
                ssl:configService.get('database.ssl'),
                extra:configService.get('database.ssl') ? {
                    ssl:{
                        rejectUnauthorized:false
                    }
                } : null,
                autoLoadEntities:true
            }),
            inject:[ConfigService]
        }),
    ],
    controllers: [],
    providers: [],
})
export class BooksAppModule {}
