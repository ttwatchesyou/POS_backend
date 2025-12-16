import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('tables')
export class TableEntity {
@PrimaryGeneratedColumn()
id: number;


@Column()
name: string;


@Column({ default: false })
state: boolean;


@Column({ default: true })
isAvailable: boolean;


@Column({ default: false })
is_deleted: boolean;
}