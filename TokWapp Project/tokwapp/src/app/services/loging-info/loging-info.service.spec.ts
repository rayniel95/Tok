import { TestBed } from '@angular/core/testing';

import { LogingInfoService } from './loging-info.service';

describe('LogingInfoService', () => {
  let service: LogingInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogingInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
