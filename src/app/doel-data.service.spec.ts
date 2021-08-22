import { TestBed } from '@angular/core/testing';

import { DoelDataService } from './doel-data.service';

describe('DoelDataService', () => {
  let service: DoelDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoelDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
