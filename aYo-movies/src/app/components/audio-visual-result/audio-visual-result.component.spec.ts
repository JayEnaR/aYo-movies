import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AudioVisualResultComponent } from './audio-visual-result.component';
import { AudioVisualSearchService } from 'src/app/services/audio-visual-search.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ISearchResult } from 'src/app/models/ISearchResult';

class MockServiceDependencyStub {
  showSnackBar() { }
}

describe('AudioVisualResultComponent', () => {
  let component: AudioVisualResultComponent;
  let fixture: ComponentFixture<AudioVisualResultComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, 
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([])],
      declarations: [ AudioVisualResultComponent ],
      providers: [AudioVisualSearchService, { provide: SnackbarService, useClass: MockServiceDependencyStub }]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AudioVisualResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initialize audiovisuals method', () => {
     component.initAudioVisuals();
  });

  it('should have a scrolldown method', () => {
    component.onScrollDown();
  });

  it('should add to watchlist', () => {
    const val: ISearchResult = { imdbID: "123", Title: "Test" } as ISearchResult;
    component.watchLater(val);
  });

  it('should navigate to view-details', () => {
    const title = "The hobbit";
    const navigateSpy = spyOn(router, 'navigate');
    component.navigate(title);
    expect(navigateSpy).toHaveBeenCalledWith([`view-details/${title}`]);
  });

});
