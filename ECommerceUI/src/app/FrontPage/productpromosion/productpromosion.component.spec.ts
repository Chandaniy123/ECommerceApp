import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductpromosionComponent } from './productpromosion.component';

describe('ProductpromosionComponent', () => {
  let component: ProductpromosionComponent;
  let fixture: ComponentFixture<ProductpromosionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductpromosionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductpromosionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
