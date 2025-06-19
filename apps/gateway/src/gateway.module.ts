import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
