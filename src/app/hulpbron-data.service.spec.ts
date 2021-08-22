import { TestBed } from '@angular/core/testing';

import { HulpbronDataService } from './hulpbron-data.service';

describe('HulpbronDataService', () => {
  let service: HulpbronDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HulpbronDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
