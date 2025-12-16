import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FoodOptionEntity } from './food-option.entity';

@Entity('foods')
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', default: true })
  state: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url: string | null;  

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

   @OneToMany(() => FoodOptionEntity, (option) => option.food, { cascade: true })
  options: FoodOptionEntity[];
}
