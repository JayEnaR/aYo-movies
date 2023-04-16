import { TestBed } from '@angular/core/testing';

import { AudioVisualSearchService } from './audio-visual-search.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';
import { QueryTypeEnum } from '../enums/query-type.enum';

class MockServiceDependencyStub {
  showSnackBar() { }
}

describe('AudioVisualSearchService', () => {
  let service: AudioVisualSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AudioVisualSearchService, { provide: SnackbarService, useClass: MockServiceDependencyStub }]
    });
    service = TestBed.inject(AudioVisualSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#retrieveCinemas should return movies', (done) => {
    const param = "Harry";
    const type = QueryTypeEnum.movie;
    service.retrieveCinemas(param, type).subscribe(val => {
      expect(val);
      done();
    });
  });

  it('#retrieveCinemaDetails should return a single movie', (done) => {
    const param = "Harry potter";
    service.retrieveCinemaDetails(param).subscribe(val => {
      expect(val);
      done();
    });
  });

  it('#retrieveCinemasPaging should return movies when scrolling', (done) => {
    const pageNumber = 2;
    service.retrieveCinemasPaging(2).subscribe(val => {
      expect(val);
      done();
    });
  });

});
