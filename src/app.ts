import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "./2-utils/app-config";
import { productController } from "./5-controllers/product-controller";
import { employeeController } from "./5-controllers/employeeController";

const server = express();

// create the body from json:
server.use(express.json());

server.use("/api", productController.router);
server.use("/api", employeeController.router);

server.listen(appConfig.port, () =>
  console.log("listening on http://localhost:" + appConfig.port)
);
