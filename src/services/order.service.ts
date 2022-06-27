import db from "../firebase";
import { CreateOrderDto, Order, UpdateOrderDto } from "../models/order";
import { IPagingFilterInput } from '../interfaces/common/IPagingFilterInput';
import { ISuccessResponse } from "../interfaces/common/ISuccessResponse";

export class OrderService {

    private readonly appDbRef = db.collection('orders_app');
    initOrder: Order | null = null;


    CreateOrder = async (order: CreateOrderDto): Promise<Order | null> => {
        try {
            const { customer, address, title, bookingDate } = order;
            const currentDate = Date.now();
            const newOrder: Order = {
                title,
                customer,
                address,
                updated_at: currentDate,
                bookingDate,
                customerEmail: customer.email
            }
            const resp = await this.appDbRef.add(newOrder); //await this.appDb.doc(newOrder.uid).set(newOrder);
            if (resp.path) {
                newOrder.uid = resp.id; //.path.split('/')[1];
            }
            console.log(JSON.stringify(resp.path.split('/')[1], null, 2));
            return resp.path ? newOrder : null;
        } catch (ex: any) {
            console.log(`Exception is ${ex.message}`)
        }
        return null;

    }

    GetAllOrders = async (filter: IPagingFilterInput) => {
        let objResp: Order[] = [];
        try {

            const resp = await this.appDbRef.orderBy("bookingDate", "desc").limit(filter.pageSize).offset(filter.page * filter.pageSize).get();
            if (!resp.empty) {
                resp.forEach(doc => {
                    const order = doc.data() as Order;
                    order.uid = doc.id;
                    objResp.push(order)
                });
            }
        } catch (err: any) {
            console.log(`LOG ERROR: ${err.message}`)
        }
        return objResp;
    }

    GetOrder = async (orderId: string) => {
        let objResp: Order | null = this.initOrder;
        try {
            const resp = await this.appDbRef.doc(orderId).get();
            if (resp.exists) {
                objResp = resp.data() as Order;
                objResp.uid = resp.id;
                console.log(`RESP DATA : ${JSON.stringify(objResp, null, 2)}`)
            }
            console.log(`GET Response : ${JSON.stringify(resp, null, 2)}`);
        } catch (ex) {
            return null;
        }
        return objResp?.uid ? objResp : null;
    }

    DeleteOrder = async (orderId: string) => {
        let objResp: boolean = false;
        try {
            const resp = await this.appDbRef.doc(orderId).delete();
            if (resp.writeTime) { objResp = true; }
        } catch (ex: any) {
            console.log(`[OrderService][DeleteOrder] ${ex.message}`)
        }
        return objResp;
    }

    UpdateOrder = async (orderId: string, order: UpdateOrderDto): Promise<ISuccessResponse> => {
        let objResp: ISuccessResponse = {success: false, message:''};
        try {
            order.updated_at = Date.now();
            const docExists = await this.appDbRef.doc(orderId).get();
            if(docExists.exists){
                const resp = await this.appDbRef.doc(orderId).set(order, { merge: true }); //await this.appDb.doc(newOrder.uid).set(newOrder);
                if (resp.writeTime) { objResp.success = true; }
            }else{
                objResp.message = `OrderId ${orderId} does not exist.`;
            }
        } catch (ex: any) {
            console.log(`Exception is ${ex.message}`)
        }
        return objResp;
    }


}