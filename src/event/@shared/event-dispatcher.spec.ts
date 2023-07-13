import CustomerAddressChangedEvent from "../product/customer-address-changed.event";
import CustomerCreatedEvent from "../product/customer-created.event";
import ProductCreatedEvent from "../product/product-created.event";
import SendEmailWhenProductIsCreatedHandler from "../product/send-email-when-product-is-created.handler";
import WhenCustomerAddressChangedHandler from "../product/when-customer-address-changed.handler";
import WhenCustomerIsCreated1Handler from "../product/when-customer-is-created-1.handler";
import WhenCustomerIsCreated2Handler from "../product/when-customer-is-created-2.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventName = "ProductCreatedEvent";
        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventName = "ProductCreatedEvent";
        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);

    });

    it("should unregister all an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventName = "ProductCreatedEvent";
        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers[eventName]).toBeUndefined();

    });

    it("should notify Product event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventName = "ProductCreatedEvent"; //Deve ser o mesmo nome da classe do Event
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            descript: "Product 1 description",
            price: 10.0
        });

        //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        
    });

    it("should notify Customer event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new WhenCustomerIsCreated1Handler();
        const eventHandler2 = new WhenCustomerIsCreated2Handler();
        const eventHandler3 = new SendEmailWhenProductIsCreatedHandler();
        const eventName = "CustomerCreatedEvent"; //Deve ser o mesmo nome da classe do Event
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

        eventDispatcher.register(eventName, eventHandler1);
        eventDispatcher.register(eventName, eventHandler2);
        eventDispatcher.register("ProductCreatedEvent", eventHandler3);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler3);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            descript: "Customer 1 description"
        });

        //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
        expect(spyEventHandler3).not.toHaveBeenCalled();
        
    });

    it("should notify Customer Address Changed event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new WhenCustomerAddressChangedHandler();

        const eventName = "CustomerAddressChangedEvent";
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "1",
            name: "Customer 1",
            address: "Rua X"
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        
    });

});