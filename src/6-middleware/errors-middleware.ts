import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";

class ErrorsMiddleware {
  public catchAll(
    err: any,
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    console.log(err);

    const statusCode = err.status || StatusCode.InternalServerError;

    const message = err.message;

    respones.status(statusCode).send(message);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
