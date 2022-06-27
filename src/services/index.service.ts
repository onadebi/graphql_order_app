import { CustomerService } from "./customer.service";
import { OrderService } from "./order.service";

// ===============OrderService=======
let _orderService: OrderService;
const GetOrderService = () => {
    if (_orderService === undefined) {
        _orderService = new OrderService();
    }
    return _orderService;
}

// ===============CustomerService=======
let _customerService: CustomerService;
const GetCustomerService = () => {
    if (_customerService === undefined) {
        _customerService = new CustomerService();
    }
    return _customerService;
}

// ===============Factories=============
class Factory<T>{
    private _service : T | undefined = undefined;
    constructor(TCreator: (new () => T)){
        if(this._service !== undefined){
            this._service = new TCreator();
        }
    }
    GetIstance = () : T| undefined => this._service ;
}


class MyFactory{
    GetInstance=<T> (TCreate: new() => T): T => new TCreate();  
} 

export const allServices ={
    GetOrderService,
    GetCustomerService,

}
// const result = new Factory<OrderService>(OrderService).GetIstance();
// const another = new MyFactory().GetInstance(OrderService);

