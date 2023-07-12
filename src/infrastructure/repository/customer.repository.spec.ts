import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/product.model';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';
import Customer from '../../domain/entity/customer';
import Address from '../../domain/entity/address';

describe("Customer repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        sequelize.addModels([CustomerModel])
        await sequelize.sync();

    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer",async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" }});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({where: { id: "1"}});

        expect(customerModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city
        });

        customer.changeName("Customer 2");
        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer.changeAddress(address2)

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({where: { id: "1"}});

        expect(customerModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 2",
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: address2.street,
            number: address2.number,
            zip: address2.zip,
            city: address2.city
        });

    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({where: { id: "1"}});

        const foundCustomer = await customerRepository.find("1");

        expect(customerModel.toJSON()).toStrictEqual({
            id: foundCustomer.id,
            name: foundCustomer.name,
            active: foundCustomer.isActive(),
            rewardPoints: foundCustomer.rewardPoints,
            street: foundCustomer.address.street,
            number: foundCustomer.address.number,
            zip: foundCustomer.address.zip,
            city: foundCustomer.address.city
        });

    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
       
        expect(async () => {
            await customerRepository.find("1234");
        }).rejects.toThrow("Customer not found");

    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1",);
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const customer2 = new Customer("2", "Customer 2",);
        const address2 = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer2.changeAddress(address2);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [customer, customer2];

        expect(customers).toEqual(foundCustomers);

    });
});