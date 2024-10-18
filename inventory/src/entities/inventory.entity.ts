import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Unique} from 'typeorm';
import {Product} from "./product.entity";

@Entity()
@Unique("product_unique_idx", ['product'])
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(()=>Product)
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    product: Product;

    @Column()
    quantity: number;

}
