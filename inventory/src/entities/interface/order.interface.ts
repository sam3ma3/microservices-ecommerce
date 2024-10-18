export enum OrderStatus {
    PENDING="PENDING",
    FAILED="FAILED",
    SUCCESS="SUCCESS"
}

export interface IProduct{
    price:number
    id:number
}
export interface IOrder {
    id: number;
    product: IProduct;
    quantity: number;
    status:OrderStatus

}