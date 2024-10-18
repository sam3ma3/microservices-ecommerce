import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, ManyToOne} from 'typeorm';
import {OrderStatus} from "./order.enum";
import {Product} from "./product.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Product, )
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    product: Product;
    @Column()
    quantity: number;
    @Column({default:OrderStatus.PENDING})
    status:OrderStatus

}
