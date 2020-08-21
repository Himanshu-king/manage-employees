import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared.service";
import { Employee } from "../employees";

@Component({
  selector: "app-employees-list",
  templateUrl: "./employees-list.component.html",
  styleUrls: ["./employees-list.component.css"],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[];

  constructor(private restService: SharedService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  // Delete employee
  deleteEmployee(id: any) {
    if (window.confirm("Are you sure, you want to delete?")) {
      this.restService.deleteEmployee(id).subscribe((data) => {
        this.loadEmployees();
      });
    }
  }

  loadEmployees() {
    this.restService.getEmployeesList().subscribe(
      (employees) => {
        this.restService.EmployeesList = employees;
        this.employees = this.restService.EmployeesList;
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
}
