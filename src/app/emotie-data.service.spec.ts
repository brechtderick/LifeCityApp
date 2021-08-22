import { TestBed } from '@angular/core/testing';

import { EmotieDataService } from './emotie-data.service';

describe('EmotieDataService', () => {
  let service: EmotieDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmotieDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
