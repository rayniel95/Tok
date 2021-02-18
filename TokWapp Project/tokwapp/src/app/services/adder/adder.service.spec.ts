import { TestBed } from '@angular/core/testing';

import { AdderService } from './adder.service';

describe('AdderService', () => {
  let service: AdderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
