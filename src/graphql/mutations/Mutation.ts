import { IUserLogin, IUserRegistration } from '../../interfaces/IUserRegistration';
import { VerifyUser } from '../../middleware/auth.middleware';
import { CreateOrderDto, Order, UpdateOrderDto } from '../../models/order';
import { allServices } from '../../services/index.service';



export const Mutation = {
    addOrder: async (parent: any, args: { input: CreateOrderDto }, context: any) => {
        if (VerifyUser(context.auth) !== null) {
            return await allServices.GetOrderService().CreateOrder(args.input);
        }
    },
    deleteOrder: async (parent: any, args: { orderId: string }, context: any) => {
        if (VerifyUser(context.auth) !== null) {
            return await allServices.GetOrderService().DeleteOrder(args.orderId);
        }
    },
    updateOrder: async (parent: any, args: { orderId: string, input: UpdateOrderDto }, context: any) => {
        if (VerifyUser(context.auth) !== null) {
            return await allServices.GetOrderService().UpdateOrder(args.orderId, args.input);
        }
    },
    userRegistration: async (parent: any, args: { registration: IUserRegistration }, context: any) => {
            return await allServices.GetCustomerService().RegisterNewUser(args.registration);
    },
    userLogin: async (parent: any, args: { login: IUserLogin }, context: any) => {
            return await allServices.GetCustomerService().SignInUser(args.login);
    },

}