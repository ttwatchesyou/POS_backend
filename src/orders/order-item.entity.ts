import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // FK ไปที่ order
  @Column()
  order_id: number;

  // FK อาหาร (อ้างอิงเฉย ๆ)
  @Column()
  food_id: number;

  // snapshot ชื่ออาหาร (กันชื่อเปลี่ยน)
  @Column()
  food_name: string;

  // snapshot ราคา ณ เวลาสั่ง
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // จำนวน
  @Column()
  qty: number;

  // หมายเหตุ เช่น "ไม่ใส่พริก"
  @Column({ nullable: true })
  note: string;

  // price * qty
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
