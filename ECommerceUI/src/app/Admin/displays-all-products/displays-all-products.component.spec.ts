import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaysAllProductsComponent } from './displays-all-products.component';

describe('DisplaysAllProductsComponent', () => {
  let component: DisplaysAllProductsComponent;
  let fixture: ComponentFixture<DisplaysAllProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplaysAllProductsComponent]
    });
    fixture = TestBed.createComponent(DisplaysAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
