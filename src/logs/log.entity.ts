import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum LogState {
  PENDING = 0,
  DONE = 1,
}

@Entity('logs')
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  id_tb: number;

  
  @Column({ type: 'json' })
  id_food: string[];

  @Column({
    type: 'enum',
    enum: LogState,
    default: LogState.PENDING,
  })
  state: LogState;

  @CreateDateColumn()
  time: Date;
}
