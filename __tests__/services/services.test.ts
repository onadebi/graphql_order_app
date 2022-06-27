import { IPagingFilterInput } from "../../src/interfaces/common/IPagingFilterInput";
import { allServices } from "../../src/services/index.service";

describe('Services Test', ()=> {


    let paging: IPagingFilterInput = {page: 0, pageSize: 20}
    it(`Checks for "GetAllOrders" always returns array and not null`,async ()=>{
        const result = await allServices.GetOrderService().GetAllOrders(paging);
        expect(result).not.toBe(null);
        expect(result.length).toBeGreaterThanOrEqual(0);
    });


});