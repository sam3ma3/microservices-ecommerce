import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum ProcessStatus{SUCCESS="SUCCESS",FAILED="FAILED"}

export enum ProcessCommand{
    ORDER="ORDER",
    RESERVE="RESERVE",
    PAY="PAY"
}
@Entity()
export class OrderLog{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    status:ProcessStatus
    @Column()
    orderId:number
    @Column()
    processedAt:Date
    @Column({nullable:true})
    errorMessage:string
    @Column()
    command:ProcessCommand

}