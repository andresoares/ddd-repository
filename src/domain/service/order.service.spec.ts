import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should get total of all orders", () => {

        const orderItem1 = new OrderItem("1", "Item 1", 100, "p1", 1);
        const orderItem2 = new OrderItem("2", "Item 2", 200, "p1", 2);
        const orderItem3 = new OrderItem("3", "Item 3", 300, "p1", 3);
        
        const order1 = new Order("o1", "c1", [orderItem1]);
        const order2 = new Order("o2", "c1", [orderItem2, orderItem3]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(1400);

    });

    it("should place an order", () => {

        const customer = new Customer("c1", "Customer 1");
        const orderItem1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);

    });
});




