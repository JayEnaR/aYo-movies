import { TestBed } from '@angular/core/testing';

import { IndexedDbService } from './indexed-db.service';
import { SnackbarService } from './snackbar.service';
import { ISearchResult } from '../models/ISearchResult';

class MockServiceDependencyStub {
  showSnackBar(){}
}

describe('IndexedDbService', () => {
  let service: IndexedDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexedDbService, { provide: SnackbarService, useClass: MockServiceDependencyStub }]
    });
    service = TestBed.inject(IndexedDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add to watchlist', () => {
    const val: ISearchResult = { imdbID: "123", Title: "Test" } as ISearchResult;
    service.addAudioVisual(val);
  });

  it('should remove from watchlist', () => {
    const val: ISearchResult = { imdbID: "123", Title: "Test" } as ISearchResult;
    service.deleteAudioVisual(val);
  });

});
