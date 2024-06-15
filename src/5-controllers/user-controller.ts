import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { StatusCode } from "../3-models/enums";

class UserConroller {
  public readonly router = express.Router();

  public constructor() {
    this.router.post("/register", this.register);
  }

  // add product
  private async register(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    try {
      const user = new UserModel(request.body);
      const token = await userService.register(user);
      respones.status(StatusCode.Created).json(token);
    } catch (error: any) {
      next(error);
    }
  }
}

export const userController = new UserConroller();
