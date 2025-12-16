import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from './food.entity';
import { FoodController } from './food.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity])],
  controllers: [FoodController],
})
export class FoodModule {}
