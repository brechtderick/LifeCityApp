import { TestBed } from '@angular/core/testing';

import { TalentenDataService } from './talenten-data.service';

describe('TalentenDataService', () => {
  let service: TalentenDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalentenDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
