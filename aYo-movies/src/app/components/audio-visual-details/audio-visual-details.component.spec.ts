import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVisualDetailsComponent } from './audio-visual-details.component';

describe('AudioVisualDetailsComponent', () => {
  let component: AudioVisualDetailsComponent;
  let fixture: ComponentFixture<AudioVisualDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVisualDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioVisualDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
