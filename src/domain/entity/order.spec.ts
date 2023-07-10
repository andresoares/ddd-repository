import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () =>{
        
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");

    });

    it("should throw error when customerId is empty", () =>{
        
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("Customer is required");

    });

    it("should throw error when order is empty", () =>{
        
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("Customer is required");

    });

    it("should throw error when order is empty", () =>{
        
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required");

    });

    it("should calculate total", () =>{
        
        const item1 = new OrderItem("123", "Item 1", 100, "1", 2);
        const item2 = new OrderItem("123", "Item 2", 200, "2", 2);
        const item3 = new OrderItem("123", "Item 3", 300, "3", 3);

        const order = new Order("1", "1", [item1, item2]);
        const total = order.total();

        expect(total).toBe(600);

        const order2 = new Order("1", "1", [item1, item2, item3]);
        const total2 = order2.total();

        expect(total2).toBe(1500);


    });

    it("should throw error if the item qtde is less or equal 0", () =>{
        expect(() => {
            const item1 = new OrderItem("123", "Item 1", 100, "1", 0);
            const order = new Order("1", "1", [item1]);
        }).toThrowError("Quantity must be greater than 0");
    });
    
});
