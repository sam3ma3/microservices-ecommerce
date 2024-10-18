import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {Payment} from "../entities/payment.entities";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PaymentService {
    constructor(@InjectRepository(Payment) private paymentRepository: Repository<Payment>) {
    }

    //simulate a random failure, timeout, or success
    async processPayment(orderId: number, amount: number) {
        const random = Math.random();
        if (random < 0.2) {
            return {
                error: `Payment for order ${orderId} failed due to insufficient funds`
            }

        } else if (random >= 0.2 && random < 0.4) {
            await this.simulateTimeout(5000);
            return {error: `Payment for order ${orderId} timed out`}
        }
        const payment = new Payment()
        payment.orderId = orderId
        payment.amount = amount
        payment.status = true
        await this.paymentRepository.save(payment)
        return {
            success: true, message: `Payment for order ${orderId} processed successfully`
        };
    }

    async paymentInquiry(orderId: number) {
        return this.paymentRepository.findOne({where: {orderId}})
    }

    private async simulateTimeout(duration: number): Promise<unknown> {
        return new Promise((resolve) => setTimeout(resolve, duration));
    }
}
