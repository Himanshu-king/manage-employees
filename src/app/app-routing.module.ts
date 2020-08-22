import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDataResolverService } from './employee-data-resolver.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'list',
        component: EmployeesListComponent,
      },
      {
        path: ':id/edit',
        component: EmployeeEditComponent,
        resolve: { resolvedData: EmployeeDataResolverService },
      },
      {
        path: ':id',
        component: EmployeeDetailsComponent,
        resolve: { resolvedData: EmployeeDataResolverService },
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
