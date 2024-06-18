import { OkPacketParams, ResultSetHeader } from "mysql2";
import { dal } from "../2-utils/dal";
import { ProductModel } from "../3-models/product-model";
import { ResourceNotFoundError } from "../3-models/client-error";
import { fileSaver } from "uploaded-file-saver";

// Product service - any logic regarding products:
class ProductService {
  // get all products:
  public async getAllProducts() {
    // create sql:
    const sql =
      "SELECT *, concat('http://localhost:4000/api/products/images/', imageName) as imageUrl FROM products";
    // execute
    const products = await dal.execute(sql);
    // return
    return products;
  }

  // get on product:
  public async getProductById(id: number) {
    // sql:
    const sql =
      "SELECT *, concat('http://localhost:4000/api/products/images/', imageName) as imageUrl FROM products WHERE id = ?";
    // execute:
    const products = await dal.execute(sql, [id]);
    // extract the one and only product:
    const product = products[0];

    // if no product found:
    if (!product) throw new ResourceNotFoundError(id);

    // return:
    return product;
  }

  // add product:
  public async addProduct(product: ProductModel) {
    // valutation:
    product.validate();

    // save image to disk:
    const imageName = await fileSaver.add(product.image);

    // sql:
    const sql =
      "INSERT INTO products(name, price, quantity, imageName) VALUES (?, ?, ?, ?)";

    // execute
    const info: OkPacketParams = await dal.execute(sql, [
      product.name,
      product.price,
      product.quantity,
      imageName,
    ]);

    // get back the db product:
    product = await this.getProductById(info.insertId);

    // return
    return product;
  }

  // update product
  public async updateProduct(product: ProductModel) {
    // valutation:
    product.validate();

    // sql:
    const sql =
      "UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?";

    // execute
    const info: OkPacketParams = await dal.execute(sql, [
      product.name,
      product.price,
      product.quantity,
      product.id,
    ]);

    // if product not found:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(product.id);

    // return
    return product;
  }

  // delete product:
  public async deleteProduct(id: number) {
    // sql:
    const sql = "DELETE FROM products WHERE id = ?";

    // execute:
    const info: OkPacketParams = await dal.execute(sql, [id]);

    // if product not found:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
  }
}

export const productService = new ProductService();
