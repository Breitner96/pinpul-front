import { TestBed } from '@angular/core/testing';

import { TypeCompaniesService } from './type-companies.service';

describe('TypeCompaniesService', () => {
  let service: TypeCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
