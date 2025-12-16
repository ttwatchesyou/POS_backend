import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from './food.entity';
import { FoodController } from './food.controller';
import { FoodOptionEntity } from './food-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity, FoodOptionEntity])],
  controllers: [FoodController],
})
export class FoodModule {}
