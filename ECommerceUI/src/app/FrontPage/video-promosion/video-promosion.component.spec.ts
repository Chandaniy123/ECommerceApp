import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPromosionComponent } from './video-promosion.component';

describe('VideoPromosionComponent', () => {
  let component: VideoPromosionComponent;
  let fixture: ComponentFixture<VideoPromosionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoPromosionComponent]
    });
    fixture = TestBed.createComponent(VideoPromosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
