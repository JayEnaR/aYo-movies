import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVisualSearchComponent } from './movie-search.component';

describe('AudioVisualSearchComponent', () => {
  let component: AudioVisualSearchComponent;
  let fixture: ComponentFixture<AudioVisualSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVisualSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioVisualSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
