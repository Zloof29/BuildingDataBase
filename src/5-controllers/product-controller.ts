import express, { Request, Response, NextFunction } from "express";
import { productService } from "../4-services/product-service";
import { ProductModel } from "../3-models/product-model";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { fileSaver } from "uploaded-file-saver";

// product controller listening to product requests:
class ProductController {
  // creating router object:
  public readonly router = express.Router();

  //   register routes:
  public constructor() {
    this.router.get("/products", this.getAllProducts);
    this.router.get("/products/:id([0-9]+)", this.getProductById); //same as (\\d+)
    this.router.post(
      "/products",
      securityMiddleware.validateLogin,
      this.addProduct
    );
    this.router.put(
      "/products/:id([0-9]+)",
      securityMiddleware.validateLogin,
      this.updateProduct
    );
    this.router.delete(
      "/products/:id([0-9]+)",
      securityMiddleware.validateAdmin,
      this.deleteProduct
    );
    this.router.get("/products/images/:imageName", this.getProductImage);
  }

  //   get all products:
  private async getAllProducts(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    try {
      const products = await productService.getAllProducts();
      respones.json(products);
    } catch (error: any) {
      next(error); //go to catchAll middleware
    }
  }

  // get product by id:
  private async getProductById(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const product = await productService.getProductById(id);
      respones.json(product);
    } catch (error: any) {
      next(error);
    }
  }

  // add product
  private async addProduct(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    try {
      request.body.image = request.files?.image;
      const product = new ProductModel(request.body);
      const addedProduct = await productService.addProduct(product);
      respones.status(StatusCode.Created).json(addedProduct);
    } catch (error: any) {
      next(error);
    }
  }

  // update product:
  private async updateProduct(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      request.body.id = id;
      const product = new ProductModel(request.body);
      const updatedProduct = await productService.updateProduct(product);
      respones.json(updatedProduct);
    } catch (error: any) {
      next(error);
    }
  }
  // delete product:
  private async deleteProduct(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      await productService.deleteProduct(id);
      respones.sendStatus(StatusCode.NoContent);
    } catch (error: any) {
      next(error);
    }
  }

  // get product image:
  private async getProductImage(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    try {
      const imageName = request.params.imageName;
      const imagePath = fileSaver.getFilePath(imageName, true);
      respones.sendFile(imagePath);
    } catch (error: any) {
      next(error);
    }
  }
}

export const productController = new ProductController();
