import { Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UpdateWrapperDto } from './dto/updateWrapper-dto';

@Injectable()
export class BooksService {

    constructor(@Inject('BOOKS_CLIENT') private readonly client:ClientProxy){}

    async create(createBookDto: CreateBookDto) {
        return firstValueFrom(this.client.send('books.create',createBookDto));
    }

    async findAll() {
        return firstValueFrom(this.client.send('books.findAll',{}));
    }

    async findOne(id: string) {
        return firstValueFrom(this.client.send('books.findOne',id));
    }

    async update(payload: UpdateWrapperDto) {
        return firstValueFrom(this.client.send('books.update',payload));
    }

    remove(id: string) {
        return firstValueFrom(this.client.send('books.remove',id));
    }
}
