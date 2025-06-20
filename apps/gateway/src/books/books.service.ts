import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, map, pipe } from 'rxjs';
import { UpdateWrapperDto } from './dto/updateWrapper-dto';
import { BookResponseDto } from './dto/book-response.dto';
import { BookDto } from 'apps/books/src/books/dto/book.dto';

@Injectable()
export class BooksService {

    constructor(@Inject('BOOKS_CLIENT') private readonly client:ClientProxy){}

    private mapBookResponse(bookDto: BookDto): BookResponseDto{
        return{
            
            bookName:bookDto.bookName,
            authorName:bookDto.authorName
        }
    }

    async create(createBookDto: CreateBookDto): Promise<BookResponseDto> {
        const createdBook = await firstValueFrom(this.client.send<BookDto,CreateBookDto>('books.create',createBookDto));

        return this.mapBookResponse(createdBook);
    }

    async findAll(): Promise<BookResponseDto[]> {
        const books=await firstValueFrom(this.client.send<BookDto[]>('books.findAll',{}));

        return books.map(this.mapBookResponse);
    }

    async findOne(id: string): Promise<BookResponseDto> {
        
        const book=await firstValueFrom(this.client.send<BookDto>('books.findOne',id));

        if(!book) throw new NotFoundException('Book not found');

        return this.mapBookResponse(book);
    }

    async update(payload: UpdateWrapperDto): Promise<BookResponseDto> {
        const updatedBook=await firstValueFrom(this.client.send<BookDto,UpdateWrapperDto>('books.update',payload));

        if(!updatedBook) throw new NotFoundException('Book not found');


        return this.mapBookResponse(updatedBook);
    }

    async remove(id: string): Promise<BookResponseDto> {
        const deletedBook=await firstValueFrom(this.client.send<BookDto>('books.remove',id));

        if(!deletedBook) throw new NotFoundException('Book not found');

        return this.mapBookResponse(deletedBook);
    }
}
