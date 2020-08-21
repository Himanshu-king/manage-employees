export class Employee {
  constructor(
    public id: string,
    public name: string,
    public compName: string,
    public emailId: string,
    public contactNo: string,
    public designation: string
  ) {}
}

export interface EmployeeResolvedData {
  empData: Employee;
  error?: any;
}
