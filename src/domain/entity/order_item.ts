import Product from "./product";

export default class OrderItem {

    private _id: string;
    private _name: string;
    private _price: number;
    private _productId: string;
    private _quantity: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }

    private validate(): void {
        if(this._quantity <= 0) {
            throw Error("Quantity must be greater than 0");
        }
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    increaseQuantity(quantity: number): void {
        this._quantity = this._quantity + quantity;
        this.validate();
    }

    decreaseQuantity(quantity: number): void {
        this._quantity = this._quantity - quantity;
        this.validate();
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get productId(): string {
        return this._productId;
    }
}