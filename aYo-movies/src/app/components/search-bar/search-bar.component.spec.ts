import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudioVisualSearchService } from 'src/app/services/audio-visual-search.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueryTypeEnum } from 'src/app/enums/query-type.enum';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  class MockServiceDependencyStub {
    showSnackBar() { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[       
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule],
      declarations: [ SearchBarComponent ],
      providers: [ AudioVisualSearchService, { provide: SnackbarService, useClass: MockServiceDependencyStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear search', () => {
    component.clearSearch();
  });

  it('must filter by movie type', () => {
    const type = QueryTypeEnum.movie;
    component.onChipChange(type);
  });

  it('must validate on search input change', () => {
    const type = QueryTypeEnum.movie;
    component.searchBarValidator();
  });

});
