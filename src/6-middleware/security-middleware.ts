import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";

class SecurityMiddleware {
  public preventXssAttack(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    console.log("----------------------------");
    for (const prop in request.body) {
      const value = request.body[prop];

      if (typeof request.body[prop] === "string" && value.includes("<script")) {
        respones.status(StatusCode.Forbidden).send("Nice try!");
        return;
      }
    }

    console.log("Method: " + request.method);
    console.log("URL: " + request.originalUrl);
    console.log("Body: ", request.body);
    console.log("----------------------------");

    next(); //continue thr request to the next middleware
  }
}

export const securityMiddleware = new SecurityMiddleware();
