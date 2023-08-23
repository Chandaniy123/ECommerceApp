import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Cart, Order, Payment, PaymentMethod, Shoping_Carts, User, User_Order } from 'src/app/models/models';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilityService } from 'src/app/services/utility.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  user_order:User_Order[]=[]
  user!:User
  constructor(private navigationService:NavigationService,private utilityService:UtilityService){}
  ngOnInit(): void {

    const id=this.utilityService.getUser().id
    this.user=this.utilityService.getUser()
  this.navigationService.getUserOrder(id).subscribe(res=>{
    this.user_order=res
  })
  }
  
}
