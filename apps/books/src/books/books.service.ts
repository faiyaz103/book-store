import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book as BookEntity} from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {

    constructor(@InjectRepository(BookEntity) private bookRepository:Repository<BookEntity>){};

    create(createBookDto: CreateBookDto): Promise<BookEntity> {

        const book=this.bookRepository.create(createBookDto);

        return this.bookRepository.save(book);
    }

    findAll(): Promise<BookEntity[]> {

        return this.bookRepository.find();

    }

    async findOne(id: string): Promise<BookEntity> {

        const book=await this.bookRepository.findOne({
            where:{id}
        });

        if(!book) throw new NotFoundException('Book not found');

        return book;
    }

    async update(id: string, updateBookDto: UpdateBookDto): Promise<BookEntity> {

        const book=await this.findOne(id);
        
        if (!book) throw new NotFoundException(`Book not found`);

        const updated=Object.assign(book,updateBookDto);

        return this.bookRepository.save(updated);
    }

    async remove(id: string): Promise<BookEntity> {

        const book=await this.bookRepository.findOne({
            where:{id}
        });

        if(!book) throw new NotFoundException('Book not found');

        await this.bookRepository.delete(id);

        return book;
    }
}
