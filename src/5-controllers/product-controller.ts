import express, { Request, Response, NextFunction } from "express";
import { productService } from "../4-services/product-service";
import { ProductModel } from "../3-models/product-model";
import { StatusCode } from "../3-models/enums";

// product controller listening to product requests:
class ProductController {
  // creating router object:
  public readonly router = express.Router();

  //   register routes:
  public constructor() {
    this.router.get("/products", this.getAllProducts);
    this.router.get("/products/:id", this.getProductById);
    this.router.post("/products", this.addProduct);
    this.router.put("/products/:id", this.updateProduct);
    this.router.delete("/products/:id", this.deleteProduct);
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
    const product = new ProductModel(request.body);
    const addedProduct = await productService.addProduct(product);
    respones.status(StatusCode.Created).json(addedProduct);
  }

  // update product:
  private async updateProduct(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const id = +request.params.id;
    request.body.id = id;
    const product = new ProductModel(request.body);
    const updatedProduct = await productService.updateProduct(product);
    respones.json(updatedProduct);
  }
  // delete product:
  private async deleteProduct(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const id = +request.params.id;
    await productService.deleteProduct(id);
    respones.sendStatus(StatusCode.NoContent);
  }
}

export const productController = new ProductController();
