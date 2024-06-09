import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "./2-utils/app-config";
import { productController } from "./5-controllers/productController";
import { employeeController } from "./5-controllers/employeeController";

const server = express();

server.use("/", productController.router);
server.use("/", employeeController.router);

server.listen(appConfig.port, () =>
  console.log("listening on http://localhost:" + appConfig.port)
);
