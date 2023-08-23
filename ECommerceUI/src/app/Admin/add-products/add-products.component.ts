import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  product: Product = {
    productId: 0,
    productName: '',
    description: '',
    price: 0,
    category:'',
    offerRate:0,
    image: '',
  };
  router: any;
constructor(private adminService:AdminServiceService){
  
}
  AddProduct(addProduct:NgForm){
    this.adminService.addProducts(this.product).subscribe(res=>{
      console.log(res);
      Swal.fire(
        'Product Added!',
        'You clicked the button!',
        'success'
      )
    
    })
  }
}
