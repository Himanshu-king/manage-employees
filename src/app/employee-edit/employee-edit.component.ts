import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { EmployeeResolvedData, Employee } from '../employees';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  empData: Employee;
  pageTitle: string;
  empForm: FormGroup;
  editMode: boolean;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    public router: Router
  ) {}

  ngOnInit() {
    const resolvedData: EmployeeResolvedData = this.route.snapshot.data[
      'resolvedData'
    ];
    this.id = this.route.snapshot.params['id'];

    this.onEmployeeDataRetrieved(resolvedData.empData);
  }

  onEmployeeDataRetrieved(_empData: Employee) {
    this.empData = _empData;

    if (!this.empData) {
      this.pageTitle = 'No Employee Data found';
    } else {
      if (this.empData.id) {
        this.editMode = true;
        this.pageTitle = `Edit Employee: ${this.empData.name}`;
      } else {
        this.pageTitle = 'Add Employee';
      }
      this.createEmployeeForm();
    }
  }
  createEmployeeForm() {
    const { name, compName, emailId, contactNo, designation } = this.empData;
    this.empForm = new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      compName: new FormControl({value: compName, disabled: true}, Validators.required),
      emailId: new FormControl(emailId, [Validators.required, Validators.email]),
      contactNo: new FormControl(contactNo, [Validators.required, Validators.pattern('[0-9]{10}')]),
      designation: new FormControl(designation, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    });
  }

  onFormSubmit() {
    console.log('on submit');
    if (this.editMode) {
      this.editEmployee();
    } else {
      this.addEmployee();
    }
  }

  addEmployee() {
    this.sharedService.addEmployee(this.empForm.value).subscribe((data: {}) => {
      this.router.navigate(['/list']);
    });
  }
  editEmployee() {
    this.sharedService
      .editEmployee(this.id, this.empForm.value)
      .subscribe((data) => {
        this.router.navigate(['/list']);
      });
  }
}
