import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/models';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-displays-all-products',
  templateUrl: './displays-all-products.component.html',
  styleUrls: ['./displays-all-products.component.css']
})
export class DisplaysAllProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private adminService: AdminServiceService) {

  } 
  ngOnInit(): void {
    this.adminService.getProducts().subscribe(res=>{
      console.log(res);
      this.products = res;
    })
  }

  
}
