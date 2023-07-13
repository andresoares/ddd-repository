import EventDispatcher from "../@shared/event-dispatcher";
import WhenCustomerAddressChangedHandler from "../product/when-customer-address-changed.handler";
import WhenCustomerIsCreated1Handler from "../product/when-customer-is-created-1.handler";
import WhenCustomerIsCreated2Handler from "../product/when-customer-is-created-2.handler";

const CUSTOMER_ADDRESS_CHANGED_EVENT = "CustomerAddressChangedEvent";
const CUSTOMER_CREATED_EVENT = "CustomerCreatedEvent";

export abstract class Service{

    protected static _eventDispatcher: EventDispatcher;

    protected static setup(): void {
        if(!this._eventDispatcher) {
            this._eventDispatcher = new EventDispatcher();
            const eventHandlerAddress = new WhenCustomerAddressChangedHandler();
            this._eventDispatcher.register(CUSTOMER_ADDRESS_CHANGED_EVENT, eventHandlerAddress);
            const eventHandlerCreatedCustomer1 = new WhenCustomerIsCreated1Handler();
            const eventHandlerCreatedCustomer2 = new WhenCustomerIsCreated2Handler();
            this._eventDispatcher.register(CUSTOMER_CREATED_EVENT, eventHandlerCreatedCustomer1);
            this._eventDispatcher.register(CUSTOMER_CREATED_EVENT, eventHandlerCreatedCustomer2);
        } 
    }

    public static get getEventDispatcher(): EventDispatcher {
        return this._eventDispatcher;
    }
}