import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "./2-utils/app-config";
import { productController } from "./5-controllers/product-controller";
import { employeeController } from "./5-controllers/employeeController";
import { logsMiddleware } from "./6-middleware/logs-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";
import { errorsMiddleware } from "./6-middleware/errors-middleware";

const server = express();

// create the body from json:
server.use(express.json());

// register log middleware
server.use(logsMiddleware.logRequest);
server.use(securityMiddleware.preventXssAttack);

// register routes
server.use("/api", productController.router);
server.use("/api", employeeController.router);

// register catchAll middleware:
server.use(errorsMiddleware.catchAll);

server.listen(appConfig.port, () =>
  console.log("listening on http://localhost:" + appConfig.port)
);
