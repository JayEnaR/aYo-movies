import { TestBed } from '@angular/core/testing';

import { AudioVisualDetailsResolver } from './audio-visual-details.resolver';

describe('AudioVisualDetailsResolver', () => {
  let resolver: AudioVisualDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AudioVisualDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
