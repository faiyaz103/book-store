import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book as BookEntity } from './entities/book.entity';

@Module({
    imports:[TypeOrmModule.forFeature([BookEntity])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
