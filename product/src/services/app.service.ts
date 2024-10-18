import { Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,) {
    }

    async createProduct(newProduct: Product) {
        try {
            const result = await this.productRepository.save(newProduct)
            console.log('saved product: ', result)
            return result
        } catch (e) {
            return {error: e.message}
        }

    }

    async updateProduct(product: Product) {
        if (!product.id) {
            return {error: 'product id must be specified'}
        }
        try {
            const result = await this.productRepository.save({
                id: product.id,
                description: product.description, name: product.name, price: product.price
            })
            console.log('updated product: ', result)
            return
        } catch (e) {
            return {error: e.message}

        }

    }

    async deleteProduct(newProduct: Product) {
        try {
            const result = await this.productRepository.delete({id: newProduct.id})
            console.log('deleted product: ', result)
            return
        } catch (e) {
            return {error: e.message}

        }

    }
}
