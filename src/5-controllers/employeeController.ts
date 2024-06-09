import express, { Request, Response, NextFunction } from "express";
import { employeesService } from "../4-services/employees";

class EmployeeController {
  public readonly router = express.Router();

  public constructor() {
    this.router.get("/api/employees", this.getAllEmployyes);
  }

  private async getAllEmployyes(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const employee = await employeesService.getAllEmployees();
    respones.json(employee);
  }
}

export const employeeController = new EmployeeController();
