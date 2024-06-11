import express, { Request, Response, NextFunction } from "express";
import { productService } from "../4-services/product-service";
import { ProductModel } from "../3-models/product-model";

// product controller listening to product requests:
class ProductController {
  // creating router object:
  public readonly router = express.Router();

  //   register routes:
  public constructor() {
    this.router.get("/products", this.getAllProducts);
    this.router.get("/products/:id", this.getProductById);
    this.router.post("/products", this.addProduct);
  }

  //   get all products:
  private async getAllProducts(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const products = await productService.getAllProducts();
    respones.json(products);
  }

  // get product by id:
  private async getProductById(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const id = +request.params.id;
    const product = await productService.getProductById(id);
    respones.json(product);
  }

  // add product
  private async addProduct(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const product = new ProductModel(
      null,
      request.body.name,
      request.body.price,
      request.body.quantity
    );
    const newProduct = await productService.addProduct(product);
    respones.json(newProduct);
  }
}

export const productController = new ProductController();
