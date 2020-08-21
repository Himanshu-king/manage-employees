import { TestBed } from '@angular/core/testing';

import { EmployeeDataResolverService } from './employee-data-resolver.service';

describe('EmployeeDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeDataResolverService = TestBed.get(EmployeeDataResolverService);
    expect(service).toBeTruthy();
  });
});
