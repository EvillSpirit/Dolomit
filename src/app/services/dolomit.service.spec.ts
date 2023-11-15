import { TestBed } from '@angular/core/testing';

import { DolomitService } from './dolomit.service';

describe('DolomitService', () => {
  let service: DolomitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DolomitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
