import { OkPacketParams, ResultSetHeader } from "mysql2";
import { dal } from "../2-utils/dal";
import { ProductModel } from "../3-models/product-model";

// Product service - any logic regarding products:
class ProductService {
  // get all products:
  public async getAllProducts() {
    // create sql:
    const sql = "SELECT * FROM products";
    // execute
    const products = await dal.execute(sql);
    // return
    return products;
  }

  // get on product:
  public async getProductById(id: number) {
    // sql:
    const sql = "SELECT * FROM products WHERE id = ?";
    // execute:
    const products = await dal.execute(sql, [id]);
    // extract the one and only product:
    const product = products[0];
    // return:
    return product;
  }

  // add product:
  public async addProduct(product: ProductModel) {
    // sql:
    const sql = "INSERT INTO products(name, price, quantity) VALUES (?, ?, ?)";

    // execute
    const info: OkPacketParams = await dal.execute(sql, [
      product.name,
      product.price,
      product.quantity,
    ]);

    // set new id:
    product.id = info.insertId;

    // return
    return product;
  }
}

export const productService = new ProductService();
