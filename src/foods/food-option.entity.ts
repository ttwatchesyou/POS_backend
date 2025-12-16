import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FoodEntity } from './food.entity';

@Entity('food_options')
export class FoodOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @ManyToOne(() => FoodEntity, (food) => food.options)
  food: FoodEntity;
}