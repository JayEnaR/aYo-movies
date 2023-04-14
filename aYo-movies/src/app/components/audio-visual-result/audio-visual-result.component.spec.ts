import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVisualResultComponent } from './audio-visual-result.component';

describe('AudioVisualResultComponent', () => {
  let component: AudioVisualResultComponent;
  let fixture: ComponentFixture<AudioVisualResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVisualResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioVisualResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
