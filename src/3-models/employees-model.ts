import { ValitationError } from "./client-error";

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

  public employeesValidate() {
    if (!this.firstName) throw new ValitationError("Missing first name!");
    if (!this.lastName) throw new ValitationError("Missing last name!");
    if (!this.title) throw new ValitationError("Missing title!");
    if (!this.titleOfCourtesy)
      throw new ValitationError("Missing titleOfCourtesy");
    if (!this.birthDate) throw new ValitationError("Missing birthDate!");
    if (!this.hireDate) throw new ValitationError("Missing hireDate!");
  }
}
