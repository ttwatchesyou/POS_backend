import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

export enum OrderStatus {
  OPEN = 'OPEN',
  PAID = 'PAID',
  CANCEL = 'CANCEL',
}

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // โต๊ะที่เปิดบิล
  @Column()
  table_id: number;

  // เลขบิล (เช่น ORD-171234567890)
  @Column({ unique: true })
  order_no: string;

  // สถานะบิล
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.OPEN,
  })
  status: OrderStatus;

  // ราคารวมก่อนส่วนลด
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  sub_total: number;

  // ส่วนลด
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  // ราคาสุทธิ
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  // เวลาเปิดบิล
  @CreateDateColumn()
  opened_at: Date;

  // เวลาปิดบิล
  @Column({ nullable: true })
  closed_at: Date;

  // soft delete
  @Column({ default: false })
  is_deleted: boolean;

  // รายการอาหารในบิล
  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];
}
