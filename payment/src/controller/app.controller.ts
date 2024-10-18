import { Controller } from '@nestjs/common';
import { PaymentService } from '../service/app.service';
import {MessagePattern} from "@nestjs/microservices";

@Controller()
export class PaymentController {
  constructor(private readonly appService: PaymentService) {}

  @MessagePattern('payment_create')
  payment(req:{orderId:number, amount:number}){
    console.log('payment_create received:', req)
    return this.appService.processPayment(req.orderId, req.amount);
  }
  @MessagePattern('payment_inquiry')
  inquiry(req:{orderId:number}) {
    console.log('payment_inquiry received:', req)
    return this.appService.paymentInquiry(req.orderId);
  }

}
