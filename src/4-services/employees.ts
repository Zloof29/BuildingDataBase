import { dal } from "../2-utils/dal";
import { EmployeesModel } from "../3-models/employees";

// employees servise - any logic  regarding employees
class EmployeesService {
  // get all employees
  public async getAllEmployees() {
    // create sql:
    const sql =
      "SELECT id, firstName, lastName, title, titleOfCourtesy, birthDate, hireDate FROM employees";
    // execute
    const employees = await dal.execute(sql);
    // return
    return employees;
  }

  public async getEmployeeById(id: number) {
    const sql =
      "SELECT id, firstName, lastName, title, titleOfCourtesy, birthDate, hireDate FROM employees WHERE id = ? ";
    const employeeById = await dal.execute(sql, [id]);
    return employeeById;
  }

  public async addEmployee(employee: EmployeesModel) {
    const sql =
      "INSERT INTO employees (firstname, lastname, title, titleOfCourtesy, birthDate, hireDate) VALUES (?, ?, ?, ?, ?, ?)";
    const newEmployee = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      employee.title,
      employee.titleOfCourtesy,
      employee.birthDate,
      employee.hireDate,
    ]);

    return newEmployee;
  }
}

export const employeesService = new EmployeesService();
