import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-error";

class SecurityMiddleware {
  // prevent xss attack
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

  // validate token
  public validateLogin(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    // take header:
    const authorizationHrader = request.headers.authorization;

    // "bearer the-token...."
    // 01234567
    const token = authorizationHrader?.substring(7);

    // check if valid
    const isValid = cyber.isTokenValid(token);

    if (!isValid) {
      next(new UnauthorizedError("You are not logged in."));
    } else {
      next();
    }
  }

  public validateAdmin(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    // take header:
    const authorizationHrader = request.headers.authorization;

    // "bearer the-token...."
    // 01234567
    const token = authorizationHrader?.substring(7);

    // check if valid
    const isValid = cyber.isTokenValid(token);

    //  if not valid:
    if (!isValid) {
      next(new UnauthorizedError("You are not logged in."));
      return;
    }

    // check if admin;
    const isAdmin = cyber.isAdmin(token);

    // if not admin:
    if (!isAdmin) {
      next(new UnauthorizedError("You are not authorized."));
      return;
    }

    next();
  }
}

export const securityMiddleware = new SecurityMiddleware();
