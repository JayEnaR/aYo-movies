import { TestBed } from '@angular/core/testing';

import { AudioVisualDetailsResolver } from './audio-visual-details.resolver';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ISearchResult } from 'src/app/models/ISearchResult';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

class MockServiceDependencyStub {
  showSnackBar(){}
}

describe('AudioVisualDetailsResolver', () => {
  let resolver: AudioVisualDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AudioVisualDetailsResolver, { provide: SnackbarService, useClass: MockServiceDependencyStub }]
    });
    resolver = TestBed.inject(AudioVisualDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

});
