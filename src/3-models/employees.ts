export class EmployeesModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public title: string;
  public titleOfCourtesy: string;
  public birthDate: Date;
  public hireDate: Date;
  //   ...

  public constructor(
    id: number,
    firstName: string,
    lastName: string,
    title: string,
    titleOfCourtesy: string,
    birthDate: Date,
    hireDate: Date
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.title = title;
    this.titleOfCourtesy = titleOfCourtesy;
    this.birthDate = birthDate;
    this.hireDate = hireDate;
  }
}
