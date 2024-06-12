import express, { Request, Response, NextFunction } from "express";

class LogsMiddleware {
  public logRequest(request: Request, respones: Response, next: NextFunction) {
    console.log("----------------------------");
    console.log("Method: " + request.method);
    console.log("URL: " + request.originalUrl);
    console.log("Body: ", request.body);
    console.log("----------------------------");

    next(); //continue thr request to the next middleware
  }
}

export const logsMiddleware = new LogsMiddleware();
