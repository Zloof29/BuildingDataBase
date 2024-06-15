import { ValitationError } from "./client-error";

export class ProductModel {
  public id: number;
  public name: string;
  public price: number;
  public quantity: number;
  // ...

  // copy constructor
  public constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.quantity = product.quantity;
  }

  public validate() {
    if (!this.name) throw new ValitationError("Missing name.");
    if (!this.price) throw new ValitationError("Missing price");
    if (this.price < 0) throw new ValitationError("price cant be negative!");
    if (this.price > 1000)
      throw new ValitationError("price cant be exceed 1000.!");
    if (this.name.length)
      throw new ValitationError("price cant be exceed 1000!");
  }
  // Joi library can also check for validation error
}
