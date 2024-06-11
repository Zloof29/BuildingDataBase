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
}
