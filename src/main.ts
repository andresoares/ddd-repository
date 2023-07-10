import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "André Soares");
const address = new Address("Av. José Alexandre", 1208, "29560-000", "Guaçuí");
customer.changeAddress(address);
customer.activate();
//Relação de um agregado com o outro é via ID (order - customer)
//Relação Objeto - Entidade (order - item)
const item1 = new OrderItem("1", "Item 1", 10, "1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "2", 1);
const order = new Order("1", "123", [item1, item2]);