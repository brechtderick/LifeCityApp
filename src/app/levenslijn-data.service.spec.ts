import { TestBed } from '@angular/core/testing';

import { LevenslijnDataService } from './levenslijn-data.service';

describe('LevenslijnDataService', () => {
  let service: LevenslijnDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevenslijnDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
