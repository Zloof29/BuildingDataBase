import { ValitationError } from "./client-error";
import Joi from "joi";

export class EmployeesModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public title: string;
  public titleOfCourtesy: string;
  public birthDate: Date;
  public hireDate: Date;
  //   ...

  public constructor(employee: EmployeesModel) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.title = employee.title;
    this.titleOfCourtesy = employee.titleOfCourtesy;
    this.birthDate = employee.birthDate;
    this.hireDate = employee.hireDate;
  }

  private static insertValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    birthDate: Joi.string().isoDate().required(),
  });
  private static updateValidationSchema = Joi.object({
    id: Joi.number().required().min(1).integer(),
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    birthDate: Joi.string().isoDate().required(),
  });

  public validateInsert(): void {
    const result = EmployeesModel.insertValidationSchema.validate(this);
    if (result.error) throw new ValitationError(result.error.message);
  }

  // Validating current object against the update schema:
  public validateUpdate(): void {
    const result = EmployeesModel.updateValidationSchema.validate(this);
    if (result.error) throw new ValitationError(result.error.message);
  }

  // public employeesValidate() {
  // if (!this.firstName) throw new ValitationError("Missing first name!");
  // if (!this.lastName) throw new ValitationError("Missing last name!");
  // if (!this.title) throw new ValitationError("Missing title!");
  // if (!this.titleOfCourtesy)
  //   throw new ValitationError("Missing titleOfCourtesy");
  // if (!this.birthDate) throw new ValitationError("Missing birthDate!");
  // if (!this.hireDate) throw new ValitationError("Missing hireDate!");
  // }
}
