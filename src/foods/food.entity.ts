import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('foods')
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  state: boolean;

  @Column({ nullable: true })
  image_url: string | null;

  @Column({ default: false })
  is_deleted: boolean;
}
