import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLaterComponent } from './watch-later.component';
import { IndexedDbService } from 'src/app/services/indexed-db.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ISearchResult } from 'src/app/models/ISearchResult';

class MockServiceDependencyStub {
  showSnackBar(){}
}

describe('WatchLaterComponent', () => {
  let component: WatchLaterComponent;
  let fixture: ComponentFixture<WatchLaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[BrowserAnimationsModule],
      declarations: [ WatchLaterComponent ],
      providers: [IndexedDbService, { provide: SnackbarService, useClass: MockServiceDependencyStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to watchlist', () => {
    const val: ISearchResult = { imdbID: "123", Title: "Test" } as ISearchResult;
    component.watchLater(val);
  });


});
