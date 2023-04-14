import { TestBed } from '@angular/core/testing';

import { AudioVisualSearchService } from './movie-search.service';

describe('AudioVisualSearchService', () => {
  let service: AudioVisualSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioVisualSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
