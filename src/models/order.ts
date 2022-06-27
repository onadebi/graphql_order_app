import { Address } from "./address";
import { CustomerType } from "./customer.type";

export type Order = {
    uid?: string;
    title: string;
    bookingDate: number;
    customer: CustomerType;
    updated_at: number;
    address: Address;
    customerEmail: string;
}

export type CreateOrderDto = Omit<Order, "uid" | "updated_at">;
export type UpdateOrderDto = Omit<Order, "uid"| "customer"| "customerEmail">;