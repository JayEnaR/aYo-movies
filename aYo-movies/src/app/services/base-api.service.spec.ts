import { TestBed } from '@angular/core/testing';

import { BaseApiService } from './base-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('BaseApiService', () => {
  let service: BaseApiService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BaseApiService]
    });
    service = TestBed.inject(BaseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
