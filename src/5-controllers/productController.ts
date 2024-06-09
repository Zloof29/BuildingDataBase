import express, { Request, Response, NextFunction } from "express";
import { productService } from "../4-services/products";

// product controller listening to product requests:
class ProductController {
  // creating router object:
  public readonly router = express.Router();

  //   register routes:
  public constructor() {
    this.router.get("/api/products", this.getAllProducts);
    this.router.get(
      "/api/productsLessThen18",
      this.getAllProductWithLess18Price
    );
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

  private async getAllProductWithLess18Price(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const products = await productService.getAllProductsless18Price();
    respones.json(products);
  }
}

export const productController = new ProductController();
