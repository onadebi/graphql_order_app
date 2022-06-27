import { IPagingFilterInput } from "../../interfaces/common/IPagingFilterInput";
import { VerifyUser } from "../../middleware/auth.middleware";
import { allServices } from "../../services/index.service";



export const Query = {
    customerOrdersByEmail: async (parent: any, args: { email: string }, context: any) => {
        if (VerifyUser(context.auth) !== null) {
            return await allServices.GetCustomerService().GetAllOrdersByCustomerEmail(args.email);
        }
    },
    getOrderById: async (parent: any, args: { orderId: string }, context: any) => {
        if (VerifyUser(context.auth) !== null) {
        return await allServices.GetOrderService().GetOrder(args.orderId);
        }
    },
    getOrders: async (parent: any, args: { paging: IPagingFilterInput }, context: any) => {
        if (VerifyUser(context.auth) !== null) {
        return await allServices.GetOrderService().GetAllOrders(args.paging);
        }
    },
    getUsers: async (parent: any, args: { paging: IPagingFilterInput }, context: any) => {
        if (VerifyUser(context.auth) !== null) {
            return await allServices.GetCustomerService().GetAllAuthUsers(args.paging);
        }
    }
}