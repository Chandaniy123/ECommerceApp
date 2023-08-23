import { Component, OnInit } from '@angular/core';
import { Shoping_Carts } from '../../../models/models';

import { AdminServiceService } from '../../../services/admin-service.service';
import { NavigationService } from 'src/app/services/navigation.service';
import {  Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-carts',
  templateUrl: './user-carts.component.html',
  styleUrls: ['./user-carts.component.css']
})
export class UserCartsComponent implements OnInit {
shoping:  Shoping_Carts[]=[];
showDeleteConfirmation = false;
orderId:number=0
constructor(private adminService:AdminServiceService,private navigation :NavigationService,private routes :Router){}
 sum=0
ngOnInit(): void {
  const  id =localStorage.getItem('userId')
this.adminService.GetUser_Carts(id!.toString()).subscribe(res=>{
  console.log(res);
  this.shoping = res
  for (var val of this.shoping) {
  this.sum+=val.price
  }
 
})
}

openDeleteConfirmation(item :any) {
  this.orderId=item
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
      this.navigation.DeleteCartOfUser(this.orderId).subscribe(res=>{
  
        window.location.reload();
       // this.routes.navigate(["/carts"]);
        
        
    
      })
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
 
  this.showDeleteConfirmation = true;
}

onDeleteConfirmed(confirmed: boolean) {
  if (confirmed) {
    // Perform delete operation
   
     
    // Add your delete logic here
  }

  this.showDeleteConfirmation = false;
}


}
