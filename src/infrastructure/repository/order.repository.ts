import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { Model, Table, PrimaryKey, Column, Sequelize } from 'sequelize-typescript';

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {

        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))

        },
            {
                include: [{ model: OrderItemModel }]
            });

    }

    async update(entity: Order): Promise<void> {

        await OrderModel.update({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
            {
                where: {
                    id: entity.id,
                },
            }).then(async () => {

                entity.items.forEach(async item => {
                    await OrderItemModel.update({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity
                    },
                        {
                            where: {
                                id: item.id,
                            },
                        });
            });

            });
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({ where: { id: id }, include: [{ model: OrderItemModel }] });
        } catch (error) {
            throw Error("Order not found");
        }

        return this.convertOrderModelToOrder(orderModel);
    }

    async findAll(): Promise<Order[]> {
        const customersAll = await OrderModel.findAll({
            include: [{ model: OrderItemModel }]
        });
        return customersAll.map(i => this.convertOrderModelToOrder(i) );
    }

    private convertOrderModelToOrder(orderModel: OrderModel): Order {
        return new Order(
                orderModel.id,
                orderModel.customer_id,
                orderModel.items.map(j => new OrderItem(j.id, j.name, j.price, j.product_id, j.quantity)
            )
        );
    }


}