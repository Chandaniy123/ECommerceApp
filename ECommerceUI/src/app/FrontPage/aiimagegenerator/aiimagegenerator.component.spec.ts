import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiimagegeneratorComponent } from './aiimagegenerator.component';

describe('AiimagegeneratorComponent', () => {
  let component: AiimagegeneratorComponent;
  let fixture: ComponentFixture<AiimagegeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiimagegeneratorComponent]
    });
    fixture = TestBed.createComponent(AiimagegeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
