import express, { Request, Response, NextFunction } from "express";
import { employeesService } from "../4-services/employees-service";
import { EmployeesModel } from "../3-models/employees-model";

class EmployeeController {
  public readonly router = express.Router();

  public constructor() {
    this.router.get("/employees", this.getAllEmployees);
    this.router.get("/employee/:id", this.getEmployeeById);
    this.router.post("/employee/", this.newEmployee);
  }

  private async getAllEmployees(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const employees = await employeesService.getAllEmployees();
      response.json(employees);
    } catch (error) {
      next(error);
    }
  }

  private async getEmployeeById(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const employeeById = await employeesService.getEmployeeById(id);
      response.json(employeeById);
    } catch (error: any) {
      next(error);
    }
  }

  private async newEmployee(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const employee = new EmployeesModel(request.body);
      const newEmployee = await employeesService.addEmployee(employee);
      response.json(newEmployee);
    } catch (error: any) {
      next(error);
    }
  }
}

export const employeeController = new EmployeeController();
