import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/models';
import { UtilityService } from 'src/app/services/utility.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() view: 'grid' | 'list' | 'currcartitem' | 'prevcartitem' = 'grid';
  @Input() product: Product = {
    productId: 0,
    productName: '',
    description: '',
    price: 0,
    category:'',
    offerRate:0,
    image: '',
  };

  constructor(public utilityService: UtilityService) {}

  ngOnInit(): void {
    
  }
}
