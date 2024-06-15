import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { EmployeesModel } from "../3-models/employees-model";
import { ResourceNotFoundError } from "../3-models/client-error";

// employees servise - any logic  regarding employees
class EmployeesService {
  // get all employees
  public async getAllEmployees() {
    const sql =
      "SELECT id, firstName, lastName, title, titleOfCourtesy, birthDate, hireDate FROM employees";

    const employees = await dal.execute(sql);

    return employees;
  }

  public async getEmployeeById(id: number) {
    const sql =
      "SELECT id, firstName, lastName, title, titleOfCourtesy, birthDate, hireDate FROM employees WHERE id = ? ";
    const employeeById = await dal.execute(sql, [id]);

    if (!employeeById) throw new ResourceNotFoundError(id);

    return employeeById;
  }

  public async addEmployee(employee: EmployeesModel) {
    employee.validateInsert();

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

  public async updateEmployee(employee: EmployeesModel) {
    employee.validateUpdate();

    const sql =
      "UPDATE employees set firstName = ?, lastName = ?, title = ?, titleOfCourtesy = ?, birthDate = ?, hireDate = ? WHERE id = ?";

    const updatedEmployee: OkPacketParams = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      employee.title,
      employee.titleOfCourtesy,
      employee.birthDate,
      employee.hireDate,
      employee.id,
    ]);

    if (updatedEmployee.affectedRows === 0)
      throw new ResourceNotFoundError(employee.id);

    return updatedEmployee;
  }
}

export const employeesService = new EmployeesService();
