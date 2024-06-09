import { dal } from "../2-utils/dal";

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

  public async getAllProductsless18Price() {
    const sql = "SELECT * FROM products WHERE price < 18.00 ";

    const products = await dal.execute(sql);

    return products;
  }
}

export const productService = new ProductService();
