import { TestBed } from '@angular/core/testing';

import { MochApiService } from './moch-api.service';

describe('MochApiService', () => {
  let service: MochApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MochApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
