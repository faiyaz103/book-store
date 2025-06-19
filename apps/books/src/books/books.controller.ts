import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UpdateWrapperDto } from './dto/updateWrapper-dto';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('books.create')
  create(@Payload() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern('books.findAll')
  findAll() {
    return this.booksService.findAll();
  }

  @MessagePattern('books.findOne')
  findOne(@Payload() id: string) {
    return this.booksService.findOne(id);
  }

  @MessagePattern('books.update')
  update(@Payload() payload: UpdateWrapperDto) {
    return this.booksService.update(payload.id, payload.data);
  }

  @MessagePattern('books.remove')
  remove(@Payload() id: string) {
    return this.booksService.remove(id);
  }
}
