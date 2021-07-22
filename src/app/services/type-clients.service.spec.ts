import { TestBed } from '@angular/core/testing';

import { TypeClientsService } from './type-clients.service';

describe('TypeClientsService', () => {
  let service: TypeClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
