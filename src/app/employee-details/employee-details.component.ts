import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeResolvedData, Employee } from '../employees';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  empData: Employee;
  pageTitle: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const resolvedData: EmployeeResolvedData = this.route.snapshot.data[
      'resolvedData'
    ];

    this.onEmployeeDataRetrieved(resolvedData.empData);
  }

  onEmployeeDataRetrieved(_empData: Employee) {
    if (!_empData) {
      this.pageTitle = 'No Employee Data found';
    } else {
      this.empData = _empData;
      this.pageTitle = `Viewing:  ${this.empData.name}`;
    }
  }
}
