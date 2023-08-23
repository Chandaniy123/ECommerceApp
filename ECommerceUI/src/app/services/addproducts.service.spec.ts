import { TestBed } from '@angular/core/testing';

import { AddproductsService } from './addproducts.service';

describe('AddproductsService', () => {
  let service: AddproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
