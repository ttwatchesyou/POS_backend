import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


export enum LogState {
PENDING = 'PENDING',
SUCCESS = 'SUCCESS',
FAILED = 'FAILED',
}


@Entity('logs')
export class LogEntity {
@PrimaryGeneratedColumn()
id: number;


@Column()
table_id: number;


@Column({ nullable: true })
order_id: number;


@Column()
action: string;


@Column({ type: 'enum', enum: LogState, default: LogState.PENDING })
state: LogState;

@Column({ type: 'json', nullable: true })
payload: any;


@Column({ default: false })
is_deleted: boolean;


@CreateDateColumn()
created_at: Date;
// ```ts
// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';


// @Entity('logs')
// export class LogEntity {
// @PrimaryGeneratedColumn()
// id: number;


// @Column()
// table_id: number;


// @Column()
// food_id: number;

// @Column()
// food_name: string;


// @Column()
// food_state: boolean;


// @Column({ default: false })
// is_deleted: boolean;


// @CreateDateColumn()
// created_at: Date;
}