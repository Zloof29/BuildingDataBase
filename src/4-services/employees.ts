import { dal } from "../2-utils/dal";

// employees servise - any logic  regarding employees
class EmployeesService {
  // get all employees
  public async getAllEmployees() {
    // create sql:
    const sql = "SELECT * FROM employees";
    // execute
    const employees = await dal.execute(sql);
    // return
    return employees;
  }
}

export const employeesService = new EmployeesService();
