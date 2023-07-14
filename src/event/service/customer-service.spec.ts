import Address from "../../domain/entity/address";
import WhenCustomerIsCreated1Handler from "../customer/when-customer-is-created-1.handler";
import CustomerService from "./customer-service";

describe("Domain events tests", () => {

    it("should notify Customer Address Changed event handler", () => {

        CustomerService.initialize();
        const eventDispatcher = CustomerService.getEventDispatcher;
        const eventName = "CustomerAddressChangedEvent";
        const eventHandler = eventDispatcher.getEventHandlers[eventName];

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler[0]);
        const spyEventHandler = jest.spyOn(eventHandler[0], "handle");

        const address = new Address("Avenida", 1, "9999999", "Vitoria");
        CustomerService.create("André", address);

        expect(spyEventHandler).toHaveBeenCalled();
        
    });

    it("should notify Customer created event handler", () => {

        CustomerService.initialize();
        const eventDispatcher = CustomerService.getEventDispatcher;
        const eventName = "CustomerCreatedEvent";
        const eventHandler = eventDispatcher.getEventHandlers[eventName];

        expect(eventHandler.length).toBe(2);
        const spyEventHandler1 = jest.spyOn(eventHandler[0], "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler[1], "handle");

        CustomerService.create("André", null);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

});