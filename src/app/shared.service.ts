import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Employee } from './employees';

import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  apiURL = 'http://localhost:3000';

  employees: Employee[];
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiURL + '/employees').pipe(
      catchError(this.handleError)
    );
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id: string): Observable<Employee> {
    if (id === '0') {
      return of(this.initializeEmployee());
    }
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  // HttpClient API post() method => Create employee
  addEmployee(employee: any): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // HttpClient API put() method => Update employee
  editEmployee(id: string, employee: any): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id: string) {
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  set EmployeesList(employees) {
    this.employees = employees;
  }

  get EmployeesList() {
    return this.employees;
  }

  private initializeEmployee(): any {
    // Return an initialized object
    return new Employee(null, null, 'Infrrd.ai', null, null, null);
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
