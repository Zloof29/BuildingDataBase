import express, { Request, Response, NextFunction } from "express";
import { employeesService } from "../4-services/employees";

class EmployeeController {
  public readonly router = express.Router();

  public constructor() {
    this.router.get("/employees", this.getAllEmployees);
    this.router.get("/employee/:id", this.getEmployeeById);
    this.router.post("/employee/", this.newEmployee);
  }

  private async getAllEmployees(
    request: Request,
    respones: Response,
    next: NextFunction
  ) {
    const employee = await employeesService.getAllEmployees();
    respones.json(employee);
  }

  private async getEmployeeById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = request.params.id;
    const employeeById = await employeesService.getEmployeeById(+id);
    response.json(employeeById);
  }

  private async newEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const employee = request.body;
    const newEmployee = await employeesService.addEmployee(employee);
    response.json(newEmployee);
  }
}

export const employeeController = new EmployeeController();
