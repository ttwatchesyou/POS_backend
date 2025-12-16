import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableEntity } from './table.entity';
import { TableController } from './table.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  controllers: [TableController],
})
export class TableModule {}
