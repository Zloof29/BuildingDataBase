import express, { Request, Response, NextFunction } from "express";
import fs from "fs";

class LogIntoFile {
  public async logRequest(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const data = `Method: ${request.method}, URL: ${
      request.originalUrl
    }, Body: ${JSON.stringify(request.body)}\n`;

    fs.appendFileSync("./log.text", data);

    next();
  }
}

export const logIntoFile = new LogIntoFile();
