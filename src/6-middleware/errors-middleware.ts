import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { RouteNotFoundError } from "../3-models/client-error";

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

  public routeNotFound(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const err = new RouteNotFoundError(request.originalUrl, request.method);

    next(err);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
