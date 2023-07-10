import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () =>{
        
        expect(() => {
            let customer = new Customer("", "Andre");
        }).toThrowError("Id is required");

    });

    it("should throw error when name is empty", () =>{
        
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");

    });

    it("should change name", () =>{
        
        const customer = new Customer("123", "André");
        customer.changeName("André Soares")

        expect(customer.name).toBe("André Soares");

    });

    it("should activate customer", () =>{
        
        const customer = new Customer("123", "André");
        const address = new Address("Rua qualquer", 275, "29560-000", "Guaçuí");
        customer.changeAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);

    });

    it("should deactivate customer", () =>{
        
        const customer = new Customer("123", "André");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);

    });

    it("should throw error when address is undefined when you activate a customer", () =>{
        
        expect(() => {
            const customer = new Customer("123", "André");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })
    
});
