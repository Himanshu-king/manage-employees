import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SharedService } from './shared.service';
import { EmployeeResolvedData } from './employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataResolverService
  implements Resolve<EmployeeResolvedData> {
  constructor(private sharedService: SharedService) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<EmployeeResolvedData> | Promise<EmployeeResolvedData> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Employee id was not a number: ${id}`;
      console.log(message);
      return of({ empData: null, error: message });
    }
    return this.sharedService.getEmployee(id).pipe(
      map((employeeDetails) => ({ empData: employeeDetails })),
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        console.log(message);
        return of({ empData: null, error: message });
      })
    );
  }
}
