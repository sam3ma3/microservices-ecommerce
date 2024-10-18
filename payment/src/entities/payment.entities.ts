import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column()
    amount: number;
    @Column()
    status: boolean;


}