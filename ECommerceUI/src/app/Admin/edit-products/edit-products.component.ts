import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/models';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {
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
  constructor(private route: ActivatedRoute,private adminuser:AdminServiceService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.adminuser.getproductbyId(id).subscribe(res=>{
            this.product = res;
          })
           
              
            
        }
      }
    })

  }

  editProducts(){
    this.adminuser.editproduct(this.product.productId,this.product).subscribe(res=>{
      console.log(res);
    })
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  DeleteProducs(){
    this.adminuser.deleteproduct(this.product.productId).subscribe(res=>{
      console.log(res);
    })
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    this.router.navigator(['/admindashboard/display-all-products']);
  }

}
