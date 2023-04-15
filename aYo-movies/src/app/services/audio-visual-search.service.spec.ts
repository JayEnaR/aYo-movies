import { TestBed } from '@angular/core/testing';

import { AudioVisualSearchService } from './audio-visual-search.service';

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
